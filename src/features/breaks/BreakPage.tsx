import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { formatDuration } from '../../lib/date'
import { useApp } from '../../stores/AppContext'
import styles from './BreakPage.module.css'

const recommendedExerciseId = '20-20-20'

export function BreakPage() {
  const { activeBreak, data, dispatch } = useApp()
  const navigate = useNavigate()
  const [now, setNow] = useState(Date.now())
  const targetSeconds = data.settings.breakDuration * 60
  const elapsedMilliseconds = useMemo(() => activeBreak.elapsedMilliseconds + (activeBreak.status === 'running' && activeBreak.resumedAt ? now - activeBreak.resumedAt : 0), [activeBreak, now])
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
  const remainingSeconds = Math.max(0, targetSeconds - elapsedSeconds)
  const isExerciseComplete = data.completedExerciseIds.includes(recommendedExerciseId)

  useEffect(() => {
    if (activeBreak.status !== 'running') return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [activeBreak.status])

  useEffect(() => {
    if (activeBreak.status === 'running' && elapsedSeconds >= targetSeconds) dispatch({ type: 'COMPLETE_BREAK' })
  }, [activeBreak.status, elapsedSeconds, targetSeconds, dispatch])

  const startNewSession = () => { dispatch({ type: 'START', now: Date.now() }); navigate('/focus') }
  const finishDay = () => { dispatch({ type: 'RESET_BREAK' }); navigate('/dashboard') }

  if (activeBreak.status === 'idle') return <Navigate to="/focus" replace />

  if (activeBreak.status === 'complete') return <><PageHeader eyebrow="Pausa completada" title="Tu energía también cuenta." description="Has terminado tu pausa activa. Vuelve cuando te sientas listo." /><section className={styles.returnCard}><span>✨</span><h2>¡Es momento de volver a concentrarte!</h2><p>Tomarte este tiempo fue una buena decisión para tu concentración y bienestar.</p><div><button onClick={startNewSession}>Comenzar nueva sesión</button><button className={styles.secondary} onClick={finishDay}>Finalizar mi jornada</button></div></section></>

  return <><PageHeader eyebrow="Pausa activa" title="Respira, estira y recarga." description="Durante estos minutos, no necesitas hacer nada más que cuidarte un poco." /><section className={styles.breakTimer}><p>TIEMPO DE PAUSA</p><div>{formatDuration(remainingSeconds)}</div><span>{data.settings.breakDuration} minutos reservados para tu bienestar</span></section><section className={styles.recommendation}><span>👀</span><div><p>EJERCICIO RECOMENDADO</p><h2>Regla 20-20-20</h2><strong>Mira un objeto lejano durante 20 segundos y repite tres veces.</strong><button className={isExerciseComplete ? styles.done : ''} onClick={() => dispatch({ type: 'TOGGLE_EXERCISE', exerciseId: recommendedExerciseId })}>{isExerciseComplete ? 'Ejercicio realizado ✓' : 'Marcar ejercicio como realizado'}</button></div></section><p className={styles.reminder}>Pequeñas pausas generan grandes resultados.</p></>
}
