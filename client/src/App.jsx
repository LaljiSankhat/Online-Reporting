import './App.css'
import Home from './Pages/Home'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'

function App() {
  return (
    < >
      <Navbar />
      <Outlet />
   
    </>
  )
}

export default App
