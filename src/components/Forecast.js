import React from 'react';
import WeatherIcon from './WeatherIcon';
import TempConverter from './TempConverter';

const Forecast = props => {
   return(
      <div id='forecast' className='section centre'>
         <div className='content'>
            <div className='header'>
               <h2>{props.city}, {props.country}</h2>
               <h4>{props.getDateAndTime(props.time)}</h4>
               <h4>{props.type}</h4>
            </div>
            <div className='details'>
               <div className='icon centre'>
                  {WeatherIcon[props.type]}
               </div>
               <div className='temp centre'>
                  {props.temperature.toFixed(0)}
                  < TempConverter 
                     handleTemperatureUnitChange={props.handleTemperatureUnitChange}
                  />
               </div>
               <div className='general centre'>
                  <p>Humidity: <span className='bold'>{props.humidity}%</span></p>
                  <p>Wind: <span className='bold'>{props.windSpeed} mph</span></p>
                  <p>Pressure: <span className='bold'>{props.pressure} hPa</span></p>
                  <p>Cloudiness: <span className='bold'>{props.cloudCover}%</span></p>
               </div>
            </div>
            <div className='day_time'>
               <p>Sunrise: {props.getTime(props.sunrise)}</p>
               <p>Sunset: {props.getTime(props.sunset)}</p>
            </div>
         </div>
      </div>
   )
}

export default Forecast;