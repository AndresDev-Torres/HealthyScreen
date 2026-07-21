import styles from './PageHeader.module.css'

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className={styles.header}><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></header>
}
