const calcaulateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (16 <= bmi && bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (17 <= bmi && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (18.5 <= bmi && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (25 <= bmi && bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (30 <= bmi && bmi < 35) {
    return "Obese (Class 1)";
  } else if (35 <= bmi && bmi < 40) {
    return "Obese (Class 2)";
  } else {
    return "Obese (Class 3)";
  }
};

const bmiArgsParse = (bmiArgs: string[]) => {
  if (bmiArgs.length < 4 || bmiArgs.length > 4) {
    throw new Error("Invalid amount of arguments");
  } else if (isNaN(Number(bmiArgs[2])) || isNaN(Number(bmiArgs[3]))) {
    throw new Error("The only values accepted are numbers!");
  }
  const bmiHeight = parseFloat(bmiArgs[2]);
  const bmiWeight = parseFloat(bmiArgs[3]);
  return {
    bmiHeight,
    bmiWeight,
  };
};
try {
  const bmiArgs = process.argv;
  const { bmiHeight, bmiWeight } = bmiArgsParse(bmiArgs);
  console.log(calcaulateBmi(bmiHeight, bmiWeight));
} catch (error: unknown) {
  if (error instanceof Error) {
    const errorMsg = `An error occurred: ${error.message}`;
    console.log(errorMsg);
  }
}

export default calcaulateBmi;
