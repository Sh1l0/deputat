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
            <Link className='no-style' to='/add'>
              <Button variant="contained" className='main__button main__add'>Сообщить о проблеме</Button>
            </Link>
          </div>
          <div className='main__button-wrapper'>
            <Link className='no-style' to='/info'>
              <Button className='main__button' variant="contained">Узнать о проблемах города</Button>
            </Link>
          </div>
          <div className='sign-in__area'>
            <Link className='no-style' to='/login'>
              <Button className='main__button' variant="contained">Войти</Button>
            </Link>
            <Link className='no-style' to='/register'>
              <Button className='main__button' variant="contained">Регистрация</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
