import axios from "axios"
import { useState, useEffect } from "react"

import Footer from "../Footer/Footer"

import "./styles.css"

export default function MovieSession() {

  const [sessions, setSession] = useState({});

  useEffect(() => {
    const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies/1/showtimes")
    promise.then((response) => {
      const { data } = response;
      setSession(data);
    })
  }, []);

  const { days, title, posterURL } = sessions;

  return (
    <>
      <div className="MovieSession">
        <h2>Selecione o horário</h2>
        {days.map((day) => {
          const { weekday, date } = day;
          return (
            <div className="schedules">
              <p>{weekday} - {date}</p>
              <div>
                <button>15:00</button>
                <button>15:00</button>
              </div>
            </div>
          )
        })}
      </div>

      <Footer title={title} posterURL={posterURL} />
    </>
  )
}