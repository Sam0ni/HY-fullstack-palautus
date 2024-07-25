import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getAllPatients();
  res.send(patients);
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addNewPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += ` Error: ${error}`;
    }
    res.status(400).send(errorMsg);
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getSinglePatient(id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong.";
    if (error instanceof Error) {
      errorMsg += ` Error: ${error}`;
    }
    res.status(400).send(errorMsg);
  }
});

export default router;
