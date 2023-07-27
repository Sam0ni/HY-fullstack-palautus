const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = (parts) => {
  return (
    <div>
      <Part name={parts.name1} exercises={parts.exercises1}/>
      <Part name={parts.name2} exercises={parts.exercises2}/>
      <Part name={parts.name3} exercises={parts.exercises3}/>
    </div>
  )
}

const Total = (exercises) => {
  return(
    <div>
      <p>
        Number of exercises {exercises.one + exercises.two + exercises.three}
      </p>
    </div>
  )
}

const Part = (part) => {
  return(
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content name1={part1} exercises1={exercises1} name2={part2} exercises2={exercises2} name3={part3} exercises3={exercises3}/>
      <Total one={exercises1} two={exercises2} three={exercises3}/>
    </div>
  )
}

export default App
