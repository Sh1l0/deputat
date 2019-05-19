import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../styles/Auth.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';

export default class Main extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div className="black"></div>
        <div className="auth__paper">
          <Link to='/' className='auth__back'>
            <IconButton style={{padding: 0, color: 'black'}} >
              <KeyboardArrowLeft style={{fontSize: 40}} />
            </IconButton>
          </Link>
          <h2>Регистрация</h2>
          <div className='auth__input-area'>
            <label htmlFor="login">Логин</label>
            <input type="text" className="auth__input" id='login'/>
            <label htmlFor="login">Почта</label>
            <input type="text" className="auth__input" id='mail'/>
            <label htmlFor="password">Пароль</label>
            <input type="password" className="auth__input" id='password'/>
            <label htmlFor="password">Подтвердите пароль</label>
            <input type="password" className="auth__input" id='confirmPassword'/>
          </div>
          <Button className='auth__button'>Зарегистрироваться</Button>
          <br/>
           <span> или</span>
          <Link to='/login' className='default__link'>Войти</Link>
        </div>
      </div>
    )
  }
}
