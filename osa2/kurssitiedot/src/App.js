const Header = (course) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key = {part.id} part = {part} />)}
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

const Part = ({part}) => {
  return(
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name = {course.name}/>
      <Content parts = {course.parts}/>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
