import { PageHeader } from '../../components/ui/PageHeader'
import { useApp } from '../../stores/AppContext'
import styles from './AboutPage.module.css'

const team = ['Andrés Torres Londoño', 'María Ángel Soto Martínez', 'Laura Valentina Luna Mateus', 'Edwin Alejandro Navarrete Molina', 'Darien Leandro Tibaquira Rodríguez']

export function AboutPage() {
  const { data } = useApp()
  const steps = [
    'Inicias una sesión de estudio o trabajo.',
    'HealthyScreen comienza a medir tu tiempo de enfoque.',
    `Al cumplir los ${data.settings.focusDuration} minutos configurados, recibes un aviso amable.`,
    `La aplicación te invita a realizar una pausa activa de ${data.settings.breakDuration} minutos.`,
    'Durante la pausa, te propone un ejercicio breve para cuidar tu cuerpo o tu mirada.',
    'Puedes marcar el ejercicio como realizado al terminar.',
    'Tu progreso alimenta el bienestar diario y te acerca a nuevos logros.',
  ]
  return <><PageHeader eyebrow="Conoce HealthyScreen" title="Bienestar que acompaña tu jornada." description="Una guía sencilla para estudiar o trabajar con más equilibrio frente a la pantalla." />
    <section className={styles.mission}><span>🌿</span><div><p>NUESTRA MISIÓN</p><h2>Hacer que cuidarte sea una parte natural de tu rutina.</h2><strong>HealthyScreen ayuda a estudiantes y trabajadores que pasan muchas horas frente al computador a crear hábitos que reducen la fatiga visual, la tensión muscular y el agotamiento mental.</strong></div></section>
    <section className={styles.section}><p className={styles.eyebrow}>TU RUTINA, PASO A PASO</p><h2>¿Cómo funciona?</h2><p className={styles.lead}>No tienes que planificar nada complejo. HealthyScreen te acompaña desde que empiezas a concentrarte hasta que registras una pausa que te hizo bien.</p><ol className={styles.steps}>{steps.map((step, index) => <li key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol></section>
    <section className={styles.diagram} aria-label="Flujo de HealthyScreen"><div><span>1</span><b>Sesión</b><small>{data.settings.focusDuration} min.</small></div><i>→</i><div><span>2</span><b>Aviso</b><small>Es hora de parar</small></div><i>→</i><div><span>3</span><b>Pausa activa</b><small>{data.settings.breakDuration} min.</small></div><i>→</i><div><span>4</span><b>Ejercicio</b><small>Te cuidas</small></div><i>→</i><div><span>5</span><b>Progreso</b><small>Bienestar y logros</small></div></section>
    <section className={styles.benefits}><span>☀</span><div><p>¿POR QUÉ SON IMPORTANTES LAS PAUSAS?</p><h2>Tu energía y concentración también necesitan recuperarse.</h2><p>Tomar descansos breves puede reducir la fatiga visual, mejorar la concentración y ayudar a prevenir molestias musculares. No es tiempo perdido: es una forma de sostener una jornada más saludable.</p></div></section>
    <section className={styles.team}><p className={styles.eyebrow}>HECHO PARA LA ACADEMIA</p><h2>Equipo de desarrollo</h2><div className={styles.members}>{team.map((member) => <article key={member}><span>✦</span>{member}</article>)}</div><div className={styles.course}><p><strong>Profesor</strong>David Eduardo Murcia Lesmes</p><p><strong>Asignatura</strong>Estrategias de pensamiento</p></div></section>
  </>
}
