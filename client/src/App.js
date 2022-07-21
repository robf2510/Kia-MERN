import React from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {HomePage, CotizandoPage, ComprandoPage, ReservandoPage} from './pages/Index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/cotizando' element={<CotizandoPage/>} />
        <Route path='/reservando' element={<ReservandoPage/>} />
        <Route path='/comprando' element={<ComprandoPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
