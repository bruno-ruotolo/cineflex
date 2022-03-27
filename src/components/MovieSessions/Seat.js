import { useState } from "react"

export default function Seat(props) {
  const [seatSelection, setSeatselection] = useState(false);
  const { isAvailable, name, callBack, id } = props;

  const seatClass = `seat ${isAvailable ? "available" : "unavailable"}${seatSelection ? " selected" : ""}`

  return (
    <div className={seatClass} onClick={() => {
      if (seatClass === 'seat unavailable') {
        alert("Esse assento não está disponível")
      } else {
        setSeatselection(!seatSelection);
      }
      callBack(seatClass, id);
    }}>
      <p>{name}</p>
    </div >
  )

}
