import express from "express";
import cors from "cors";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.get("/api/ping", (__req, res) => {
  res.send("pong");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
