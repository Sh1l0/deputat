import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TroubleForm from './TroubleForm';

export default class Add extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TroubleForm method="POST" formType='add' />
    )
  }
}