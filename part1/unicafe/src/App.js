import { useState } from 'react'

const Buttons = (props) => {
  return(
    <div>
      <button onClick={props.setGood}>good</button>
      <button onClick={props.setNeutral}>neutral</button>
      <button onClick={props.setBad}>bad</button>
    </div>
  )
}
const StatisticLine = ({text, value}) =>{
  return <tr><td>{text}</td><td>{value}</td></tr>
}
const Statistics = ({good, bad, neutral}) => {
  const totalCount = good + bad + neutral

  if (totalCount > 0){
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="Total votes" value ={totalCount} />
          <StatisticLine text="Average" value ={(good - bad)/totalCount} />
          <StatisticLine text="Positive" value ={(good/totalCount)*100} />
        </tbody>
      </table>
    )  
  }
  return(
    <ul>
      <li>No feedback given</li>
    </ul>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Buttons setGood={increaseGood} setNeutral={increaseNeutral} setBad={increaseBad} />
      <h1>Statistic</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App