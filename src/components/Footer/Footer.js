import "./styles.css"


export default function Footer(props) {
  const { title, posterURL } = props;

  return (
    <div className="Footer">
      <div>
        <img src={posterURL} alt={title} />
      </div>
      <p>{title}</p>
    </div>
  )
}