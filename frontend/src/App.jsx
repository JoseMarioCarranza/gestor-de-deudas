import './App.css'
import { Empleados, Home, Login, NuevoUsuario } from '@/pages'

function App() {

  return (
    <>
      <p>Gestor de deuda</p>
      <Home />
      <Empleados />
      <Login />
      <NuevoUsuario />
    </>
  )
}

export default App
