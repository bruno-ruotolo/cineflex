import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import Seat from "./Seat";

import "./styles.css"

export default function MovieSessions() {

  const [session, setSession] = useState({ day: {}, movie: {}, seats: [] });
  const [selectedSeats, setselectedSeats] = useState([]);
  const [input, setInput] = useState({ name: "", cpf: "" });

  const { sessionID } = useParams();

  console.log(session);

  const navigate = useNavigate();


  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`)
    promise.then((response) => {
      const { data } = response;
      setSession(data);
    })
  }, [sessionID]);

  function submitData(event) {
    if (!dataObject.cpf * 1) { //Tentar resolver isso amanha
      alert("Insira um Numero");
    } else {
      event.preventDefault();
      const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", dataObject)
      console.log(dataObject)

      promise.then(() => {
        console.log("Post Sucedido");
        navigate("/sucesso", { state: { ...dataObject, movie: title, weekday: weekday, hour: name } });
      })

      promise.catch((err) => alert(`Ops! Parece que algo deu errado :( (${err.reponse.status}. Tente novamente!)`))
    }
  }

  const { day, movie, name, seats } = session
  const { title, posterURL } = movie;
  const { weekday } = day;

  const dataObject =
  {
    ids: selectedSeats,
    name: input.name,
    cpf: input.cpf,
  }

  return Object.keys(session).length > 0 ?
    (
      <>
        <section className="MovieSessions">
          <h2>Selecione o(s) assento(s)</h2>
          <article className="seats">
            {seats.map((seat) => {
              const { name, isAvailable, id } = seat;
              return (
                <Seat
                  key={seat.id}
                  seat={seat}
                  isAvailable={isAvailable}
                  name={name}
                  id={id}
                  callBack={(seatClass, id) => {
                    if (!seatClass.includes(" selected")) {
                      selectedSeats.push(id)
                    } else {
                      let index = selectedSeats.indexOf(id)
                      selectedSeats.splice(index, 1)
                    }
                    setselectedSeats(selectedSeats);
                    console.log(selectedSeats)
                  }}
                />
              )
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

          <form className="user-data" onSubmit={submitData}>
            <div className="input-name">
              <p>Nome do comprador:</p>
              <input
                name="name"
                type="text"
                placeholder="Digite seu nome..."
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                value={input.name}
                required />
            </div>

            <div className="input-cpf">
              <p>CPF do comprador:</p>
              <input
                maxLength="11"
                name="cpf"
                type="text"
                placeholder="Digite seu CPF..."
                onChange={(e) => setInput({ ...input, cpf: e.target.value })}
                value={input.cpf}
                required />
            </div>
            <button type="submit">Reservar assento(s)</button>

          </form>

        </section>
        <Footer title={title} posterURL={posterURL} weekday={weekday} hour={name} />
      </>
    ) : <h1>Carregando...</h1>
}