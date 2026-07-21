import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { defaultAppData, loadAppData, saveAppData } from '../lib/storage'
import type { ActiveBreak, ActiveSession, AppData, FocusSession, UserSettings } from '../types/domain'

type State = { data: AppData; activeSession: ActiveSession; activeBreak: ActiveBreak }
type Action =
  | { type: 'START'; now: number }
  | { type: 'PAUSE'; now: number }
  | { type: 'RESUME'; now: number }
  | { type: 'FINISH'; now: number }
  | { type: 'START_BREAK'; now: number }
  | { type: 'COMPLETE_BREAK' }
  | { type: 'RESET_BREAK' }
  | { type: 'TOGGLE_EXERCISE'; exerciseId: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<UserSettings> }

const initialState: State = {
  data: loadAppData(),
  activeSession: { status: 'idle', startedAt: null, resumedAt: null, elapsedMilliseconds: 0 },
  activeBreak: { status: 'idle', startedAt: null, resumedAt: null, elapsedMilliseconds: 0 },
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, activeSession: { status: 'running', startedAt: action.now, resumedAt: action.now, elapsedMilliseconds: 0 }, activeBreak: initialState.activeBreak }
    case 'PAUSE': {
      const { activeSession } = state
      if (activeSession.status !== 'running' || !activeSession.resumedAt) return state
      return { ...state, activeSession: { ...activeSession, status: 'paused', resumedAt: null, elapsedMilliseconds: activeSession.elapsedMilliseconds + action.now - activeSession.resumedAt } }
    }
    case 'RESUME':
      return { ...state, activeSession: { ...state.activeSession, status: 'running', resumedAt: action.now } }
    case 'FINISH': {
      const { activeSession } = state
      const elapsedMilliseconds = activeSession.elapsedMilliseconds + (activeSession.status === 'running' && activeSession.resumedAt ? action.now - activeSession.resumedAt : 0)
      if (elapsedMilliseconds < 60_000 || !activeSession.startedAt) return { ...state, activeSession: initialState.activeSession }
      const session: FocusSession = { id: crypto.randomUUID(), startedAt: new Date(activeSession.startedAt).toISOString(), endedAt: new Date(action.now).toISOString(), durationMinutes: Math.max(1, Math.round(elapsedMilliseconds / 60_000)) }
      return { data: { ...state.data, sessions: [...state.data.sessions, session] }, activeSession: initialState.activeSession, activeBreak: state.activeBreak }
    }
    case 'START_BREAK': {
      const { activeSession } = state
      const elapsedMilliseconds = activeSession.elapsedMilliseconds + (activeSession.status === 'running' && activeSession.resumedAt ? action.now - activeSession.resumedAt : 0)
      if (!activeSession.startedAt) return state
      const session: FocusSession = { id: crypto.randomUUID(), startedAt: new Date(activeSession.startedAt).toISOString(), endedAt: new Date(action.now).toISOString(), durationMinutes: Math.max(1, Math.round(elapsedMilliseconds / 60_000)) }
      return { data: { ...state.data, sessions: [...state.data.sessions, session] }, activeSession: initialState.activeSession, activeBreak: { status: 'running', startedAt: action.now, resumedAt: action.now, elapsedMilliseconds: 0 } }
    }
    case 'COMPLETE_BREAK':
      if (state.activeBreak.status !== 'running') return state
      return { ...state, activeBreak: { ...state.activeBreak, status: 'complete', resumedAt: null }, data: { ...state.data, completedBreaks: state.data.completedBreaks + 1 } }
    case 'RESET_BREAK':
      return { ...state, activeBreak: initialState.activeBreak }
    case 'TOGGLE_EXERCISE': {
      const completed = state.data.completedExerciseIds
      const isCompleted = completed.includes(action.exerciseId)
      return { ...state, data: { ...state.data, completedExerciseIds: isCompleted ? completed.filter((id) => id !== action.exerciseId) : [...completed, action.exerciseId] } }
    }
    case 'UPDATE_SETTINGS':
      return { ...state, data: { ...state.data, settings: { ...state.data.settings, ...action.settings } } }
    default:
      return state
  }
}

type ContextValue = State & { dispatch: React.Dispatch<Action> }
const AppContext = createContext<ContextValue | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => saveAppData(state.data), [state.data])
  const value = useMemo(() => ({ ...state, dispatch }), [state])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp debe utilizarse dentro de AppProvider')
  return context
}

export { defaultAppData }
