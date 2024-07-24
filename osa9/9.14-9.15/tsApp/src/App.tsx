interface headerProps {
  courseName: string;
}

interface courseProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special";
}

interface CoursePartProps {
  part: CoursePart;
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <p>
          {props.part.name} {props.part.exerciseCount} {props.part.description}
        </p>
      );
    case "group":
      return (
        <p>
          {props.part.name} {props.part.exerciseCount}{" "}
          {props.part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {props.part.name} {props.part.exerciseCount} {props.part.description}{" "}
          {props.part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          {props.part.name} {props.part.exerciseCount} {props.part.description}{" "}
          {props.part.requirements}
        </p>
      );
    default:
      return assertNever(props.part);
  }
};

const Header = (props: headerProps) => {
  return <h1>{props.courseName}</h1>;
};

const Content = (props: courseProps) => {
  return (
    <div>
      {props.courseParts.map((part) => {
        return <Part part={part} />;
      })}
    </div>
  );
};

const Total = (props: courseProps) => {
  const exercisesSum = props.courseParts.reduce(
    (sum, c) => sum + c.exerciseCount,
    0
  );
  return <p>Number of exercises {exercisesSum}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
