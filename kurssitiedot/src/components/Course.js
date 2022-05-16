
const Content = (course) => {
  const parts = course.parts
  console.log(course.parts)
  const sum = parts.reduce((a, b) => { return a + b.exercises;}, 0)
  console.log(sum)
  return (
    <div>
        {parts.map(part =>
        <Part key={part.id} name={part.name} points={part.exercises} />
        )}
        <h2>total of {sum} exercises</h2>
    </div>
  )
}


const Part = ({name, points}) => {
    return(
        <div>
            {name} {points}
        </div>
    )
}

const Header = ({ name }) => {
    return(
        <h1>{name}</h1>
    )
}


const Course = (course) => {
    console.log(course.name)
    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course