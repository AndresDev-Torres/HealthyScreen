import { PageHeader } from '../../components/ui/PageHeader'
import { useApp } from '../../stores/AppContext'
import styles from './AchievementsPage.module.css'

const achievements = [
  { icon: '✦', title: 'Primer paso', description: 'Completa una sesión de enfoque.', target: 1 },
  { icon: '☕', title: 'Pausa consciente', description: 'Realiza 3 pausas activas.', target: 3 },
  { icon: '☀', title: 'Día equilibrado', description: 'Alcanza tu meta diaria.', target: 120 },
]
export function AchievementsPage() {
  const { data } = useApp()
  return <><PageHeader eyebrow="Tu progreso" title="Cada hábito cuenta." description="Celebra los pequeños pasos que sostienen tu bienestar." /><section className={styles.grid}>{achievements.map((item) => { const value = item.title === 'Primer paso' ? data.sessions.length : item.title === 'Pausa consciente' ? data.completedBreaks : data.sessions.reduce((a, b) => a + b.durationMinutes, 0); const complete = value >= item.target; return <article key={item.title} className={complete ? styles.complete : ''}><div>{item.icon}</div><span>{complete ? 'DESBLOQUEADO' : 'EN PROGRESO'}</span><h2>{item.title}</h2><p>{item.description}</p><small>{Math.min(value, item.target)} / {item.target}</small><section><i style={{ width: `${Math.min(100, value / item.target * 100)}%` }} /></section></article> })}</section></>
}
