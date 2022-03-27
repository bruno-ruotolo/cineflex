import { Link, useLocation } from "react-router-dom"

import "./styles.css"

export default function MovieSucess() {
  const location = useLocation();
  const { state: { name, cpf, movie, hour, date, seatName } } = location
  const pattern = /(\d{3})(\d{3})(\d{3})(\d{2})/;
  const cpfMask = cpf.replace(pattern, '$1.$2.$3-$4');

  return (
    <div className="MovieSucess">
      <article>
        <h2>Pedido feito com sucesso!</h2>
        <div>
          <h3>Filme e sessão</h3>
          <p>{movie}</p>
          <p>{date} {hour}</p>
        </div>

        <div>
          <h3>Ingressos</h3>
          {seatName.map((seatName) => {
            return (<p key={seatName}>Assento {seatName}</p>)
          })}
        </div>

        <div>
          <h3>Comprador</h3>
          <p>Nome: {name}</p>
          <p>CPF: {cpfMask}</p>
        </div>
      </article>

      <Link to="/" >
        <button>Voltar pra Home</button>
      </Link>
    </div>
  )
}