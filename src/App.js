import React, { Component } from 'react';
import './App.css';

import Location from './containers/Location';
import Animation from './containers/background/Animation';
import Forecast from './containers/Forecast';

const openWeatherApiKey = 'f5c5dbaaf83d52dec5e6b6814d7e0c4c';
const googleMapsApiKey= 'AIzaSyBuFJWHFDt8qmZvZ44ljjknargpC2SXhTw';

export default class App extends Component {

  state = {
    lat: null,
    lng: null,
    forecast: {},
    error: ''
  }

  handleLocationInput = locationQuery => {
    const { city, country } = locationQuery;
    const apiQuery = city + ',+' + country;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${apiQuery}&key=${googleMapsApiKey}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.results.length !== 0){
          const {lat, lng} = data.results[0].geometry.location;
          this.setState({
            lat,
            lng
          })
          this.getForecast(lat, lng);
        } else {
          this.setState({ error: "Location can't be found." })
        }
      })
  }

  getForecast = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}`)
      .then(resp => resp.json())
      .then(forecast => {
        if(forecast){
          this.setState({ forecast })
        } else {
          debugger
          this.setState({ error: 'Server error!' })
        }
      })
    }
    
  render() {
    return (
      <div className="App">
        < Animation />
        < Location 
          handleLocationInput={this.handleLocationInput} 
          error={this.state.error}
        />
        < Forecast />
      </div>
    )
  }
}
