import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../styles/Auth.css';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      phoneNumber: null,
      password: null,
      confirmPassword: null
    }
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
          <h2>Регистрация</h2>
          <form className="auth__input-area" onSubmit={this.handleSubmit}>
            <label htmlFor="username">Логин</label>
            <input type="text" className="auth__input" id='username' name='username'
              value={this.state.username} onChange={this.handleChange} />
            <label htmlFor="email">Почта</label>
            <input type="text" className="auth__input" id='email' name="email"
              value={this.state.email} onChange={this.handleChange} />
            <label htmlFor="password">Телефон</label>
            <input type="text" className="auth__input" id='phoneNumber' name='phoneNumber'
              value={this.state.phoneNumber} onChange={this.handleChange} />
            <label htmlFor="password">Пароль</label>
            <input type="password" className="auth__input" id='password' name='password'
              value={this.state.password} onChange={this.handleChange} />
            <label htmlFor="confirmPassword">Подтвердить пароль</label>
            <input type="password" className="auth__input" id='confirmPassword' name='confirmPassword'
              value={this.state.confirmPassword} onChange={this.handleChange} />
          </form>
          <Button className='auth__button' onClick={this.handleSubmit}>Зарегистрироваться</Button>
          <br/>
           <span> или</span>
          <Link to='/login' className='default__link'>Войти</Link>
        </div>
      </div>
    )
  }

  handleChange = (event) => {
    const { target } = event;
    this.setState({
        [target.name]: target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let form = this.fillForm();
    let options = {
        method: "POST",
        body: JSON.stringify(form)
    };
    options.headers = {"Content-Type": "application/json"};
    fetch('http://130.193.38.210/api/v1/users/', options)
          .then(response => {
            console.log('NICE');
              return response.json();
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
    for (let input in this.state) {
        form[input] = this.state[input];
    }
    return form;
  }
}
