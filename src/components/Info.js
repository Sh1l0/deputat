import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Map from './Map.js';
import '../styles/Info.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

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
          <Link to='/' className="info__back">
            <KeyboardArrowLeft />
          </Link>
          <div className='info__inner-tabs'>
            <label className={`info__tab ${this.state.mode === 'map' ? 'active' : ''}`}>
              Карта
              <input className="info__radio" type="radio" value="map" name="tab" onChange={this.handleSwitch} />
            </label>
            <label className={`info__tab ${this.state.mode !== 'map' ? 'active' : ''}`}>
              Список
              <input className="info__radio" type="radio" value="list" name="tab" onChange={this.handleSwitch} />
            </label>
          </div>
        </div>
        {mode === 'map' ? <Map /> : <div>Список</div> }
      </div>
    )
  }

  handleSwitch = (event) => {

    this.setState({
      mode: event.target.value
    });
  }

}
