import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header/Header"
import MoviesScreen from "./MoviesScreen"

import "../css/reset.css"
import "../css/styles.css"

export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesScreen />} />
      </Routes>
    </BrowserRouter>
  )

}
