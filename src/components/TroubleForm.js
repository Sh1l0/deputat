import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/TroubleForm.css';
import {Map, TileLayer, Circle, Marker} from 'react-leaflet';
import L from 'leaflet';
import Button from '@material-ui/core/Button';
import 'react-leaflet-markercluster/dist/styles.min.css';

export default class TroubleForm extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.id || null;
    this.method = this.props.method;
    this.formType = this.props.formType;
    this.picturesNames = [];
    this.inputs = {
      add: ['name', 'description', 'address', 'coordinates', 'tags'],
      edit: ['name', 'description', 'address', 'coordinates', 'tags']
    };
    this.titles = {
      add: 'Добавить',
      edit: 'Изменить',
    };
    this.state = {
      stage: 'form',
      dataLoad: false,
      position: [55.03136920000018, 82.92307489999976],
      request: false,
      zoom: 14,
      name: "",
      description: "",
      tags: [],
      address: "",
      coordinates: "",
      pictures: [],
      info: ""
    }
   
  }

  render() {
    const { stage } = this.state;
    return (
      <div className="main-wrapper">
        <div className="black"></div>
        <div className="main__content">
          {stage === 'form' && this.renderFirstForm()}
          {stage === 'formData' && this.renderSecondForm()}
        </div>
      </div>
    )
  }

  renderFirstForm() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <div className="add-form__title">
          {this.titles[this.formType]}
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
            <Marker
                  className='map__circle no-click'
                  position={this.state.coordinates || [0, 0]}
                  icon={this.getIcon()}
                >
            </Marker>
          </Map>
        </div>
        <Button variant="contained" onClick={this.handleSubmit}>
          Подтвердить
        </Button>
      </form>
    )
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

  renderSecondForm() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <div className="add-form__title">
          {this.titles[this.formType]}
        </div>
        <div className="add-form__row">
          <label htmlFor='pictures' className="add-form__label">
            Фотографии
          </label>
          <input type="file" id='pictures' name='pictures'  accept="image/x-png,image/jpeg"
            onChange={this.handleImageChange} multiple />
        </div>
        <Button variant="contained" onClick={this.handleSubmit}>
          Подтвердить
        </Button>
      </form>
    )
  }

  handleImageChange = (event) => {
    const files = event.target.files;
    console.log(files);
    for (let file of files) {
      this.picturesNames.push(file.name)
    }
    this.setState({
        pictures: files
    });
  }

  selectPosition = e => {
    const x = e.latlng.lat;
    const y = e.latlng.lng;
    this.getAddress([x, y])
      .then(response => {
        return response.text();
      })
      .then(response => {
        console.log(response);
        const cityStart = response.indexOf('<city>') + 6;
        const cityEnd = response.indexOf('</city>');
        const city = response.slice(cityStart, cityEnd);
        const roadStart = response.indexOf('<road>') + 6;
        const roadEnd = response.indexOf('</road>');
        const road = response.slice(roadStart, roadEnd);
        const houseStart = response.indexOf('<house_number>');
        const houseEnd = response.indexOf('</house_number>');
        const house = houseStart >= 0 ? response.slice(houseStart + 14, houseEnd) : null;
        if (house) {
          this.setState({
            address: `${city}, ${road}, ${house}`,
            coordinates: [x, y]
          });
        } else {
          this.setState({
            address: `${city}, ${road}`,
            coordinates: [x, y]
          });
        }
        
      })
      .catch(error => {
        console.error(error);
      })
  }

  getAddress(coordinates) {
    return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&addressdetails=1&namedetails=1`);
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({
        [target.name]: target.value
    })
  }

  handleCheck = (event) => {
    const { target } = event;
    this.tags[target.id] = target.checked;
    this.fillTypes('tags');
  }

  renderInput(label, name) {
    return (
      <div className="add-form__row">
        <label htmlFor={name} className="add-form__label">
          {label}
        </label>
        <input type="text" className="add-form__input" id={name} name={name} value={this.state[name]} onChange={this.handleChange} />
      </div>
    )
  }

  renderDescription(label, name) {
    return (
      <div className="add-form__row">
        <label htmlFor={name} className="add-form__label">
          {label}
        </label>
        <textarea className="add-form__textarea" id={name} name={name} rows={3} value={this.state[name]} onChange={this.handleChange} />
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
            .then(response => {
                return response.json();
            })
            .then(response => {
              console.log(response);
                this.fillCheckType(response, 'tags');
                this.setState({
                    dataLoad: true,
                    tagsData: response
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

  fillTypes(name) {
    let typesNew = [];
    for (let type in this[name]) {
        if (this[name][type]) {
            typesNew.push(type);
        }
    }
    this.setState({
        [name]: typesNew
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form;
    if (this.state.stage === 'form') {
      form = this.fillForm();
    }
    if (this.state.stage === 'formData') {
      form = this.fillFormData();
    }
    let options = {
        method: this.method,
        body: this.state.stage === 'form' ? JSON.stringify(form) : form
    };
    if (this.state.stage === 'form') {
        options.headers = {"Content-Type": "application/json"}
    }
    fetch(this.getUrl(), options)
          .then(response => {
              return response.json();
          })
          .then(response => {
              if (this.state.stage === 'form' && this.formType === 'add') {
                this.id = response.id;
                console.log(this.id);
                this.setState({
                  stage: 'formData',
                  info: 'Операция успешно завершена'
                });
              }
              return;
          })
        .catch(error => {
            console.error(error);
            this.setState({
                info: 'Ошибка'
            });
        })
  }

  fillForm() {
    let form = {};
    for (let input of this.inputs[this.formType]) {
        if (this.formType === 'add') {
          form[input] = this.state[input];
        } else {
          if (this.state[input] && this.state[input].length) {
            form[input] = this.state[input];
          }
        }
    }
    return form;
  }

  fillFormData() {
    var formData = new FormData();
    formData.append('id', this.id);
    for (let i = 0; i < this.picturesNames.length; i++) {
      formData.append('pictures', this.state.pictures[i], this.picturesNames[i]);
    }
    return formData;
  }

  getUrl() {
    if (this.formType === 'add' && this.state.stage === 'form') {
        return 'http://localhost:5000/api/v1/troubles';
    }
    if (this.formType === 'edit') {
        return `http://localhost:5000/api/v1/troubles/${'id'}`;
    }
    if (this.state.stage === 'formData') {
        return 'http://localhost:5000/api/v1/pictures/UploadPictures';
    }
  }

  getTags() {
    return fetch("http://localhost:5000/api/v1/tags");
  }
}
