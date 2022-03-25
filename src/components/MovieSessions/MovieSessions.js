import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Footer from "../Footer/Footer";
import Seat from "./Seat";

import "./styles.css"

export default function MovieSessions() {

  const [session, setSession] = useState({ day: {}, movie: {}, seats: [] });

  const { sessionID } = useParams();

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`)
    promise.then((response) => {
      const { data } = response;
      setSession(data);
    })
  }, [sessionID])

  const { day, movie, name, seats } = session
  const { title, posterURL } = movie;
  const { weekday } = day;

  return Object.keys(session).length > 0 ?
    (
      <>
        <section className="MovieSessions">
          <h2>Selecione o(s) assento(s)</h2>
          <article className="seats">
            {seats.map((seat) => {
              const { name, isAvailable } = seat;
              return (<Seat key={seat.id} seat={seat} isAvailable={isAvailable} name={name} />)
            })}

            <div className="seats-subtitle">
              <div className="seat selected">
                <p>Selecionado</p>
              </div>

              <div className="seat available">
                <p>Disponível</p>
              </div>

              <div className="seat unavailable">
                <p>Indisponível</p>
              </div>
            </div>
          </article>

          <article className="user-data">
            <div className="input-name">
              <p>Nome do comprador:</p>
              <input type="text" placeholder="Digite seu nome..." />
            </div>

            <div className="input-cpf">
              <p>CPF do comprador:</p>
              <input type="text" placeholder="Digite seu CPF..." />
            </div>
          </article>

          <Link to="/sucesso">
            <button>Reservar assento(s)</button>
          </Link>

        </section>
        <Footer title={title} posterURL={posterURL} weekday={weekday} hour={name} />
      </>
    ) : <h1>Carregando...</h1>
}