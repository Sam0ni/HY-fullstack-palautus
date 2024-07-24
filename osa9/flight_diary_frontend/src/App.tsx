import { useEffect, useState } from "react";
import axios from "axios";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

interface NewEntry {
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

type Notification = null | string;

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [notification, setNotif] = useState<Notification>(null);

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries").then((response) => {
      setDiaries(response.data);
    });
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const entry: NewEntry = { date, weather, visibility, comment };
    axios
      .post<Diary>("http://localhost:3000/api/diaries", entry)
      .then((response) => {
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setNotif(error.response.data);
            setTimeout(() => {
              setNotif(null);
            }, 10000);
          }
        } else {
          console.error(error);
        }
      });
  };

  return (
    <div>
      <p style={{ color: "red" }}>{notification}</p>
      <h2>New Entry</h2>
      <form onSubmit={entryCreation}>
        <p>
          Date:
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </p>
        <div>
          Weather:{" "}
          {Object.values(Weather).map((v) => (
            <div key={v.toString()}>
              {v.toString()}{" "}
              <input type="radio" onChange={() => setWeather(v.toString())} />
            </div>
          ))}
        </div>
        <p></p>
        <div>
          Visibility:{" "}
          {Object.values(Visibility).map((v) => (
            <div key={v.toString()}>
              {v.toString()}{" "}
              <input
                type="radio"
                onChange={() => setVisibility(v.toString())}
              />
            </div>
          ))}
        </div>
        <p>
          Comment:
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </p>
        <button type="submit">add</button>
      </form>
      <h2>Entries</h2>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <h3>{d.date}</h3> <p>visibility: {d.visibility}</p>{" "}
            <p>weather: {d.weather}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
