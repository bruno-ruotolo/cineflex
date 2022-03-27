import { Link, useLocation } from "react-router-dom"

import "./styles.css"

export default function MovieSucess() {
  const location = useLocation();
  const { state } = location
  const { name, ids, cpf, movie, hour, weekday } = state;
  const cpfMask = cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')

  console.log(location);
  return (
    <div className="MovieSucess">
      <article>
        <h2>Pedido feito com sucesso!</h2>
        <div>
          <h3>Filme e sessão</h3>
          <p>{movie}</p>
          <p>{weekday} {hour}</p>
        </div>

        <div>
          <h3>Ingressos</h3>
          {ids.map((id) => {
            return (<p key={id}>Assento {id}</p>)
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