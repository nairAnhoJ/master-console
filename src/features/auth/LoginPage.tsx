import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface LoginData {
  id_number: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();

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
    if(!data.id_number){
      setErrors((prev) => [...prev, "id_number"])
    }
    if(!data.password){
      setErrors((prev) => [...prev, "password"])
    }
    if(errors.length === 0){
      console.log("Walang Error!!!");
    }
  }

  return (
    <>
      <div className='w-screen min-h-screen bg-linear-to-bl from-violet-600 to-slate-800 flex items-center justify-center'>
          <div className='bg-white/5 p-6 rounded-lg w-[304px]'>
                <div className='text-white flex items-center gap-x-1 w-full'>
                    <p className='font-bold whitespace-nowrap'>HII -</p>
                    <input name='id_number' value={data.id_number} onChange={(e) => handleChangeData(e)} type="text" className='flex-1 border border-gray-400 rounded py-1 px-2' placeholder='ID Number'/>
                </div>
                <input name='password' value={data.password} onChange={(e) => handleChangeData(e)} type="password" className='border border-gray-400 rounded py-1 px-2 w-full mt-3 text-white' placeholder='Password'/>
                <button onClick={handleSubmit} type='button' className='w-full text-sm p-1 text-white font-bold border border-gray-400 mt-3 rounded cursor-pointer hover:bg-white/5'>LOGIN</button>
          </div>
      </div>
    </>
  )
}

export default LoginPage