import { PageHeader } from '../../components/ui/PageHeader'
import { useApp } from '../../stores/AppContext'
import { categoryMeta, exercises, type ExerciseCategory } from './exercises'
import styles from './ExercisesPage.module.css'

const categories = Object.keys(categoryMeta) as ExerciseCategory[]
export function ExercisesPage() {
  const { data, dispatch } = useApp()
  return <><PageHeader eyebrow="Tu biblioteca de bienestar" title="Recarga cuerpo y mente." description="Elige un movimiento breve que se sienta bien para ti en este momento." />
    <section className={styles.completed}><span>🌱</span><div><strong>{data.completedExerciseIds.length} ejercicios completados</strong><p>¡Buen trabajo! Cada pausa que eliges es una forma de cuidar de ti.</p></div></section>
    <section className={styles.categories}>{categories.map((category) => <section key={category} className={styles.category}><header><span>{categoryMeta[category].icon}</span><div><h2>{category}</h2><p>{categoryMeta[category].description}</p></div></header><div className={styles.grid}>{exercises.filter((exercise) => exercise.category === category).map((exercise) => { const complete = data.completedExerciseIds.includes(exercise.id); return <article key={exercise.id} className={complete ? styles.done : ''}><div className={styles.icon}>{exercise.icon}</div><div className={styles.details}><span>{exercise.duration} · <b>{exercise.difficulty}</b></span><h3>{exercise.title}</h3><p>{exercise.description}</p><button onClick={() => dispatch({ type: 'TOGGLE_EXERCISE', exerciseId: exercise.id })}>{complete ? 'Ejercicio realizado ✓' : 'He realizado este ejercicio'} <b>{complete ? '↶' : '✓'}</b></button></div></article> })}</div></section>)}</section>
  </>
}
