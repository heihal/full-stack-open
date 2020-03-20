import React from 'react'




const Person=({persons,poistaTyyppi})=>{
        return (
        <div>
          <Lista ihmiset = {persons} poistaTyyppi= {poistaTyyppi}/>
          
        </div>
        )
      }

const Lista =({ihmiset,poistaTyyppi})=>{
  
  return(
        ihmiset.map(x => (
          <div key={x.name}>
          <b>{x.name}</b> {x.number} <button onClick={(e)=> poistaTyyppi(x.id)} >Delete</button>
          </div>
        ))
  )
        
        }

export default Person