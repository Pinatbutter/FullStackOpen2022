const Header = () => {
  return(
    <>
      <h1>{this.course}</h1>
    </>
  )
}
const Content = (course) => {
  return(
    <>
      <Parts part = {course.parts[0]}/>
      <Parts part = {course.parts[1]}/>
      <Parts part = {course.parts[2]}/>
    </>
  )
}
const Parts = (course) => {
  return(
    <>
      <p>{course.part.name} {course.part.exercises}</p>
    </>
  )
}
const Total = (total) => {
  return(
    <>
    <p>Number of exercises {total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises } </p>
    </>
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
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default App