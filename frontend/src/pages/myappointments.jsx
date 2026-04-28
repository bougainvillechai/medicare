import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {

const { doctors } = useContext(AppContext);

  return (
    <div>
      <p className='pb-3 mt-12  font-medium text-zinc-900 border-b'>My Appointments</p>
      <div>{
        doctors.slice(0,2).map((item, index)=>{
          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div><img className="w-32 bg-indigo-50" src={item.image} alt="" /></div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>

                <p className='text-zinc-700 font-mediun mt-1'>Address: </p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                
                <p className='text-sm mt-1'><span className='text-sm text-nutral-700 font-medium'>Date & Time: </span><span>25, July, 2026 | 8:30pm</span></p>
              </div>
              {/* for responsive */}
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white duration-300 transition-all'>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white duration-300 transition-all'>Cancel Appointmnt</button>
              </div>
            </div>
          )
        })
      }</div>
    </div>
  )
}

export default MyAppointments