import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {

const { backendUrl, token, getDoctors } = useContext(AppContext);
const [appointments, setAppointments] = useState([]);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const slotDateFormat =(slotDate)=>{
   const dateArray = slotDate.split('_')
   return dateArray[0] + ' ' + months[parseInt(dateArray[1]) - 1] + ' ' + dateArray[2]
}

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12  font-medium text-zinc-900 border-b'>My Appointments</p>
      <div>
        {appointments.length === 0 ? (
          <p className='py-10 text-center text-zinc-500'>No appointments have been booked!</p>
        ) : appointments.map((item, index) => {
          const { docData } = item;
          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div><img className="w-32 bg-indigo-50" src={docData.image} alt="" /></div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{docData.name}</p>
                <p>{docData.speciality}</p>

                <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                <p className='text-xs'>{docData.address.line1}</p>
                <p className='text-xs'>{docData.address.line2}</p>
                
                <p className='text-sm mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time: </span><span>{slotDateFormat(item.slotDate)} | {item.slotTime}</span></p>
              </div>
              {/* for responsive */}
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white duration-300 transition-all'>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white duration-300 transition-all'>Cancel Appointment</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyAppointments