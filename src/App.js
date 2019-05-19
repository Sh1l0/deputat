import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from './components/Info';
import Main from './components/Main';
<<<<<<< HEAD
import Login from './components/Login';
import Register from './components/Register';
=======
import Add from './components/Add';
>>>>>>> b7ef84fbd6135073b850906d343938be635920b9
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
<<<<<<< HEAD
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
=======
              <Route path="/add" component={Add} />
>>>>>>> b7ef84fbd6135073b850906d343938be635920b9
            </Switch>
        </Router>
    )
  }
}
