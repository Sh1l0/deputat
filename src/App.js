import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from './components/Info';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <Router>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/info" component={Info} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
        </Router>
    )
  }
}
