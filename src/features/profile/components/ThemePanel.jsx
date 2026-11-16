import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useTheme } from '@/context/ThemeContext'
import styles from './ThemePanel.module.css'

export default function ThemePanel() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className={styles.panel}>
      <h2 className={styles.title}>Appearance</h2>
      <p className={styles.copy}>Indigo Minimal supports light and dark surfaces.</p>
      <div className={styles.actions}>
        <Button
          type="button"
          variant={theme === 'light' ? 'primary' : 'secondary'}
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button
          type="button"
          variant={theme === 'dark' ? 'primary' : 'secondary'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>
      </div>
    </Card>
  )
}
