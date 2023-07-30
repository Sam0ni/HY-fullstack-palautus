import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  return (
    <div>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>Total {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive}</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAvg] = useState(0)
  const [positive, setPos] = useState(0)

  const increaseGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    setAvg((updatedGood - bad)/ (updatedGood + neutral + bad))
    setPos((updatedGood / (updatedGood + neutral + bad)))
  }
  const increaseNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    setAvg((good - bad)/ (good + updatedNeutral + bad))
    setPos((good / (good + updatedNeutral + bad)))
  }
  const increaseBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + good + neutral)
    setAvg((good - updatedBad)/ (good + neutral + updatedBad))
    setPos((good / (good + neutral + updatedBad)))
  }



  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text={"Good"}/>
      <Button handleClick={increaseNeutral} text={"Neutral"}/>
      <Button handleClick={increaseBad} text={"Bad"}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} 
      total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App