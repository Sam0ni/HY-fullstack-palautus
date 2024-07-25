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

const getSinglePatient = (id: string): Patient => {
  const singlePatient = patients.find((p) => p.id === id);
  if (singlePatient) {
    return singlePatient;
  } else {
    throw new Error("No such patient!");
  }
};

export default {
  getAllPatients,
  addNewPatient,
  getSinglePatient,
};
