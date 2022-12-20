import React from 'react';
import { Route,Switch} from "react-router-dom";
import Upload from './components/File';
import Home from './components/Home';

function App() {
  return (

    <div data-theme="winter">
      <Switch>
        <Route exact path="/" component={Home} />
       < Route path="/upload" component={Upload} />
      </Switch>
    </div>);
}

export default App;
