import "./styles.css"

export default function Footer(props) {
  const { title, posterURL, weekday, hour } = props;

  return (
    <div className="Footer">
      <div className="movie-poster">
        <img src={posterURL} alt={title} />
      </div>

      <div>
        <p>{title}</p>
        {weekday ? (<p>{weekday} - {hour}</p>) : (<p></p>)}
      </div>
    </div>
  )
}