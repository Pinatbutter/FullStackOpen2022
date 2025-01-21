const Course = ({course}) => {
    return(
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts = {course.parts}/>
      </>
    )
  }
  const Header = ({course}) => {
    return(
      <>
        <h1>{course}</h1>
      </>
    )
  }
  const Content = ({parts}) => {
    return(
      <>
        {parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
        )}
  
      </>
    )
  }
  
  const Total = ({parts}) => {
    const initialValue = 0
    let total = parts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.exercises,
      initialValue
    );
    return(
      <>
      <b>total of exercises {total} </b>
      </>
    )
  }
export default Course