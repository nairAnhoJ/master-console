import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearErrors, clearNotification, createUser } from "./userSlice";
import { fetchDepartments } from "../departments/departmentSlice";
import { fetchSites } from "../sites/siteSlice";
import { fetchArea } from "../areas/areaSlice";
import { addNotif, clearNotif } from "../notification/notificationSlice";

interface User {
    id_number: string;
    name: string;
    department_id: number | null;
    site_id: number | null;
    email: string;
    phone: string;
    allowed_app: string[];
    role: string;
    mrf_area_id: number[];
    signature: File | null;
}

const UsersAdd = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        id_number: '',
        name: '',
        department_id: 5,
        site_id: 1,
        email: '',
        phone: '',
        allowed_app: [],
        role: 'site_admin',
        mrf_area_id: [],
        signature: null,
    })
    const { departments } = useAppSelector((state) => state.departments)
    const { sites } = useAppSelector((state) => state.sites)
    const { areas } = useAppSelector((state) => state.areas)
    const { errors, notification } = useAppSelector((state) => state.users)
    const [fileError, setFileError] = useState<string>('')
    const [signPrev,setSignPrev] = useState<string | null>(null);
    const allowedAppsOptions = ['mrf', 'master-console'];

    useEffect(() => {
        dispatch(fetchDepartments(''));
        dispatch(fetchSites());
        dispatch(fetchArea());
        dispatch(clearNotif());
        dispatch(clearErrors());
    }, [])

    useEffect(()=>{
        if(notification){
            dispatch(addNotif({type: notification.type, msg: notification.msg, feature: 'users'}));
            dispatch(clearNotification());
            navigate('/users');
        }
    },[notification])

    const handleAllowedAppsClick = (app: string) => {
        setUser((prev) => ({...prev, allowed_app:
            prev.allowed_app.includes(app) ? prev.allowed_app.filter((aapp) => aapp !== app) : [...prev.allowed_app, app]
        }))
    }

    const handleMRFAreaClick = (area: number) => {
        setUser((prev) => ({...prev, mrf_area_id:
            prev.mrf_area_id.includes(area) ? prev.mrf_area_id.filter((aarea) => aarea !== area) : [...prev.mrf_area_id, area]
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setFileError('');
        if(files && files.length > 0){
            if(files?.[0].type === 'image/png'){
                setUser((prev) => ({...prev, signature: files[0]}));
                setSignPrev(files[0].type.startsWith("image/") ? URL.createObjectURL(files[0]) : null);
            }else{
                setFileError('type');
            }
        }else{
            setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
        }
    }

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUser((prev) => ({...prev, [e.target.name]: Number(e.target.value)}));
    }

    const handleClearSignature = () => {
        setUser((prev) => ({...prev, signature: null}));
        setSignPrev(null);
    }

    const handleSubmit = () => {
        dispatch(createUser(user));
    }

    return (
        <>
            <div className="fixed w-screen h-screen bg-[#232323] pl-[264px] p-6 text-gray-300 overflow-y-auto">
                <div className="w-96">
                    
                    {/* Header */}
                    <div className="flex items-center gap-x-6">
                        <Link to={"/users"} className="bg-[#282828] hover:bg-[#252525] rounded w-32 h-10 border border-[#363636] shadow shadow-[#181818] relative cursor-pointer">
                            <svg className="rotate-270 w-14 absolute left-1/2 top-1/2 -translate-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="M460-160v-564.69l-84.77 84.54-27.54-27.54L480-800l132.31 132.31-27.54 27.54L500-724.69V-160h-40Z"/>
                            </svg>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="M360-240 120-480l240-240 56 56-144 144h568v80H272l144 144-56 56Z"/>
                            </svg> */}
                        </Link>
                        <h1 className="text-xl font-bold">Add New User</h1>
                    </div>

                    <div className="mt-6 w-3xl">
                        <div className="flex gap-x-6">
                            <div className="w-1/2 text-sm">
                                <h1>ID Number</h1>
                                <input onChange={handleChange} value={user.id_number} name="id_number" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" type="text" autoComplete="off"/>
                                    { errors.length > 0 && errors.find((err) => err.path === 'id_number') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'id_number')?.msg}</p> }
                            </div>
                            <div className="w-1/2 text-sm">
                                <h1>Name</h1>
                                <input onChange={handleChange} value={user.name} name="name" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" type="text" autoComplete="off"/>
                                { errors.length > 0 && errors.find((err) => err.path === 'name') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'name')?.msg}</p> }
                            </div>
                        </div>
                        <div className="flex gap-x-6 mt-6">
                            <div className="w-1/2 text-sm">
                                <h1>Department</h1>
                                <select onChange={handleChangeSelect} name="department_id" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" id="">
                                    { departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                                    )) }
                                </select>
                            </div>
                            <div className="w-1/2 text-sm">
                                <h1>Site</h1>
                                <select onChange={handleChangeSelect} name="site_id" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" id="">
                                    { sites.map((site) => (
                                        <option key={site.id} value={site.id}>{site.name}</option>
                                    )) }
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-x-6 mt-6">
                            <div className="w-2/3 text-sm">
                                <h1>Email</h1>
                                <input onChange={handleChange} value={user.email} name="email" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" type="text" autoComplete="off"/>
                                { errors.length > 0 && errors.find((err) => err.path === 'email') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'email')?.msg}</p> }
                            </div>
                            <div className="w-1/3 text-sm">
                                <h1>Phone</h1>
                                <input onChange={handleChange} value={user.phone} name="phone" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0" type="text" autoComplete="off"/>
                                { errors.length > 0 && errors.find((err) => err.path === 'phone') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'phone')?.msg}</p> }
                            </div>
                        </div>
                        <div className="w-full text-sm mt-6">
                            <h1>Allowed Applications</h1>
                            <div className="w-full grid grid-cols-3 gap-x-3">
                                {allowedAppsOptions.map((app) => (
                                    <div onClick={() => handleAllowedAppsClick(app)} key={app} className={`flex items-center justify-between gap-x-1 cursor-pointer p-3 py-4 rounded transition-all border border-[#505050] ${user.allowed_app.includes(app) && 'border-pink-500'}`}>
                                        <p>{app}</p>
                                        <div className={`flex items-center justify-center border border-[#707070] w-5 h-5 rounded transition-all ${user.allowed_app.includes(app) && 'bg-pink-500 border-pink-400'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-white transition-all ${user.allowed_app.includes(app) ? 'opacity-100' : 'opacity-0'}`} viewBox="0 -960 960 960" fill="currentColor">
                                                <path d="M382-200 113-469l97-97 172 173 369-369 97 96-466 466Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            { errors.length > 0 && errors.find((err) => err.path === 'allowed_app') && <p className="text-red-500 italic">{errors.find((err) => err.path === 'allowed_app')?.msg}</p> }
                        </div>
                        {
                            user.allowed_app.includes("mrf") &&
                            <div className="border border-[#707070] w-full rounded-lg mt-6 p-4 relative">
                                {/* Title */}
                                <h1 className="font-semibold absolute top-0 -translate-y-1/2 bg-[#232323] px-2">MRF</h1>

                                {/* Form */}
                                <div className="w-full text-sm">
                                    {/* Role */}
                                    <div className="w-1/3">
                                        <h1>Role</h1>
                                        <select onChange={handleChangeSelect} name="role" className="rounded p-2 w-full bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0">
                                            <option value={'site_admin'}>Site Admin</option>
                                            <option value={'site_tl'}>Site Team Leader</option>
                                            <option value={'site_supv'}>Site Supervisor</option>
                                            <option value={'svc_tech'}>Service Technical Support</option>
                                            <option value={'svc_coor'}>Service Coordinator</option>
                                            <option value={'svc_head'}>Service Head</option>
                                            <option value={'rental'}>Rental</option>
                                            <option value={'mri'}>MRI Encoder</option>
                                            <option value={'doc_enc'}>Doc Number Encoder</option>
                                            <option value={'dr_enc'}>DR Encoder</option>
                                        </select>
                                    </div>

                                    {/* Area */}
                                    <div className="w-full mt-3">
                                        <h1>Area</h1>
                                        { errors.length > 0 && errors.find((err) => err.path === 'area') && !user.signature && <p className="text-red-500 italic">{errors.find((err) => err.path === 'area')?.msg}</p> }
                                        <div className="w-full grid grid-cols-3 gap-3">
                                            { areas.map((area) => (
                                                <div onClick={() => handleMRFAreaClick(area.id)} key={area.id} className={`flex items-center justify-between gap-x-1 cursor-pointer p-3 rounded transition-all border border-[#505050] ${user.mrf_area_id.includes(area.id) && 'border-pink-500'}`}>
                                                    <p className="whitespace-nowrap overflow-hidden">{area.name}</p>
                                                    <div className={`flex items-center justify-center border border-[#707070] w-5 h-5 rounded transition-all ${user.mrf_area_id.includes(area.id) && 'bg-pink-500 border-pink-400'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 text-white transition-all ${user.mrf_area_id.includes(area.id) ? 'opacity-100' : 'opacity-0'}`} viewBox="0 -960 960 960" fill="currentColor">
                                                            <path d="M382-200 113-469l97-97 172 173 369-369 97 96-466 466Z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            )) }
                                        </div>
                                    </div>

                                    {/* Signature Upload */}
                                    <div className="w-full mt-3">
                                        <p>Signature</p>
                                        <div className="">
                                            <input type="file" className="hidden" onChange={handleChange} id="fileInput" accept=".png"/>
                                            <div className="flex items-end gap-x-2">
                                                <div className="h-10 mt-1 flex items-center justify-center gap-x-0.5 bg-[#282828] hover:bg-[#252525] border border-[#363636] shadow shadow-[#181818] rounded w-40 font-semibold cursor-pointer" onClick={() => document.getElementById('fileInput')?.click()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                                        <path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/>
                                                    </svg>
                                                    Browser File
                                                </div>
                                                <p className="">Accepted format: PNG</p>
                                            </div>
                                            { errors.length > 0 && errors.find((err) => err.path === 'signature') && !user.signature && <p className="text-red-500 italic">{errors.find((err) => err.path === 'signature')?.msg}</p> }
                                            {fileError==='type' && <p className="text-red-500 italic">Unsupported file type. Please upload a PNG image.</p>}
                                            { user.signature && (
                                                <div className="w-2/3 h-20 mt-3 flex items-center gap-x-3 border border-[#363636] shadow shadow-[#151515] rounded p-3">
                                                    <img className="h-full border border-[#363636] rounded bg-white" src={signPrev ?? undefined} alt="" />
                                                    <div className="flex-1 flex flex-col">
                                                        <p>{user.signature?.name}</p>
                                                        <p className="text-xs">
                                                            {
                                                                (user.signature?.size < 1000) ? 
                                                                (user.signature.size) + ' bytes'
                                                                :
                                                                (user.signature?.size < 1000000) ? 
                                                                (user.signature.size / 1000).toFixed(1) + ' kB'
                                                                :
                                                                (user.signature?.size) && (user.signature?.size / 1000000).toFixed(1) + ' MB'
                                                            }
                                                        </p>
                                                    </div>
                                                    <button onClick={handleClearSignature} className="h-8 aspect-square p-1 text-red-500 hover:bg-[#212121] rounded border border-[#363636] shadow shadow-[#151515] cursor-pointer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" fill="currentColor">
                                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="mt-6">
                            <button onClick={handleSubmit} className="px-10 h-10 rounded bg-blue-500 text-white font-bold cursor-pointer">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersAdd;