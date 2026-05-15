import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import { AdminContext } from './context/adminContext';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/dashboard';
import AddDoctor from './pages/Admin/addDoctor';
import AllAppointments from './pages/Admin/allAppointments';
import DoctorsList from './pages/Admin/doctorsList';

const App = () => {

  const {atoken} = useContext(AdminContext)


  return atoken?  (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />}/>
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctors-list' element={<DoctorsList/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App