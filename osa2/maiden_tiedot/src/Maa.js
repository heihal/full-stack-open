
import React, { useState,useEffect } from 'react'
import axios from 'axios'



const Maa= ({maat,handlaa})=>{
    return (
        <div>
          <Lista maa = {maat} handlaa={handlaa} />
        </div>
        )
}


const Lista =({maa,handlaa})=>{
  


  if (maa.length > 10 || maa.length===0){
    return 'Too many matches. Please specify another filter'
  }
  else if (maa.length === 1 ){
    return maa.map(x => (
      <MaaTiedot key={x.name} country={x} />
    ))
  }
  else{
    return (
     
    maa.map(joku => (
      <div key={joku.name}>
      {joku.name}
      <button onClick= {()=> handlaa(joku.name)}>
      show
    </button>
    </div>
    ))
  
  )
}}


const MaaTiedot=({country})=>{
  const[saa,setSaa]=useState({
    temperature:"",
    wind:"",
    icon:"",
    des:"",
    dir:""
    })

  useEffect(()=>{
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=76edf789142f2d51d697dcc3429413dc`)
    .then((response) => {
      const temperature = response.data.main.temp
      const wind = response.data.wind.speed
      const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      const des=response.data.weather[0].description
      const dir = response.data.wind.deg
      setSaa({temperature, wind, icon,des,dir});
  })
  },[country])

  return (
    <div>
    <h3>{country.name}</h3> 
  <p>Capital: {country.capital}</p> 
  <p>Population: {country.population}</p> 
  <h4>Languages</h4>
  <ul>
          {country.languages.map(y =><li key={y.name}>{y.name}</li>)}
        </ul>

  <img src={country.flag} alt='tässä on kuva lipusta' width="250" height="150" border='1'/>  
  <h2>Weather in {country.capital}</h2>
  <div><h3>Temperature: {saa.temperature} Celcius</h3></div>
  <img src={saa.icon} width="200" alt="kuva säästää"/><h3>{saa.des}</h3>      
  <div><h3>Wind: {saa.wind} m/s Direction: {saa.dir} Degrees </h3></div> 


  </div> 
  
  )

}



export default Maa