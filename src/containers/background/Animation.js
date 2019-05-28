import React, { Component } from 'react';
import './animation.css';

import Sunny from '../../components/Sunny';
import Raining from '../../components/Raining';

let intervalId;

export default class Animation extends Component {

   componentDidMount() {
      this.animateBackground();
      intervalId = setInterval(() => this.animateBackground(), 18000);
   }

   componentWillUnmount() {
      clearInterval(intervalId);
   }
   
   animateBackground = () => {
      const sunBackground = document.querySelector('#sunny');
      const rainBackground = document.querySelector('#raining');
      setTimeout(() => this.changeToRaining(sunBackground, rainBackground), 5000)
      setTimeout(() => this.changeToSunny(sunBackground, rainBackground), 13000)
   }

   changeToRaining = (sunnyEL, rainingEl) => {
      this.props.animate(sunnyEL, 'middle', 'left');
      this.props.animate(rainingEl, 'right', 'middle');
      return new Promise(() => console.log('Now raining!'))
   }

   changeToSunny = (sunnyEL, rainingEl) => {
      this.props.animate(sunnyEL, 'left', 'middle');
      this.props.animate(rainingEl, 'middle', 'right');
   }

   render() {
      return(
         <div id='background' className='section'>
            < Sunny />
            < Raining />
         </div>
      )
   }
}