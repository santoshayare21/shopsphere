import styles from './EmptyState.module.css'

export default function EmptyState({ title, description, action, icon }) {
  return (
    <div className={styles.root} role="status">
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  )
}
