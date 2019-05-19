import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
    this.data = this.props.data;
    this.state = {
      likes: this.props.data.likedUsers.length || 0,
      canLike: true
    }
  }

  render() {
    return (
      <Card className="card">
        <CardHeader
          title={this.data.name}
          subheader={this.data.lastUpdateAt}
        />
        <CardMedia
          image={this.data.images[0]}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {this.data.description}
          </Typography>
        </CardContent>
        <CardActions disableActionSpacing className='card__footer'>
          <IconButton aria-label="Add to favorites"
            className={`${this.state.canLike ? '_liked' : ''}`} >
            <FavoriteIcon onClick={this.onLike} />
            <div className='card__likes'>{this.state.likes}</div>
          </IconButton>
          <Link to={`/trauble/${this.data.id}`} className='no-style' >
            <Button variant="contained" onClick={this.handleRedirect}>
              Подробнее
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }

  onLike = () => {
    if (this.state.canLike) {
      fetch(`/api/v1/troubles/toggle-like/${this.data.id}`)
      .then(() => {
        this.setState({
          likes: +this.state.likes + 1,
          canLike: false
        })
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  handleRedirect = () => {
    console.log('');
  }
}
