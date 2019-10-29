import React from 'react'

const Course =({course})=>{
    return(
      <div>
        <Otsake otsake= {course}/>
        <Sisalto kurssi={course.parts}/>
        <Total plaa={course.parts}/>
      </div>
    )
  }

  const Sisalto =({kurssi})=>{
  
    const sisalto = kurssi.map(x => (
      <li key={x.name}>
        <b>{x.name}</b> : {x.exercises} pcs
      </li>   
    ))
  
    return sisalto
    }
  
  const Otsake =({otsake})=>{
   return (
   <div>
     <h1>{otsake.name}</h1>
     </div>
   )
  }

  const Total=({plaa})=>{
  
    const total = plaa.map(x => x.exercises).reduce( (s,p) => console.log(s,p)||s+p)
    return (
    <div>
        <p>Total of {total} exercises</p>
        </div>)
  }

  export default Course