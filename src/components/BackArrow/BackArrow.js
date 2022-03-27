import { useNavigate } from "react-router-dom"

import backarrow from "./back-svgrepo-com.svg"
import "./styles.css"

export default function BackArrow() {
  const navigate = useNavigate();

  return (
    <div className="BackArrow" onClick={() => navigate(-1)}>
      <img src={backarrow} alt="BackArrow" />
    </div>
  )
}