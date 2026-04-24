import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/*  -------left side............... */}
        <div className='md:w-3/5 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:-mb-7'>
            <p className='text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight md:leading-tight lg:leading-tight'>
                Book appointment </p>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight md:leading-tight lg:leading-tight'> With 100+ Trusted Doctors.
            </p>
            
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="inline-flex items-center gap-2 px-8 py-3 bg-white rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-1ll duration-300">Create Account</button>
        </div>
        {/* ----------right side........... */}
        <div className='md:w-2/5 relative '>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner;