import React from 'react';
import { Route,Switch } from "react-router-dom";
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
        <Switch>
          <Route exact path="/" component={Init} />
          <Route path="/home" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/perfil" component={Perfil} />
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/config" component={Config}/>
        </Switch>
      </>
    );
}

export default App
