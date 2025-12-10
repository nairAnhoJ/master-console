import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { clearNotif } from "./notificationSlice";


const Notification = () => {
    const dispatch = useAppDispatch();
    const { type, msg } = useAppSelector((state) => state.notification)

    useEffect(() => {
        setTimeout(() => {
            dispatch(clearNotif())
        }, 3000)
    }, [])

    return (
        <>
            <div onClick={() => dispatch(clearNotif())} className={`
                fixed left-1/2 -translate-x-1/2 top-6 
                w-96 h-20 
                px-5 
                rounded-lg 
                text-white font-bold
                bg-linear-to-r from-emerald-900 via-[#151515] via-35% to-[#151515]
                shadow-lg shadow-[#080808]
                flex items-center justify-center gap-x-3
                cursor-pointer
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`
                    h-10 
                    w-10 
                    p-1.5 
                    ${(type === 'success') && 'bg-white/5 text-emerald-500'}
                    ${(type === 'error') && 'bg-red-500/10 '}
                    rounded-full
                `}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"/>
                </svg>
                <div className="flex-1">
                    {msg}
                </div>
            </div>
        </>
    )
}

export default Notification;