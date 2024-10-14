import { Fragment } from 'react/jsx-runtime'
import { useAuth } from './hooks/use-auth'
import AppRoutes from './routes/AppRoutes'

function App() {
  const { isLoad } = useAuth()

  return isLoad ? <AppRoutes /> : <Fragment />
}

export default App
