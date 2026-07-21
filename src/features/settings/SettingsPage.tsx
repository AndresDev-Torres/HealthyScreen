import { PageHeader } from '../../components/ui/PageHeader'
import { useApp } from '../../stores/AppContext'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  const { data, dispatch } = useApp()
  const set = (key: 'focusDuration' | 'breakDuration' | 'dailyGoal', value: number) => dispatch({ type: 'UPDATE_SETTINGS', settings: { [key]: value } })
  return <><PageHeader eyebrow="Preferencias" title="Ajusta tu propio ritmo." description="HealthyScreen se adapta a tu jornada, no al revés." /><section className={styles.card}><label>Duración de la sesión <input type="number" min="5" max="120" value={data.settings.focusDuration} onChange={(e) => set('focusDuration', Number(e.target.value))} /><small>minutos</small></label><label>Duración de la pausa <input type="number" min="2" max="5" value={data.settings.breakDuration} onChange={(e) => set('breakDuration', Number(e.target.value))} /><small>minutos</small></label><label>Meta diaria <input type="number" min="15" max="600" value={data.settings.dailyGoal} onChange={(e) => set('dailyGoal', Number(e.target.value))} /><small>minutos</small></label><label className={styles.toggle}>Notificaciones del navegador <input type="checkbox" checked={data.settings.notificationsEnabled} onChange={(e) => dispatch({ type: 'UPDATE_SETTINGS', settings: { notificationsEnabled: e.target.checked } })} /></label></section><p className={styles.note}>La sesión termina al cumplir la duración elegida y da paso a tu pausa activa. Tus preferencias y progreso se almacenan solo en este navegador.</p></>
}
