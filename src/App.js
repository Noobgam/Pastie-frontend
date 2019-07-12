import React, { Component } from 'react'
import './App.css';
import Menu from './components/common/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import Paste from './components/Paste';
import SpecificPaste from './components/SpecificPaste';

class MainApp extends Component {
  render() {
    return (
      <React.Fragment>
        <Menu/>                
      </React.Fragment>
    );
  }
}

const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/" component={Menu} />
      <Switch>
        <Route exact path="/" component={Paste} />
        <Route path="/" component={SpecificPaste} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
