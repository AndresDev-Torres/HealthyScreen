import { AppProvider } from '../stores/AppContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
