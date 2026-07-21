export type SessionStatus = 'idle' | 'running' | 'paused'

export interface FocusSession {
  id: string
  startedAt: string
  endedAt: string
  durationMinutes: number
}

export interface UserSettings {
  focusDuration: number
  breakDuration: number
  dailyGoal: number
  notificationsEnabled: boolean
}

export interface AppData {
  version: 1
  settings: UserSettings
  sessions: FocusSession[]
  completedBreaks: number
  completedExerciseIds: string[]
  unlockedAchievementIds: string[]
}

export interface ActiveSession {
  status: SessionStatus
  startedAt: number | null
  resumedAt: number | null
  elapsedMilliseconds: number
}

export interface ActiveBreak {
  status: 'idle' | 'running' | 'complete'
  startedAt: number | null
  resumedAt: number | null
  elapsedMilliseconds: number
}
