import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { AchievementsPage } from '../features/achievements/AchievementsPage'
import { AboutPage } from '../features/about/AboutPage'
import { BreakPage } from '../features/breaks/BreakPage'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { ExercisesPage } from '../features/exercises/ExercisesPage'
import { FocusPage } from '../features/focus-session/FocusPage'
import { SettingsPage } from '../features/settings/SettingsPage'

export const router = createBrowserRouter([
  { element: <AppShell />, children: [
    { path: '/', element: <Navigate to="/dashboard" replace /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/focus', element: <FocusPage /> },
    { path: '/break', element: <BreakPage /> },
    { path: '/exercises', element: <ExercisesPage /> },
    { path: '/achievements', element: <AchievementsPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '*', element: <Navigate to="/dashboard" replace /> },
  ] },
])
