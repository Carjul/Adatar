import {Routes,Route} from 'react-router-dom'
import Init from './pages'
import Config from './pages/config'
import Dashboard from './pages/dashboard'
import Home from './pages/home'
import Login from './pages/login'
import Perfil from './pages/perfil'
import Upload from './pages/upload'

function App() {
  

  return (
    <>
     <Routes>
     <Route  path="/" element={<Init/>} />
     <Route  path="/login" element={<Login/>} />
     <Route  path="/home" element={<Home />} />
     <Route  path="/config" element={<Config/>} />
     <Route  path="/perfil" element={<Perfil/>} />
     <Route  path="/upload" element={<Upload/>} />
     <Route  path="/dashboard" element={<Dashboard />}/>
    </Routes>
    </>
  )
}

export default App
