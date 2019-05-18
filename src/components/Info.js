import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Map from './Map.js';
import '../styles/Info.css';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'map'
    }
  }

  render() {
    const { mode } = this.state;
    return (
      <div className="info">
        <div className="info__tabs">
          <label className="info__tab">
            Карта
            <input className="info__radio" type="radio" value="map" name="tab" onChange={this.handleSwitch} />
          </label>
          <label className="info__tab">
            Список
            <input className="info__radio" type="radio" value="list" name="tab" onChange={this.handleSwitch} />
          </label>
        </div>
        {mode === 'map' ? <Map /> : <div>Список</div> }
        <div>Здесь инфа о трабле</div>
      </div>
    )
  }

  handleSwitch = (event) => {
    this.setState({
      mode: event.target.value
    });
  } 

}
