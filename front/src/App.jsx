import { useState } from 'react'
import './App.css'
import { Outlet } from "react-router-dom";
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}

export default App
