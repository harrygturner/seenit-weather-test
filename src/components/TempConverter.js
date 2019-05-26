import React from 'react';

const TempConverter = props => {
   return(
      <div className='converter' onClick={props.handleTemperatureUnitChange}>
         <div className='degrees centre highlight'>
            ˚C
         </div> 
         <div className='farenheit centre'>
            ˚F
         </div>
      </div>
   )
}

export default TempConverter;