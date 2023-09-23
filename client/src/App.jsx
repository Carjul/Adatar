import { Routes, Route, Navigate } from 'react-router-dom'
import Init from './pages'
import Config from './pages/config'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Perfil from './pages/perfil'
import Upload from './pages/upload'
import Cargar from './pages/cargando'
import { useEffect } from 'react'
 

function App() {
/* var token;
 useEffect(()=>{
  token = localStorage.getItem('token')
 },[token]) 
 */
  return (
    <>
      <Routes>
        <Route path="/" element={<Init />} />
        <Route path="/validar" element={<Cargar />} />
        <Route path="/home" element={ <Home /> } />
        <Route path="/config" element={ <Config /> } />
        <Route path="/perfil" element={ <Perfil /> } />
        <Route path="/upload" element={ <Upload /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
      </Routes>
    </>
  )
}

export default App
