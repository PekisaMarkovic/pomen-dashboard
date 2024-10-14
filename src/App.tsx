import { Routes as Switch } from 'react-router-dom'
import { useAuth } from './hooks/use-auth'
import { ALL_ROUTES } from './routes'

function App() {
  const { isLoad } = useAuth()

  return isLoad ? <Switch>{ALL_ROUTES}</Switch> : null
}

export default App
