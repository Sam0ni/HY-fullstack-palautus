import patients from "../data/patients";
import { newPatient, nonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getAllPatients = (): nonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation };
  });
};

const addNewPatient = (newPatient: newPatient): Patient => {
  const id = uuid();
  const patient = {
    id,
    ...newPatient,
  };
  patients.push(patient);
  return patient;
};

export default {
  getAllPatients,
  addNewPatient,
};
