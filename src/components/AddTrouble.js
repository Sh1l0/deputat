import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/AddTrouble.css';

export default class Info extends Component {
  constructor(props) {
    super(props);
    this.firstFormInputs = ['name', 'description', 'coordinates', 'address', 'tags', 'author'];
    this.state = {
      stage: 1,
      dataLoad: false
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
      </form>
    )
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
    return fetch("/api/v1/tags");
  }
}
