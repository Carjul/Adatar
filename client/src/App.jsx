import { Routes, Route, Navigate } from 'react-router-dom'
import Init from './pages'
import Config from './pages/config'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Perfil from './pages/perfil'
import Registro from './pages/registro'
import Upload from './pages/upload'
import { useSelector } from 'react-redux'
 

function App() {
  
  const { user }=useSelector(state=>state.token)

  return (
    <>
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={user.token ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/config" element={user.token ? <Config /> : <Navigate to="/login" replace />} />
        <Route path="/perfil" element={user.token ? <Perfil /> : <Navigate to="/login" replace />} />
        <Route path="/upload" element={user.token ? <Upload /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={user.token ? <Dashboard /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
