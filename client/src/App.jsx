import React from 'react';
import { Route,Routes } from "react-router-dom";
import Config from './components/configuser';
import { Dashboard } from './components/dashboard';
import Upload from './components/File';
import Home from './components/Home';
import Init from './components/landing';
import Perfil from './components/profile';
import './index.css'

function App() {
  let rol =localStorage.getItem('RolId')
 console.log(rol)
  return (
      <>
        <Routes>
          <Route exact path="/" element={<Init/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/config" element={<Config/>}/>
        </Routes>
      </>
    );
}

export default App
