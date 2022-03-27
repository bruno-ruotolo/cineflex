import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Footer from "../Footer/Footer";
import Seat from "./Seat";
import SeatsExemples from "./SeatsExemples";

import "./styles.css"

export default function MovieSessions() {

  const [session, setSession] = useState({ day: {}, movie: {}, seats: [] });
  const [selectedSeats, setselectedSeats] = useState({ seatName: [], seatId: [] });
  const [input, setInput] = useState({ name: "", cpf: "" });

  const { sessionID } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`)
    promise.then((response) => {
      const { data } = response;
      setSession(data);
    });
    promise.catch(error => console.log(error.response));
  }, [sessionID]);

  function submitData(event) {
    console.log(selectedSeats.seatId);
    if (selectedSeats.seatId.length === 0) {
      alert("Selecione pelo menos um assento");
    } else {
      event.preventDefault();
      const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", dataObject)

      promise.then(() => {
        navigate("/sucesso", {
          state:
          {
            ...dataObject,
            movie: title,
            weekday: weekday,
            hour: name,
            seatName: selectedSeats.seatName,
          }
        });
      });
      promise.catch((err) => alert(`Ops! Parece que algo deu errado :( (${err.reponse.status}. Tente novamente!)`))
    }
  }

  const { day: { weekday }, movie: { title, posterURL }, name, seats } = session

  const dataObject =
  {
    ids: selectedSeats.seatId,
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
                  callBack={(seatClass, id, name) => {
                    if (!seatClass.includes(" selected")) {
                      selectedSeats.seatId.push(id);
                      selectedSeats.seatName.push(name);
                    } else {
                      let index = selectedSeats.seatId.indexOf(id);
                      selectedSeats.seatId.splice(index, 1);

                      let indexName = selectedSeats.seatName.indexOf(name);
                      selectedSeats.seatName.splice(indexName, 1);
                    }
                    setselectedSeats(
                      {
                        ...selectedSeats,
                        seatId: selectedSeats.seatId,
                        seatName: selectedSeats.seatName
                      }
                    );
                  }}
                />
              )
            })}
            <SeatsExemples />
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
                placeholder="Digite seu CPF... (somente números)"
                onChange={(e) => setInput({ ...input, cpf: e.target.value })}
                value={input.cpf}
                title="Deve conter somente números"
                pattern="[0-9]+"
                required />
            </div>
            <button type="submit">Reservar assento(s)</button>
          </form>
        </section>

        <Footer title={title} posterURL={posterURL} weekday={weekday} hour={name} />
      </>
    ) : <h1>Carregando...</h1>
}