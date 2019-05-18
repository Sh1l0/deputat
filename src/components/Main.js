import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../styles/mainPage.css';

export default class Main extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="black"></div>
        <div className="main__content">
          <div className="main__title">
            <h1>Вечерний Урбан</h1>
            <h3>Стопхрам</h3>
          </div>
          <div className='main__button-wrapper'>
            <Link className='no-style' to='/add-trouble'>
              <Button variant="contained" className='main__button'>Сообщить о проблеме</Button>
            </Link>
          </div>
          <div className='main__button-wrapper'>
            <Link className='no-style' to='/info'>
              <Button className='main__button' variant="contained">Узнать о проблемах города</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
