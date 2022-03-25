import "./styles.css"

export default function MovieSucess() {
  return (
    <div className="MovieSucess">
      <article>
        <h2>Pedido feito com sucesso!</h2>
        <div>
          <h3>Filme e sessão</h3>
          <p>Enola Holmes</p>
          <p>24/06/2021 15:00</p>
        </div>

        <div>
          <h3>Ingressos</h3>
          <p>Assento 15</p>
          <p>Assento 16</p>
        </div>

        <div>
          <h3>Comprador</h3>
          <p>Nome: João da Silva Sauro</p>
          <p>CPF: 123.456.789-10</p>
        </div>
      </article>

      <button>Voltar pra Home</button>
    </div>
  )
}