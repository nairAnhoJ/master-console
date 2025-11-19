import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { loginUser } from './authSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  id_number: string;
  password: string;
}

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { token, loading, errors} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token])

    const [data, setData] = useState<LoginData>({
        id_number: "",
        password: ""
    })

    const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = () => {
        dispatch(loginUser(data))
    }

    return (
        <>
            <div className='w-screen h-screen bg-linear-to-bl from-violet-600 to-slate-800 flex items-center justify-center'>
                <div className='bg-white px-20 pb-14 pt-10 rounded-lg w-[416px] shadow-lg'>
                    <div>
                        <img src="/public/logo.ico" className='mx-auto w-16' alt="logo" />
                        <h1 className='text-center font-bold text-gray-600 text-3xl'>Sign-In</h1>
                    </div>
                    {
                        errors?.find((err) => err.path === 'all') ? (
                            <div className='bg-red-200/50 rounded border-2 border-red-500/70 w-full h-10 flex items-center justify-center text-xs text-red-600 mt-5'>
                                { errors?.find((err) => err.path === 'all')?.msg }
                            </div>
                        ) : null
                    }
                    <div className='mt-6'>
                        <p className='text-xs text-gray-500'>ID Number</p>
                        <div className={`text-gray-600 flex items-center gap-x-1 w-full border-b ${errors?.find((err) => err.path === 'id_number') ? 'border-red-500' : 'border-gray-400' } `}>
                            <p className='font-bold whitespace-nowrap pl-1'>HII -</p>
                            <input name='id_number' value={data.id_number} onChange={(e) => handleChangeData(e)} type="text" className='flex-1 focus:outline-none'/>
                        </div>
                        <p className='text-xs text-gray-500 mt-6'>Password</p>
                        <input name='password' value={data.password} onChange={(e) => handleChangeData(e)} type="password" className={`${errors?.find((err) => err.path === 'password') ? 'border-red-500' : 'border-gray-400' } border-b  px-1 w-full focus:outline-none`}/>
                        <button disabled={loading} onClick={handleSubmit} type='button' className='w-full text-sm p-3 text-white font-bold mt-10 rounded cursor-pointer bg-violet-500 hover:bg-violet-600 relative'>
                            SIGN-IN
                            { loading && 
                                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-start pl-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white animate-spin" viewBox="0 -960 960 960">
                                        <path fill='currentColor' d="M480-46q-90 0-168.97-34.08-78.97-34.07-137.92-93.03-58.96-58.95-93.03-137.92Q46-390 46-480q0-90.14 34.06-168.88 34.07-78.74 93-137.93Q232-846 311-880t169-34q26 0 44.5 18.5T543-851q0 26-18.5 44.5T480-788q-128.01 0-218.01 89.99-89.99 89.99-89.99 218T261.99-262q89.99 90 218 90T698-261.99q90-90 90-218.01 0-26 18.5-44.5T851-543q26 0 44.5 18.5T914-480q0 90-34.06 169.01-34.07 79.01-93 138Q728-114 649.14-80 570.28-46 480-46Z"/>
                                    </svg>
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage