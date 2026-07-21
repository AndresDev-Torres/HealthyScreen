import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { minutesToday } from '../../lib/date'
import { useApp } from '../../stores/AppContext'
import { getGreeting, wellbeingTips } from './wellbeing'
import styles from './DashboardPage.module.css'

export function DashboardPage() {
  const { data } = useApp()
  const [tip] = useState(() => wellbeingTips[Math.floor(Math.random() * wellbeingTips.length)])
  const today = minutesToday(data.sessions)
  const progress = Math.min(100, Math.round((today / data.settings.dailyGoal) * 100))
  const breakScore = Math.min(100, data.completedBreaks * 25)
  const wellbeing = Math.round(progress * 0.6 + breakScore * 0.25 + Math.min(100, data.sessions.length * 20) * 0.15)

  return <>
    <PageHeader eyebrow="Tu acompañante de bienestar" title={`${getGreeting()} 👋`} description="¿Listo para cuidar tu bienestar hoy? Pequeños descansos pueden mejorar tu concentración y reducir la fatiga." />
    <section className={styles.intro}><div>💚</div><p><strong>HealthyScreen te acompaña durante tu jornada.</strong> Crea hábitos saludables con sesiones de enfoque, pausas activas, ejercicios y un seguimiento amable de tu progreso.</p></section>
    <section className={styles.learn}><div><p className={styles.sectionLabel}>ANTES DE EMPEZAR</p><h2>¿Cómo funciona HealthyScreen?</h2><div className={styles.steps}><article><b>1</b><h3>Inicia una sesión</h3><p>Una sesión es tu tiempo de estudio o trabajo con el temporizador activo.</p></article><article><b>2</b><h3>Recibe una pausa</h3><p>Al completar tus {data.settings.focusDuration} minutos, te invitamos a una pausa de {data.settings.breakDuration} minutos.</p></article><article><b>3</b><h3>Registra tu cuidado</h3><p>Completa un ejercicio; tu progreso actualiza el bienestar y los logros.</p></article></div></div><article className={styles.why}><span>☀</span><div><h3>¿Qué ocurre al terminar?</h3><p>Al finalizar, la sesión queda registrada. Las pausas ayudan a reducir la fatiga visual, mejorar la concentración y prevenir molestias musculares.</p><small>La notificación no interrumpe tu ritmo: te propone un momento breve para cuidarte.</small></div></article></section>
    <section className={styles.wellbeing}>
      <div className={styles.leaf}>🌿</div><div className={styles.wellbeingCopy}><span>BIENESTAR DE HOY</span><h2>{wellbeing}<small>/100</small></h2><p>{wellbeing >= 70 ? 'Vas construyendo una jornada muy equilibrada.' : 'Cada pausa es una forma de cuidarte.'}</p></div>
      <div className={styles.ring} style={{ '--score': `${wellbeing * 3.6}deg` } as CSSProperties}><b>{wellbeing}%</b><small>hoy</small></div>
    </section>
    <section className={styles.grid}><article><span>◷</span><p>Tiempo estudiado</p><strong>{today} <em>min</em></strong><small>{Math.max(0, data.settings.dailyGoal - today)} min. para tu meta</small></article><article><span>☕</span><p>Pausas conscientes</p><strong>{data.completedBreaks}</strong><small>momentos para recargar</small></article><article><span>✦</span><p>Logros en camino</p><strong>{data.sessions.length}</strong><small>sesiones completadas</small></article></section>
    <section className={styles.bottom}><article className={styles.recommendation}><div><span>RECOMENDACIÓN DEL DÍA</span><h3>Regala descanso a tu mirada</h3><p>Mira a unos seis metros durante 20 segundos. Tus ojos también necesitan cambiar de foco.</p><Link to="/exercises">Explorar ejercicios <b>→</b></Link></div><div className={styles.eye}>◉</div></article><article className={styles.tip}><span>💙 CONSEJO DEL DÍA</span><p>{tip}</p></article></section>
    <Link to="/focus" className={styles.focusCta}>Comenzar una sesión de bienestar <b>→</b></Link>
  </>
}
