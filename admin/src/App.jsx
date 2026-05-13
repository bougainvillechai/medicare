import React, { useContext } from 'react'
import Login from './pages/login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/adminContext';
const App = () => {

  const {atoken} = useContext(AdminContext)


  return atoken?  (
    <div>
      <ToastContainer />
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App