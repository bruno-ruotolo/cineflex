import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

import Footer from "../Footer/Footer"

import "./styles.css"

export default function MovieDate() {
  const [movieDate, setMovieDate] = useState({ days: [] });

  const { movieId } = useParams();

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`)
    promise.then((response) => {
      const { data } = response;
      setMovieDate(data);
    })
  }, [movieId]);

  const { days, title, posterURL } = movieDate;
  console.log(days);

  return days.length > 0 ? (
    <>
      <div className="MovieDate">
        <h2>Selecione o horário</h2>
        {days.map((day, index) => {

          const { weekday, date, showtimes } = day;
          const [sessionOne, sessionTwo] = showtimes;
          const { name: nameOne, id: idOne } = sessionOne;
          const { name: nameTwo, id: idTwo } = sessionTwo;

          return (
            <div className="schedules" key={movieId + index}>
              <p>{weekday} - {date}</p>
              <div>
                <Link to={`/sessao/${idOne}`}>
                  <button>{nameOne}</button>
                </Link>

                <Link to={`/sessao/${idTwo}`}>
                  <button>{nameTwo}</button>
                </Link>
              </div>
            </div>
          )

        })}
      </div>

      <Footer title={title} posterURL={posterURL} />
    </>
  ) : <p>Carregando...</p>
}