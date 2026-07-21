import type { FocusSession } from '../types/domain'

export const minutesToday = (sessions: FocusSession[]) => {
  const today = new Date().toDateString()
  return sessions
    .filter((session) => new Date(session.endedAt).toDateString() === today)
    .reduce((total, session) => total + session.durationMinutes, 0)
}

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0')
  const remaining = (seconds % 60).toString().padStart(2, '0')
  return `${minutes}:${remaining}`
}
