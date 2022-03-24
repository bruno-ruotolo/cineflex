import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header/Header"
import MoviesScreen from "./MoviesScreen/MoviesScreen"
import MovieSession from "./MovieSession/MovieSession"

import "../css/reset.css"
import "../css/styles.css"

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MoviesScreen />} />
          <Route path="/filme/:movieId" element={<MovieSession />} />
        </Routes>
      </main>
    </BrowserRouter>
  )

}
