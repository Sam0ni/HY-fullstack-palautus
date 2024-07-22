import express from "express";
import calcaulateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = calcaulateBmi(height, weight);
      res.send({
        weight,
        height,
        bmi,
      });
    } else {
      throw new Error();
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: "malformatted parameters",
      });
    }
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  try {
    if (!daily_exercises || !target) {
      throw new Error("Parameters missing");
    }
    if (isNaN(Number(target))) {
      throw new Error("malformatted parameters");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.forEach((e: any) => {
      if (isNaN(Number(e))) {
        throw new Error("malformatted parameters");
      }
    });
    const results = calculateExercises(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      daily_exercises.map((e: any) => Number(e)),
      Number(target)
    );
    res.json(results);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
