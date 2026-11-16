import styles from './Skeleton.module.css'

export default function Skeleton({
  width,
  height,
  radius,
  className = '',
  style,
  ...rest
}) {
  return (
    <span
      className={`${styles.block} ${styles.shimmer} ${className}`.trim()}
      style={{
        width: width ?? '100%',
        height: height ?? '1rem',
        borderRadius: radius,
        ...style,
      }}
      aria-hidden
      {...rest}
    />
  )
}
