import { Routes as Switch } from 'react-router-dom'
import { useAuth } from './hooks/use-auth'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { isLoad } = useAuth()

  return isLoad ? (
    <Switch>
      <AppRoutes />
    </Switch>
  ) : null
}

export default App
