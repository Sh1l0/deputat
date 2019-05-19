import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../styles/Auth.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

export default class Lk extends Component {
  constructor() {
    super();

  }

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
          <h2>Личный кабинет</h2>
          <div className='profile__info-area'>
            <span>Нагибатор2005</span>
          </div>
          <div className="profile__added">

          </div>
      </div>
      </div>
    )
  }
}
