import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Nappula= ({onClick,text}) =>(
<button onClick={onClick}>
{text}
</button>
)

const Statistics = (props) => {
    
  let summa = x => x.reduce((a,b)=>a+b,0)
  let korjattuSumma = summa(props.allClicks.map(a => Number(a)))
  let keskari= korjattuSumma/ props.allClicks.length
  
  let positiiviset = 100* props.good/ props.allClicks.length +' %'

 
  console.log(props.allClicks)
  console.log(keskari)
  console.log(positiiviset)


  if (props.allClicks.length === 0){
    return <p>No feedback given</p>
  }
  
    return(
      <table>
      <Statistic text="good" value ={props.good} />
      <Statistic text="neutral" value ={props.neutral} />
      <Statistic text="bad" value ={props.bad} />
      <Statistic text="all" value ={props.allClicks.length} />
      <Statistic text="average" value ={keskari} />
      <Statistic text="positive" value ={positiiviset} />
  
      </table>
   
    /*<div>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.allClicks.length}</p>  
    <p>average {keskari}</p> 
    <p>positive {positiiviset} %</p>           
</div> */
    
    )
    
  }


const Statistic= (props) =>{
  return (
    <tbody>
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  </tbody>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  
  //console.log(Array.isArray(allClicks))
  //console.log(allClicks)
  //console.log(keskari)
  //console.log(positiiviset)
  
 
 
  const handleGood = () => {
    setAll(allClicks.concat('1'))
    setGood(good+1)

  }
  const handleNeutral = () => {
    setAll(allClicks.concat('0'))
  setNeutral(neutral+1)
  }
  const handleBad = () => {
    setAll(allClicks.concat('-1'))
 setBad(bad+1)
  }



  return (
    <div>
        <div>
          <h1>Give feedback!</h1>
          <Nappula onClick={handleGood} text='good' />
          <Nappula onClick={handleNeutral} text='neutral' />
          <Nappula onClick={handleBad} text='bad' />
        </div>
        <div>
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />           
        </div> 
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)