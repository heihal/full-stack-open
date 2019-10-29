
import ReactDOM from 'react-dom';
import React, { useState,useEffect } from 'react'
import axios from 'axios'

import Maa from './Maa'

const App = () => {
    const[maat,setMaat]=useState([])
    const[newMaat,setNewMaat]=useState([])
   




  
    useEffect(()=>{
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setMaat(response.data)
        
      })
    },[])
    
    

  
    
  const handlaaFilsu=(event)=>{
    
    console.log(event.target.value);
    const filtteroitu=
    maat.filter(x=> x.name.toLowerCase().indexOf(event.target.value.toLowerCase())>=0)
    setNewMaat(filtteroitu)
  
  
  }

  const handlaaNappula=(uus,kaupunki)=>{
    console.log(uus,'tama on handlaaNappula uus');
    console.log(kaupunki,'handlaaNappula kaupunki');
    const filtteroitu=
    maat.filter(x=> x.name.toLowerCase().indexOf(uus.toLowerCase())>=0)
    setNewMaat(filtteroitu)
    
  }
  const handlaaDelete=(e)=>{
    if (e.keyCode === 8){
 console.log(e.target.value);
      if(e.target.value.length ===0){setNewMaat(maat)}
  }
handlaaFilsu(e)
}
  
    return (
      <div>
        <h2>Find countries</h2>
        <div><p>Filter countries by name:</p>

<input 
  onChange= {handlaaFilsu}
  onKeyDown={handlaaDelete} />
</div>

    
           <h2>Countries</h2>
           <div> 
          <Maa maat={newMaat} handlaa= {handlaaNappula}/>
          </div>

    </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));


