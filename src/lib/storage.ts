import type { AppData } from '../types/domain'

const STORAGE_KEY = 'healthyscreen:v1'

export const defaultAppData: AppData = {
  version: 1,
  settings: {
    focusDuration: 25,
    breakDuration: 3,
    dailyGoal: 120,
    notificationsEnabled: false,
  },
  sessions: [],
  completedBreaks: 0,
  completedExerciseIds: [],
  unlockedAchievementIds: [],
}

export function loadAppData(): AppData {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (!value) return defaultAppData
    const parsed = JSON.parse(value) as Partial<AppData>
    if (parsed.version !== 1 || !parsed.settings || !Array.isArray(parsed.sessions)) return defaultAppData
    return { ...defaultAppData, ...parsed, settings: { ...defaultAppData.settings, ...parsed.settings } }
  } catch {
    return defaultAppData
  }
}

export function saveAppData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
