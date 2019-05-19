import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../styles/Card.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

export default class RecipeReviewCard extends Component {
  constructor(props) {
    super(props);
    this.title = this.props.name;
    this.description = this.props.description;
  }

  render() {
    return (
      <Card className="card">
        <CardHeader
          title={this.title}
          subheader="September 14, 2016"
        />
        <CardMedia
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {this.description}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing className='card__footer'>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button variant="contained">
            Подробнее
          </Button>
        </CardActions>
      </Card>
    );
  }
}
