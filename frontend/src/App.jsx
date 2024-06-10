import { Routes,Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'

function App() {
const {authUser} =useAuthContext() 
  return (
    <div className='p-4 h-screen flex items-center justify-center bg-slate-200'>
    <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>} />
      <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/>} />
      <Route path='/signup' element={authUser?<Navigate to='/'/>:<Signup/>} />
    </Routes>
    <Toaster />
    </div>
  )
}

export default App
