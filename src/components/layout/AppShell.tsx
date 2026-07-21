import { NavLink, Outlet } from 'react-router-dom'
import styles from './AppShell.module.css'

const navigation = [
  { to: '/dashboard', icon: '▦', label: 'Resumen' },
  { to: '/focus', icon: '◷', label: 'Enfoque' },
  { to: '/exercises', icon: '♧', label: 'Ejercicios' },
  { to: '/achievements', icon: '✦', label: 'Logros' },
  { to: '/about', icon: 'ⓘ', label: 'Sobre HealthyScreen' },
  { to: '/settings', icon: '⚙', label: 'Ajustes' },
]

export function AppShell() {
  return <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <NavLink className={styles.brand} to="/dashboard"><span>✺</span> HealthyScreen</NavLink>
      <nav>{navigation.map((item) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}><span>{item.icon}</span>{item.label}</NavLink>)}</nav>
      <p className={styles.footer}>Pequeñas pausas.<br />Grandes cambios.</p>
    </aside>
    <main className={styles.main}><Outlet /></main>
  </div>
}
