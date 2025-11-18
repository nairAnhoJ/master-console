import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { loginUser } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';

interface LoginData {
  id_number: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<LoginData>({
    id_number: "",
    password: ""
  })
  const [errors, setErrors] = useState<String[]>([]);

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = () => {
    setErrors([]);
    let currentErrors = [];
    if(!data.id_number){
    currentErrors.push("id_number")
      setErrors((prev) => [...prev, "id_number"])
    }
    if(!data.password){
    currentErrors.push("password")
      setErrors((prev) => [...prev, "password"])
    }
    if(currentErrors.length === 0){
      dispatch(loginUser(data))
    }
  }

  return (
    <>
        <div className='w-screen h-screen bg-linear-to-bl from-violet-600 to-slate-800 flex items-center justify-center'>
            <div className='bg-white px-20 pb-14 pt-10 rounded-lg w-[416px] shadow-lg'>
                <div>
                    <img src="/public/logo.ico" className='mx-auto w-16' alt="logo" />
                    <h1 className='text-center font-bold text-gray-600 text-3xl'>Sign In</h1>
                </div>
                <div className='mt-5'>
                    <p className='text-xs text-gray-500'>ID Number</p>
                    <div className='text-gray-600 flex items-center gap-x-1 w-full border-b border-gray-400'>
                        <p className='font-bold whitespace-nowrap pl-1'>HII -</p>
                        <input name='id_number' value={data.id_number} onChange={(e) => handleChangeData(e)} type="text" className='flex-1 focus:outline-none'/>
                    </div>
                    <p className='text-xs text-gray-500 mt-6'>Password</p>
                    <input name='password' value={data.password} onChange={(e) => handleChangeData(e)} type="password" className='border-b border-gray-400 px-1 w-full focus:outline-none'/>
                    <button onClick={handleSubmit} type='button' className='w-full text-sm p-3 text-white font-bold border border-gray-400 mt-10 rounded cursor-pointer bg-violet-500 hover:bg-violet-600'>LOGIN</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default LoginPage