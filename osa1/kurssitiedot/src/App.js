const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = (parts) => {
  console.log(parts.parts[0].name)
  return (
    <div>
      <Part name={parts.parts[0].name} exercises={parts.parts[0].exercises}/>
      <Part name={parts.parts[1].name} exercises={parts.parts[1].exercises}/>
      <Part name={parts.parts[2].name} exercises={parts.parts[2].exercises}/>
    </div>
  )
}

const Total = (exercises) => {
  return(
    <div>
      <p>
        Number of exercises {exercises.exercises[0].exercises + exercises.exercises[1].exercises + exercises.exercises[2].exercises}
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total exercises={course.parts}/>
    </div>
  )
}

export default App
