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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total one={part1.exercises} two={part2.exercises} three={part3.exercises}/>
    </div>
  )
}

export default App
