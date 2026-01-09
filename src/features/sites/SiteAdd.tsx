import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addNotif, clearNotif } from "../notification/notificationSlice";
import { 
    clearErrors, 
    clearNotification, 
    createSite 
} from "./siteSlice";

interface Item {
    name: string;
}

const SiteAdd = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [item, setItem] = useState<Item>({
        name: ''
    })
    const { errors, notification } = useAppSelector((state) => state.sites)

    useEffect(() => {
        dispatch(clearNotification());
        dispatch(clearNotif());
        dispatch(clearErrors());
    }, [])

    useEffect(()=>{
        if(notification){
            dispatch(addNotif({type: notification.type, msg: notification.msg, feature: 'departments'}));
            dispatch(clearNotification());
            navigate('/sites');
        }
    },[notification])

    const handleSubmit = () => {
        dispatch(createSite(item));
    }

    return (
        <>
            <div className="fixed w-screen h-screen bg-[#232323] pl-[264px] p-6 text-gray-300 overflow-y-auto">
                <div className="w-96">
                    
                    {/* Header */}
                    <div className="flex items-center gap-x-6">
                        <Link to={"/sites"} className="bg-[#282828] hover:bg-[#252525] rounded w-32 h-10 border border-[#363636] shadow shadow-[#181818] relative cursor-pointer">
                            <svg className="rotate-270 w-14 absolute left-1/2 top-1/2 -translate-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M460-160v-564.69l-84.77 84.54-27.54-27.54L480-800l132.31 132.31-27.54 27.54L500-724.69V-160h-40Z"/>
                            </svg>
                        </Link>
                        <h1 className="text-xl font-bold">Add New Area</h1>
                    </div>

                    <div className="mt-6 w-3xl">
                        <div className="flex gap-x-6">
                            <div className="w-1/2 text-sm">
                                <h1>Name</h1>
                                <input onChange={(e)=>setItem({...item, name: e.target.value})} value={item.name} className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" type="text" autoComplete="off"/>
                                { errors.length > 0 && errors.find((err) => err.path === 'name') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'name')?.msg}</p> }
                            </div>
                        </div>
                        <div className="mt-6">
                            <button onClick={handleSubmit} className="px-10 h-10 rounded bg-blue-500 text-white font-bold cursor-pointer">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SiteAdd;