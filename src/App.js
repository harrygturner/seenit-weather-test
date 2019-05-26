import React, { Component } from 'react';
import './App.css';

import Location from './containers/Location';
import Animation from './containers/background/Animation';
import Forecast from './components/Forecast';

const openWeatherApiKey = 'f5c5dbaaf83d52dec5e6b6814d7e0c4c';
const googleMapsApiKey= 'AIzaSyBuFJWHFDt8qmZvZ44ljjknargpC2SXhTw';

export default class App extends Component {

  state = {
    city: 'london',
    country: 'uk',
    lat: null,
    lng: null,
    temp: 'degrees',
    forecast: {
      "coord": {
        "lon": -0.13,
        "lat": 51.51
      },
      "weather": [
        {
          "id": 521,
          "main": "Rain",
          "description": "shower rain",
          "icon": "09d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 291.78,
        "pressure": 1012,
        "humidity": 68,
        "temp_min": 289.15,
        "temp_max": 294.82
      },
      "visibility": 10000,
      "wind": {
        "speed": 8.2,
        "deg": 260
      },
      "clouds": {
        "all": 90
      },
      "dt": 1558879078,
      "sys": {
        "type": 1,
        "id": 1414,
        "message": 0.029,
        "country": "GB",
        "sunrise": 1558842907,
        "sunset": 1558900815
      },
      "timezone": 3600,
      "id": 2643743,
      "name": "London",
      "cod": 200
    },
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
    
  render() {
    const { forecast } = this.state
    return (
      <div className="App">
        < Animation />
        < Location 
          handleLocationInput={this.handleLocationInput} 
          error={this.state.error}
        />
        < Forecast 
          city={this.upperCaseFirst(this.state.city)}
          country={this.upperCaseFirst(this.state.country)}
          getDateAndTime={this.getDateAndTime}
          getTime={this.getTime}
          handleTemperatureUnitChange={this.handleTemperatureUnitChange}
          temperature={this.state.temp === 'degrees' 
            ? this.toDegrees(forecast['main']['temp']) 
            : forecast['main']['temp']
          }
          humidity={forecast['main']['humidity']}
          windSpeed={forecast['wind']['speed']}
          pressure={forecast['main']['pressure']}
          cloudCover={forecast['clouds']['all']}
          sunrise={forecast['sys']['sunrise']}
          sunset={forecast['sys']['sunset']}
          time={forecast['dt']}
          type={forecast['weather'][0]['main']}
        />
      </div>
    )
  }
}
