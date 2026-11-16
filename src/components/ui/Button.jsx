import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  fullWidth = false,
  disabled = false,
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
