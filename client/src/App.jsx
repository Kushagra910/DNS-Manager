import './App.css'
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';

import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/Navbar';


function App() {

  return (
    <div className="w-screen min-h-screen bg-richblack-700 flex flex-col font-inter">
       <div className='w-full bg-richblack-300'><Navbar/></div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path='/*' element={<div className='flex justify-center items-center h-screen'>ERROR 404 | NOT FOUND</div>}/>
        </Routes>
    </div>
  )
}

export default App
