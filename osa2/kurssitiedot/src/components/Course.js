const Header = (course) => {
    return (
      <div>
        <h2>{course.name}</h2>
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
  
  const Total = ({exercises}) => {
    const total = exercises.reduce((sum, current) => {
      return sum + current.exercises
    }, 0)
    return(
      <div>
        <b>
          Number of exercises {total}
        </b>
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
        <Total exercises = {course.parts}/>
      </div>
    )
  }

export default Course