import React from 'react';

const Forecast = props => {
   return(
      <div id='forecast' className='section centre'>
         <div className='content'>
            <div className='header'>
               <h2>{props.city}, {props.country}</h2>
               <h4>{props.getDateAndTime(props.forecast['dt'])}</h4>
               <h4>{props.forecast['weather'][0]['main']}</h4>
            </div>
            <div className='details'>
               <div className='type'>
                  
               </div>
               <div className='temp'>
               </div>
               <div className='wind'>
               </div>
               <div className='cloud_cover'>
               </div>
               <div className='day_time'>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Forecast;