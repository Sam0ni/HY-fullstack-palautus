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
      <Part name={parts.part1.name} exercises={parts.part1.exercises}/>
      <Part name={parts.part2.name} exercises={parts.part2.exercises}/>
      <Part name={parts.part3.name} exercises={parts.part3.exercises}/>
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
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header name={course}/>
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]}/>
      <Total one={parts[0].exercises} two={parts[1].exercises} three={parts[2].exercises}/>
    </div>
  )
}

export default App
