import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/AddTrouble.css';
import {Map, TileLayer, Circle, Marker} from 'react-leaflet';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.firstFormInputs = ['name', 'description', 'coordinates', 'address', 'tags', 'author'];
    this.state = {
      stage: 1,
      dataLoad: false,
      position: [55.03136920000018, 82.92307489999976],
      request: false,
      zoom: 14,
    }
   
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="black"></div>
        <div className="main__content">
          {this.renderFirstForm()}
        </div>
      </div>
    )
  }

  renderFirstForm() {
    return (
      <form className="add-form">
        <div className="add-form__title">
          Добавление
        </div>
        {this.renderInput('Название', 'name')}
        {this.renderDescription('Описание', 'description')}
        {this.showTags()}
        <div className="add-form__map">
          <Map
            onClick={(e) => {this.selectPosition(e)}}
            center={this.state.position}
            zoomControl={false}
            zoom={this.state.zoom}
            id='map'
            ref={this.bindMap}
          >
            <TileLayer
              minZoom={12}
              maxZoom={19}
              url="http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <div className='map__control no-click'>
              <button className='map__button no-click' onClick={this.zoomIn} >+</button>
              <button className='map__button no-click' onClick={this.zoomOut} >-</button>
            </div>
          </Map>
        </div>
      </form>
    )
  }

  selectPosition = e => {
    console.log(e.latlng);
  }

  renderInput(label, name) {
    return (
      <div className="add-form__row">
        <label htmlFor={name} className="add-form__label">
          {label}
        </label>
        <input type="text" className="add-form__input" id={name} name={name} />
      </div>
    )
  }

  renderDescription(label, name) {
    return (
      <div className="add-form__row">
        <label htmlFor={name} className="add-form__label">
          {label}
        </label>
        <textarea className="add-form__textarea" id={name} name={name} rows={3} />
      </div>
    )
  }

  showTags() {
    return (
      <div className="add-form__row">
        <label className="add-form__label">
          Тэги
        </label>
        <div className='add-form__tags'>
          {this.state.dataLoad && this.renderTags()}
        </div>
      </div>
    )
  }

  renderTags() {
    let checkList = [];
    for (let checkbox of this.state.tagsData) {
        checkList.push(
            <div className="add-form__tag" key={checkbox.id}>
                <input type="checkbox" id={checkbox.id} onChange={this.handleCheck}
                    className='add-form__tag-checkbox' />
                <label htmlFor={checkbox.id} className='add-form__tag-button'>
                    {checkbox.name}
                </label>
            </div>
        )
    }
    return checkList;
}

  componentDidMount() {
    this.getTags()
            .then(result => {
                return result.json();
            })
            .then(result => {
              console.log(result);
                this.fillCheckType(result, 'tags');
                this.setState({
                    dataLoad: true,
                    tagsData: result
                })
                return;
            })
            .catch(error => {
                console.error(error);
            })
  }

  fillCheckType(data, name) {
    this[name] = {};
    for (let item of data) {
        this[name][item.id] = false;
    }
  }

  getTags() {
    return fetch("https://nominatim.openstreetmap.org/reverse?lat=55.030328112346005&lon=82.92494416236879&addressdetails=1&namedetails=1");
  }
}
