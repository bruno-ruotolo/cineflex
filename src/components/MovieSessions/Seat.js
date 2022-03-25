import { useState } from "react"

export default function Seat(props) {
  const [seatSelection, setSeatselection] = useState(false);
  const { isAvailable, name } = props;

  const seatClass = `seat ${isAvailable ? "available" : "unavailable"}${seatSelection ? " selected" : ""}`
  return (
    <div className={seatClass} onClick={() => {
      seatClass === 'seat unavailable'
        ? alert("Esse assento não está disponível")
        : setSeatselection(!seatSelection)
    }}>
      <p>{name}</p>
    </div>
  )

}
