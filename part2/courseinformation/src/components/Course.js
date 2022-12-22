const Part = ({part}) => {
  return (
      <li>
        {part.name} {part.exercises}
      </li>
  )
}

const Content = ({parts}) => {

  const content = parts.map((part) =>    
        <Part key={part.id} part={part} />
  );
  return (
    <ul>
      {content}
    </ul>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => {
    return s+p.exercises 
  },0)
  return (
      <p>Number of exercises {total}</p>

  )
}
const Course = ({course}) => {
    return(
      <div key={course.id}>
        <h1>{course.name}</h1>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course