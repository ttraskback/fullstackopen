const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.part} {props.exercise}
      </p>
  )
}

const Content = (props) => {

  const content = props.courses.map((course) =>    
        <Part part={course.part} exercise = {course.exercise} />
  );
  return (
    <div>
      {content}
    </div>
  )
}

const Total = (props) => {
  return (
      <p>Number of exercises {props.total}</p>

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
  const courses = [
    {'part': part1, 'exercise': exercises1},
    {'part': part2, 'exercise': exercises2},
    {'part': part3, 'exercise': exercises3}
  ]
  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App
