import {useState} from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Chat } from './components/Chat.jsx'
import { Login } from './components/Login.jsx'
import { Register } from './components/Register.jsx'

export const App = () => {

  const [user, setUser] = useState()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/chat' element={<Chat user={user} />} />
      </Routes>
    </BrowserRouter>
  )
}

