import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/Map.css';

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="map" id="map">
      </div>
    )
  }
}
