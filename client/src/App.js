import React from 'react';
import { Route,Switch} from "react-router-dom";
import Upload from './components/File';
import Home from './components/Home';
import Init from './components/landing';

function App() {
  return (

    <div>
      <Switch>
      <Route exact path="/" component={Init} />
        <Route  path="/home" component={Home} />
       < Route path="/upload" component={Upload} />
      </Switch>
    </div>);
}

export default App;
