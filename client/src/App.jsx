import { Routes, Route, Navigate } from 'react-router-dom'
import Init from './pages'
import Config from './pages/config'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Perfil from './pages/perfil'
import Upload from './pages/upload'
import { useSelector } from 'react-redux'
import Cargar from './pages/cargando'
 

function App() {
  
  const { user }=useSelector(state=>state.token)

  return (
    <>
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/validar" element={<Cargar />} />
        <Route path="/home" element={user.token ? <Home /> : <Navigate to="/" replace />} />
        <Route path="/config" element={user.token ? <Config /> : <Navigate to="/" replace />} />
        <Route path="/perfil" element={user.token ? <Perfil /> : <Navigate to="/" replace />} />
        <Route path="/upload" element={user.token ? <Upload /> : <Navigate to="/" replace />} />
        <Route path="/dashboard" element={user.token ? <Dashboard /> : <Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
