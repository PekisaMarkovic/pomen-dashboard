import { useAuth } from './hooks/use-auth'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { isLoad } = useAuth()

  return isLoad ? <AppRoutes /> : null
}

export default App
