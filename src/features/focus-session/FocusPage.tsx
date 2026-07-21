import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/ui/PageHeader'
import { formatDuration } from '../../lib/date'
import { useApp } from '../../stores/AppContext'
import styles from './FocusPage.module.css'

export function FocusPage() {
  const { activeSession, data, dispatch } = useApp()
  const navigate = useNavigate()
  const [now, setNow] = useState(Date.now())
  const focusSeconds = data.settings.focusDuration * 60
  const elapsedMilliseconds = useMemo(() => activeSession.elapsedMilliseconds + (activeSession.status === 'running' && activeSession.resumedAt ? now - activeSession.resumedAt : 0), [activeSession, now])
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
  const isBreakTime = activeSession.status === 'running' && elapsedSeconds >= focusSeconds

  useEffect(() => {
    if (activeSession.status !== 'running') return
    const id = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(id)
  }, [activeSession.status])

  const secondsToBreak = Math.max(0, focusSeconds - elapsedSeconds)
  const startSession = () => { setNow(Date.now()); dispatch({ type: 'START', now: Date.now() }) }
  const startBreak = () => { dispatch({ type: 'START_BREAK', now: Date.now() }); navigate('/break') }

  return <><PageHeader eyebrow="Tu momento de enfoque" title="Haz espacio para concentrarte." description="HealthyScreen te acompaña y te recuerda cuidar tu energía durante el día." />
    <section className={styles.timerCard}><p>{activeSession.status === 'running' ? 'ENFOCADO AHORA' : activeSession.status === 'paused' ? 'SESIÓN EN PAUSA' : 'LISTO PARA EMPEZAR'}</p><div className={styles.timer}>{formatDuration(elapsedSeconds)}</div><span>{activeSession.status === 'idle' ? `Tu sesión está configurada para ${data.settings.focusDuration} minutos` : isBreakTime ? 'Tu pausa está lista cuando tú lo estés.' : `Tu pausa comenzará en ${formatDuration(secondsToBreak)}`}</span><div className={styles.actions}>{activeSession.status === 'idle' && <button onClick={startSession}>Comenzar enfoque</button>}{activeSession.status === 'running' && <><button onClick={() => dispatch({ type: 'PAUSE', now: Date.now() })}>Pausar</button><button className={styles.secondary} onClick={() => dispatch({ type: 'FINISH', now: Date.now() })}>Finalizar</button></>}{activeSession.status === 'paused' && <><button onClick={() => dispatch({ type: 'RESUME', now: Date.now() })}>Reanudar</button><button className={styles.secondary} onClick={() => dispatch({ type: 'FINISH', now: Date.now() })}>Finalizar</button></>}</div></section>
    <section className={styles.tip}><span>☘</span><div><strong>El descanso también hace parte del aprendizaje.</strong><p>Apoya ambos pies en el suelo y relaja los hombros antes de continuar.</p></div></section>
    {isBreakTime && <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="break-title"><section className={styles.breakCard}><span className={styles.breakIcon}>🌿</span><p>HORA DE DESCANSAR</p><h2 id="break-title">¡Buen trabajo! Ahora dedica unos minutos a cuidar de ti.</h2><div className={styles.exercise}><span>👀</span><div><small>EJERCICIO RECOMENDADO</small><strong>Descanso visual</strong><p>Mira un objeto lejano durante 20 segundos durante tu pausa.</p></div></div><button onClick={startBreak}>Iniciar pausa de {data.settings.breakDuration} min <b>→</b></button></section></div>}
  </>
}
