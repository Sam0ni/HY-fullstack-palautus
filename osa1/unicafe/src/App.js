import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({value, text}) => (
  <p>{text} {value}</p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseValue = (value, setter) => () => {
    setter(value + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseValue(good, setGood)} text={"Good"}/>
      <Button handleClick={increaseValue(neutral, setNeutral)} text={"Neutral"}/>
      <Button handleClick={increaseValue(bad, setBad)} text={"Bad"}/>
      <h1>Statistics</h1>
      <Display value={good} text={"Good"}/>
      <Display value={neutral} text={"Neutral"}/>
      <Display value={bad} text={"Bad"}/>
    </div>
  )
}

export default App