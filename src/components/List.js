import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Card from './Card.js';
import '../styles/List.css';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didLoad: false,
      cards: null
    }
  }

  render() {
    const { didLoad } = this.state;
    return (
      <div className="card-wrapper">
        {didLoad ? this.renderCards() : null}
      </div>
    )
  }

  renderCards() {
    const cards = this.state.cards.map((card) => {
      return (
        <Card data={card} key={card.id} />
      )
    });
    return cards;
  }

  componentDidMount() {
    this.loadElements();
  }

  loadElements = () => {
    this.getCards()
        .then(result => {
            return result.json();
        })
        .then(result => {
          console.log(result);
            this.setState({
                didLoad: true,
                cards: result
            });
        })
        .catch(error => {
            console.error(error);
        })
  }

  getCards() {
    return fetch('http://130.193.38.210/api/v1/troubles');
  }
}
