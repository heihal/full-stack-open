import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Nappula= ({onClick,text}) =>(
    <button onClick={onClick}>
    {text}
    </button>
)

    
const Nayta =(props) =>{

    if (props.anekdootti===0){
        return (
        <div>
        <p>If it hurts, do it more often</p>
        <p><b>This anecdote has 0 votes!</b></p>
        </div>
        )
    }
    if (props.enitenAania){
      return <p>{props.enitenAania}</p>
    }
  return(
    <div>
      <p>{props.anekdootti} </p>
      <p><b>This anecdote has {props.aanet} votes!</b></p>
    </div>
  )
}



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [aanestys,laitaAanestys] = useState(new Array(anecdotes.length).fill(0))
  
 
  const annaA=()=>{
    let joku= anecdotes[Math.floor(Math.random() * anecdotes.length)]
    setSelected(joku)
  }

const aanesta=()=>{
  const kopio = [...aanestys]
  kopio[props.anecdotes.indexOf(selected)]+=1
  laitaAanestys(kopio)  
}


  return (
    <div> 
      <h1>Anecdote of the day!</h1>
        <Nayta  anekdootti = {selected} aanet ={aanestys[anecdotes.indexOf(selected)]} />
        <Nappula onClick={aanesta} text='Vote'/>
        <Nappula onClick={annaA} text='Next anecdote!' />
      <h2>Anecdote with the most votes:</h2>
        <Nayta enitenAania ={anecdotes[aanestys.indexOf(Math.max(...aanestys))]} />        
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
