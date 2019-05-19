import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Map, TileLayer, Circle, Marker} from 'react-leaflet';
import '../styles/Map.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Profile from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

export default class MapPage extends Component {
  constructor() {
    super()
    this.state = {
      position: [55.03136920000018, 82.92307489999976],
      request: false,
      zoom: 14,
    }
  }

  showInfo = (val) => {
    const infoBlock = this.refs.info;
    console.log(infoBlock.classList);
    if(!infoBlock.classList.contains('show')) {
      infoBlock.classList.add('show');
    }
    this.setState({info: val})

  }

  hideInfo = target => {
    if(!this.refs.info) return;
    const infoBlock = this.refs.info;
    console.log(target);
    if((infoBlock.classList.contains('show')) &&
      (!target.classList.contains('no-click'))) {
      infoBlock.classList.remove('show');
    }
  }


  getIcon = () => {
    let url = "/marker_red.svg";
    var icon = L.icon({
      iconUrl: `${url}`,
      iconSize: [70, 70],
      iconAnchor: [35, 60]// size of the icon
    });
    return icon;
  }


  bindMap = (el) => {
    if(!el) return;
    this.map = el.leafletElement;
  }

  zoomIn = () => {
    this.map.zoomIn();
    this.setState({zoom: this.state.zoom + 1});
  }

  zoomOut = () => {
    this.map.zoomOut();
    this.setState({zoom: this.state.zoom - 1});
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/v1/troubles`,{//public-api/v1.4/events/?lang=ru&fields=dates,short_title,images,title,description,id&expand=dates&location=nsk&actual_since=1444385206&actual_until=1644385405&is_free=true`, { //https://justgonskapitest.azurewebsites.net    ${process.env.REACT_APP_URL}/api/Test
      mode: 'cors'
    }).then(res => {
      return res.json()
    }).then(val => {
      this.setState({list: val});
    });
  }

  render() {
    window.scroll(0, 0);
    document.documentElement.classList.add('no-scroll');
    return (
      <div className="map">
        <Map
          onClick={(e) => {this.hideInfo(e.originalEvent.target)}}
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
          <div className="map__profile">
            <Link to='/login'>
              <IconButton style={{padding: 0}} color="default">
                <Profile style={{fontSize: 50}} />
              </IconButton>
            </Link>
          </div>
          <div className='map__control no-click'>
            <button className='map__button no-click' onClick={this.zoomIn} >+</button>
            <button className='map__button no-click' onClick={this.zoomOut} >-</button>
          </div>
          <MarkerClusterGroup>
          {
            this.state.list &&
            this.state.list.map((val, ind) => {
              return (
                <Marker
                  className='map__circle no-click'
                  key={ind}
                  position={val.coordinates}
                  icon={this.getIcon()}
                  onClick={() => {this.showInfo(val)}}
                >
                </Marker>

              )
            })
          }
          </MarkerClusterGroup>
        </Map>
        <div className="map__info" ref='info'>
        {
            this.state.info &&
            <h2>{this.state.info.name.toUpperCase()}</h2>
          
        }
        </div>
      </div>
    )
  }
}
