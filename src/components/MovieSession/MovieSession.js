import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Footer from "../Footer/Footer"

import "./styles.css"

export default function MovieSession() {
  const [sessions, setSession] = useState({ days: [] });

  const { movieId } = useParams();

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`)
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
        {days.map((day, index) => {
          const { weekday, date, showtimes } = day;
          return (
            <div className="schedules" key={movieId + index}>
              <p>{weekday} - {date}</p>
              <div>
                <button>{showtimes[0].name}</button>
                <button>{showtimes[1].name}</button>
              </div>
            </div>
          )
        })}
      </div>

      <Footer title={title} posterURL={posterURL} />
    </>
  )
}