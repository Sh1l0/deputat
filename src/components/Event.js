import React, { Component } from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Card from '@material-ui/core/Card';
import IconMap from '@material-ui/icons/Map';
import CardHeader from '@material-ui/core/CardHeader';
import '../styles/Event.css'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default class Event extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      steps: [],
      title: ""
    }
  }

  getId = () => {
    let parts = document.URL.split('/');
    let url = parts.pop();
    return !url ? parts.pop(): url;
  }

  componentDidMount() {
    fetch(`http://130.193.38.210/api/trouble/${this.getId()}}`, {
      mode: 'cors'
    }).then(res => {
      return res.json();
    }).then(val => {
      let steps = val.images.map((src, ind) => {

        return {imgPath: {background: `url(${src.image}) center no-repeat`, backgroundSize: 'contain'}, label: `Картинка ${ind}`}
      });
      let maxSteps = steps.length;
      this.setState({
        fullResponse: val,
        title: val.title,
        steps: steps,
        maxSteps: maxSteps,
        body: val.body_text,
        place: val.place.address,
        lon: val.place.coords.lon,
        lat: val.place.coords.lat,
      })
    });
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    document.documentElement.classList.remove('no-scroll');
    return (
      <div className="main-wrapper">
      <div className='back'>
        <Link to='/' className='no-style'>
          <Button size="small" color="primary" >
            <KeyboardArrowLeft />
            назад
          </Button>
        </Link>
        <Card className=''>
          <CardHeader
            title={'Заголовок 1'}
            className='event__header'
          />
          {
            this.state.body &&
            <div className="event__additional">
              <div>
                {'Адрес: ' + this.state.place}
                <br />

              </div>
            </div>
          }
          {
            this.state.steps[0] &&
            this.state.steps[0].imgPath &&
            <AutoPlaySwipeableViews
              axis='x'
              className='event__images_width'
              index={this.state.activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {
                this.state.steps.map((step, index) => (
                  <div key={step.label}>
                    {
                      Math.abs(this.state.activeStep - index) <= 2 ? (
                        <div className='event__images' style={step.imgPath} ></div>
                      ) : null
                    }
                  </div>
                ))
              }
            </AutoPlaySwipeableViews>
          }
          {
            this.state.maxSteps &&
            <MobileStepper
              className='event__control-bar'
              steps={this.state.maxSteps}
              position="static"
              activeStep={this.state.activeStep}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === this.state.maxSteps - 1}>
                  <span className='event__control'>Следующая</span>
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  <KeyboardArrowLeft />
                  <span className="event__control">Предыдущая</span>
                </Button>
              }
            />
          }
          {
            this.state.body &&
            <p className='event__text'>
              {this.state.body.replace(/<.*?>/g, ' ')}
            </p>
          }
          <Link to={`/map?lat=${this.state.lat}&lon=${this.state.lon}`} className='no-style event__link'>
            <Button size="small" color="primary" >
              На карту
              <IconMap />
            </Button>
          </Link>
        </Card>
      </div>
      </div>
    );
  }
}
