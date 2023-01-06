import React from 'react';
import { Route,Switch } from "react-router-dom";
import Upload from './components/File';
import Home from './components/Home';
import Init from './components/landing';
import Perfil from './components/profile';

function App() {
  localStorage.getItem('RolId') ? console.log('id exists') : console.log('id does not exist');
  return (
      <>
        <Switch>
          <Route exact path="/" component={Init} />
          <Route path="/home" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/perfil" component={Perfil} />
        </Switch>
      </>
    );
}

export default App;
