const Header = (props) => {
  return (
    <h2>{props.courseName}</h2>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => 
        <Part key={part.name} part={part.name} exercise={part.exercises} />
      )}
    </div>
  );
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  );
}

const Total = (props) => {
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Number of exercises {totalExercises}</p>
  );
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
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
