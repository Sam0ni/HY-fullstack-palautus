import { Entry, Gender, newPatient, Type } from "../types";

const toNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDoB(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };
    return newPatient;
  }

  throw new Error("Some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseDoB = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseOccupation = (occup: unknown): string => {
  if (!isString(occup)) {
    throw new Error(`Incorrect or missing occupation: ${occup}`);
  }
  return occup;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (isArray(entries)) {
    entries.forEach((entry) => {
      if (!hasEntryType(entry)) {
        console.log(entry);
        throw new Error(`Entry is not of correct type: ${entry}`);
      }
    });
  } else {
    throw new Error("Entries are not in an array");
  }
  return entries;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const isArray = (array: unknown): array is [] => {
  return array instanceof Array;
};

const hasEntryType = (entry: object): entry is Entry => {
  if (!isEntry(entry)) {
    return false;
  }
  return isType(entry.type);
};

const isEntry = (entry: Object): entry is Entry => {
  if (!entry.hasOwnProperty("type")) {
    throw new Error("Entry does not include type");
  }
  return entry && typeof entry === "object" && entry.hasOwnProperty("type");
};

const isType = (type: string): type is Type => {
  return Object.values(Type)
    .map((v) => v.toString())
    .includes(type);
};

export default toNewPatient;
