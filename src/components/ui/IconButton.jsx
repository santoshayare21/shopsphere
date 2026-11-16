import styles from './IconButton.module.css'

export default function IconButton({
  children,
  label,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`.trim()}
      aria-label={label}
      {...rest}
    >
      {children}
    </button>
  )
}
