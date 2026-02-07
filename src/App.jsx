import { useState } from 'react'
import './App.css'
import { HomePage } from './Pages/HomePage/HomePage'
import { HeroesPage } from './Pages/HeroesPage/HeroesPage'
import { HeroPage } from './Pages/HeroPage/HeroPage'
import heroPagesList from "./assets/heroPagesList.js"
import { Routes, Route } from 'react-router'
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/heroes" element={<HeroesPage />} />
        {heroPagesList.map((heroName) => {
          return (
            <Route key={heroName} path={"/heroes/:heroName"}
              element={<HeroPage />} />
          )
        })}
      </Routes>
    </>
  )
}

export default App
