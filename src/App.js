import React, { Component } from 'react';
import './App.css';

import Location from './containers/Location';
import Animation from './containers/background/Animation';
import Forecast from './components/Forecast';

// const openWeatherApiKey = < insert open weather api key here >;
// const googleMapsApiKey= < insert google maps api key here >;

export default class App extends Component {

  state = {
    city: '',
    country: '',
    lat: null,
    lng: null,
    temp: 'degrees',
    forecast: null,
    error: ''
  }

  // ---------------------------- API calls ----------------------------------

  handleLocationInput = locationQuery => {
    const { city, country } = locationQuery;
    const apiQuery = city + ',+' + country;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${apiQuery}&key=${googleMapsApiKey}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.results.length !== 0){
          const {lat, lng} = data.results[0].geometry.location;
          this.setState({
            city,
            country,
            lat,
            lng
          })
          this.getForecast(lat, lng);
          this.hideLocationForm();
        } else {
          this.setState({ error: "Location can't be found." })
        }
      })
  }

  getForecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=imperial`)
      .then(resp => resp.json())
      .then(forecast => {
        if(forecast){
          this.setState({ forecast })
        } else {
          this.setState({ error: 'Server error!' })
        }
    })
  }

// ---------------------- Change component view ---------------------------

  animate = (element, remove, add) => {
    element.classList.remove(remove);
    element.classList.add(add);
  }

  appearForecastPrediction = () => {
    const weather = document.querySelector('#forecast');
    this.animate(weather, 'top', 'middle');
  }

  hideLocationForm = () => {
    const form = document.querySelector('#location');
    this.animate(form, 'middle', 'bottom');
  }

  appearLocationForm = () => {
    const form = document.querySelector('#location');
    this.animate(form, 'bottom', 'middle');
  }

  hideForecastPrediction = () => {
    const weather = document.querySelector('#forecast');
    this.animate(weather, 'middle', 'top');
  }

  handleGoBack = event => {
    event.preventDefault();
    this.appearLocationForm();
    this.hideForecastPrediction();
  }

  // ---------------------- format content structure -----------------------

  upperCaseFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

  getDateAndTime = timestamp => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(timestamp * 1000);
    return `${daysOfWeek[date.getDay()]} ${this.getTime(timestamp)}`;
  }

  getTime = timestamp => {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${hour}:${minutes}`;
  }

  toDegrees = farenheit => (farenheit - 32) * (5 / 9);

  handleTemperatureUnitChange = event => {
    const target = event.target.classList;
    if (target.contains('farenheit')){
      target.add('highlight');
      document.querySelector('.degrees').classList.remove('highlight');
      this.setState({ temp: 'farenheit' });
    } else if (target.contains('degrees')){
      target.add('highlight');
      document.querySelector('.farenheit').classList.remove('highlight');
      this.setState({ temp: 'degrees' })
    }
  }
  
  renderForecast = () => {
    const { forecast } = this.state;
    return(
      < Forecast
        city={this.upperCaseFirst(this.state.city)}
        country={this.upperCaseFirst(this.state.country)}
        getDateAndTime={this.getDateAndTime}
        getTime={this.getTime}
        handleTemperatureUnitChange={this.handleTemperatureUnitChange}
        appearForecastPrediction={this.appearForecastPrediction}
        temperature={this.state.temp === 'degrees'
          ? this.toDegrees((forecast['main']['temp']))
          : (forecast['main']['temp'])
        }
        humidity={forecast['main']['humidity']}
        windSpeed={forecast['wind']['speed']}
        pressure={forecast['main']['pressure']}
        cloudCover={forecast['clouds']['all']}
        sunrise={forecast['sys']['sunrise']}
        sunset={forecast['sys']['sunset']}
        time={forecast['dt']}
        type={forecast['weather'][0]['main']}
        handleGoBack={this.handleGoBack}
      />
    )
  }
    
  render() {
    return (
      <div className="App">
        < Animation 
          weatherType={this.state.forecast ? this.state.forecast['weather'][0]['main'] : null}
          animate={this.animate}
        />
        < Location 
          handleLocationInput={this.handleLocationInput} 
          error={this.state.error}
        />
        {this.state.forecast ? this.renderForecast() : null }
      </div>
    )
  }
}
