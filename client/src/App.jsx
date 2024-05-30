import './App.css'
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import Edit from './components/dashboard/Edit';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Navbar } from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllRecords ,getAllHostedZones} from './services/operations/recordsApi';
import  Update from './components/dashboard/Update';


function App() {

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {records,hostedZones} = useSelector((state) => (state.record));
  useEffect(() => {
    if (token) {
      dispatch(getAllRecords(token));
      dispatch(getAllHostedZones(token));
    }
  }, [dispatch, token]);
  console.log("RECORDS" , records);
  console.log("HOSTED_ZONES" , hostedZones);

  return (
    <div className=" min-h-screen bg-richblack-700 flex flex-col font-inter overflow-y-auto">
       <div className='w-full bg-richblack-300 '><Navbar/></div>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path="/createRecord" element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route path="/update/:recordId" element={<ProtectedRoute><Update/></ProtectedRoute>}/>
          <Route path='/*' element={<div className='flex justify-center items-center h-screen'>ERROR 404 | NOT FOUND</div>}/>
        </Routes>
    </div>
  )
}

export default App
