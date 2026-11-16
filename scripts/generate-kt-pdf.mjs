import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mdToPdf } from 'md-to-pdf'

const execFileAsync = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(root, 'docs')
const diagramsDir = path.join(docsDir, 'diagrams')
const sourcePath = path.join(docsDir, 'KT.md')
const renderedMdPath = path.join(docsDir, 'KT.rendered.md')
const pdfPath = path.join(docsDir, 'ShopSphere_KT.pdf')

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function renderMermaidBlocks(markdown) {
  await ensureDir(diagramsDir)
  const blockRe = /```mermaid\n([\s\S]*?)```/g
  let index = 0
  let result = markdown
  const matches = [...markdown.matchAll(blockRe)]

  for (const match of matches) {
    index += 1
    const code = match[1].trim()
    const base = `diagram-${index}`
    const mmdPath = path.join(diagramsDir, `${base}.mmd`)
    const pngPath = path.join(diagramsDir, `${base}.png`)
    await fs.writeFile(mmdPath, code, 'utf8')

    const mmdc = path.join(root, 'node_modules', '.bin', 'mmdc')
    await execFileAsync(mmdc, [
      '-i',
      mmdPath,
      '-o',
      pngPath,
      '-b',
      'transparent',
      '-t',
      'neutral',
    ])

    const rel = `./diagrams/${base}.png`
    result = result.replace(match[0], `![Diagram ${index}](${rel})`)
  }

  return result
}

async function main() {
  const source = await fs.readFile(sourcePath, 'utf8')
  const withImages = await renderMermaidBlocks(source)
  await fs.writeFile(renderedMdPath, withImages, 'utf8')

  const pdf = await mdToPdf(
    { path: renderedMdPath },
    {
      dest: pdfPath,
      pdf_options: {
        format: 'A4',
        margin: '16mm',
        printBackground: true,
      },
      stylesheet: path.join(docsDir, 'kt-print.css'),
    },
  )

  if (!pdf?.filename) {
    throw new Error('md-to-pdf did not produce a file')
  }

  const stat = await fs.stat(pdfPath)
  if (stat.size < 1000) {
    throw new Error(`PDF too small (${stat.size} bytes)`)
  }

  console.log(`Wrote ${pdfPath} (${stat.size} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
