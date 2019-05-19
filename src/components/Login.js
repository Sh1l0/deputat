import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../styles/Auth.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      remember: false
    }
  }

  handleChange = event => {
    this.setState({ remember: event.target.checked });
  };

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
          <h2>Вход</h2>
          <div className='auth__input-area'>
            <label htmlFor="login">Логин</label>
            <input type="text" className="auth__input" id='login'/>
            <label htmlFor="password">Пароль</label>
            <input type="password" className="auth__input" id='password'/>
            <div className="remember">
              <Checkbox
                checked={this.state.remember}
                onChange={(e) => {this.handleChange(e)}}
                value="remember"
                color="primary"
                id='remember'
              />
              <label htmlFor="remember">Запомнить меня</label>
            </div>
          </div>
          <Button className='auth__button'>Войти</Button>
          <br/>
           <span> или</span>
          <Link to='/register' className='default__link'>Зарегестрироваться</Link>
        </div>
      </div>
    )
  }
}
