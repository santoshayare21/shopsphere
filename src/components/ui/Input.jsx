import styles from './Input.module.css'

export default function Input({
  id,
  label,
  error,
  className = '',
  type = 'text',
  ...rest
}) {
  const inputId = id || rest.name
  return (
    <label className={`${styles.field} ${className}`.trim()} htmlFor={inputId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input
        id={inputId}
        type={type}
        className={`${styles.input} ${error ? styles.invalid : ''}`.trim()}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error ? (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </label>
  )
}
