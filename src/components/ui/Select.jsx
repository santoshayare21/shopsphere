import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Select.module.css'

/**
 * Custom accessible select (listbox) with flat open/close transitions.
 * onChange receives the next string value (not a DOM event).
 */
export default function Select({
  id,
  label,
  error,
  options = [],
  className = '',
  placeholder = 'Select…',
  value = '',
  name,
  disabled = false,
  onChange,
  onBlur,
}) {
  const reactId = useId()
  const selectId = id || name || reactId
  const listboxId = `${selectId}-listbox`
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const buttonRef = useRef(null)

  const selected = useMemo(
    () => options.find((opt) => String(opt.value) === String(value)),
    [options, value],
  )

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const commit = (next) => {
    onChange?.(next)
    setOpen(false)
    buttonRef.current?.focus()
  }

  const onButtonKeyDown = (event) => {
    if (disabled) return
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = rootRef.current?.querySelectorAll('[role="option"]')?.[index + 1]
      next?.focus()
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = rootRef.current?.querySelectorAll('[role="option"]')?.[index - 1]
      prev?.focus()
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      commit(options[index].value)
    }
  }

  return (
    <div className={`${styles.field} ${className}`.trim()} ref={rootRef}>
      {label ? (
        <span className={styles.label} id={`${selectId}-label`}>
          {label}
        </span>
      ) : null}

      <button
        ref={buttonRef}
        id={selectId}
        type="button"
        name={name}
        className={`${styles.trigger} ${open ? styles.open : ''} ${error ? styles.invalid : ''}`.trim()}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        onKeyDown={onButtonKeyDown}
        onBlur={onBlur}
      >
        <span className={selected ? styles.value : styles.placeholder}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown size={18} className={styles.chevron} aria-hidden />
      </button>

      <ul
        id={listboxId}
        className={`${styles.menu} ${open ? styles.menuOpen : ''}`}
        role="listbox"
        aria-labelledby={label ? `${selectId}-label` : undefined}
        hidden={!open}
      >
        {options.map((opt, index) => {
          const isSelected = String(opt.value) === String(value)
          return (
            <li key={`${opt.value}-${opt.label}`}>
              <button
                type="button"
                role="option"
                className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                aria-selected={isSelected}
                tabIndex={open ? 0 : -1}
                onClick={() => commit(opt.value)}
                onKeyDown={(event) => onOptionKeyDown(event, index)}
              >
                {opt.label}
              </button>
            </li>
          )
        })}
      </ul>

      {error ? (
        <span id={`${selectId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
