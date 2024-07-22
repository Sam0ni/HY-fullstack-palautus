interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: number[], target: number): result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((d) => d !== 0).length;
  const average = exercises.reduce((sum, d) => sum + d, 0) / periodLength;
  const success = average > target;
  let rating = 0;
  let ratingDescription = "";
  if (target - 0.5 < average && average < target + 0.5) {
    rating = 2;
    ratingDescription = "Not bad, but not too good either";
  } else if (target < average) {
    rating = 3;
    ratingDescription = "Very good, keep it up!";
  } else {
    rating = 1;
    ratingDescription = "There is quite a lot of room for improvement";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const argsParse = (argus: string[]) => {
  if (argus.length < 4) {
    throw new Error("Invalid amount of arguments");
  }
  argus.slice(2).forEach((e) => {
    if (isNaN(Number(e))) {
      throw new Error("The only values accepted are numbers!");
    }
  });
  const exercises = argus.slice(3).map((e) => parseFloat(e));
  const target = parseInt(argus[2]);
  return {
    exercises,
    target,
  };
};
try {
  const args = process.argv;
  const { exercises, target } = argsParse(args);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    const errorMsg = `An error occurred: ${error.message}`;
    console.log(errorMsg);
  }
}

export default calculateExercises;
