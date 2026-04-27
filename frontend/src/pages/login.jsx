import React, { useState } from 'react'

const Login = () => {

  const [state, setstate] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const onSubmitHandler = async(event)=>{
    event.preventDefault();//whenever we will submit the form it will reload the page but we dont want that so we will use this function to prevent the default behaviour of the form
  }
  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340p] sm:min-w-96 border border-zinc-300 rounded-xl text-zinc-600 text-sm shadow-lg '>
        <p className='text-2xl font-semibold'>
          {state === 'Sign Up' ? 'Create Account' : "Login"}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : "login"} to book appointment!</p>
        {
          state === 'Sign Up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} />
        </div>
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'  type="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create Account' : "Login"}</button>
        {state === 'Sign Up' ? (
          <p className='text-sm text-zinc-500'>Already have an account? <span onClick={()=>setstate('Login')} className='text-primary cursor-pointer'>Login</span></p>
        ) : (
          <p className='text-sm text-zinc-500'>Don't have an account? <span onClick={()=>setstate('Sign Up')} className='text-primary cursor-pointer'>Sign Up</span></p>
        )}
      </div>
    </form>
  )
}

export default Login