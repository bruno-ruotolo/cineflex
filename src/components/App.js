import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header/Header"
import MoviesScreen from "./MoviesScreen/MoviesScreen"
import MovieDate from "./MovieDate/MovieDate"
import MovieSessions from "./MovieSessions/MovieSessions"
import MovieSucess from "./MovieSucess/MovieSucess"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MoviesScreen />} />
          <Route path="/filme/:movieId" element={<MovieDate />} />
          <Route path="/sessao/:sessionID" element={<MovieSessions />} />
          <Route path="/sucesso" element={<MovieSucess />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
