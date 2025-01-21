import { useState } from 'react'

const StatisticLine = ({ stat, value}) => <tr><td>{stat}</td><td> {value}</td></tr>

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Statistics = ({ good, bad, neutral}) => {
  let total = good + bad + neutral
  let avg = (good-bad)/total
  let pos = ((good/total) * 100) + '%'

  if (total == 0) return <>No feedback given</>
  return(
    <>
    <table>
      <tbody>
      <StatisticLine
      stat={'good'}
      value={good}
      />
      <StatisticLine
      stat={'neutral'}
      value={neutral}
      />
        <StatisticLine
      stat={'bad'}
      value={bad}
      />
      <StatisticLine
      stat={'all'}
      value={total}
      />
      <StatisticLine
      stat={'average'}
      value={avg}
      />
      <StatisticLine
      stat={'positive'}
      value={pos}
      />
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={increaseGood}
        text='Good'
      />
      <Button
        onClick={increaseNeutral}
        text='Neutral'
      />
      <Button
        onClick={increaseBad}
        text='Bad'
      />

      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}
export default App