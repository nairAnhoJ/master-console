import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { 
    fetchSites, 
    clearNotification,
    deleteSite,
} from "./siteSlice";
import TableLoading from "../../Components/TableLoading";
import Notification from "../notification/Notification";
import { Link } from "react-router-dom";
import Confirmation from "../../Components/Confirmation";
import { addNotif } from "../notification/notificationSlice";

const SiteIndex = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<number>(0);
    const [showResetModal, setShowResetModal] = useState(false);
    const [confirmationDetails, setConfirmationDetails] = useState({
        title: '',
        body: '',
        confirmButtonName: ''
    })

    const { sites, loading, notification } = useAppSelector((state) => state.sites);
    const { feature } = useAppSelector((state) => state.notification);

    useEffect(() => {
        dispatch(fetchSites(search));
    }, [])
      
    useEffect(()=>{
        if(notification){
            dispatch(addNotif({type: notification.type, msg: notification.msg, feature: 'departments'}));
            dispatch(clearNotification());
            dispatch(fetchSites(search));
            handleCloseConfirmationModal();
        }
    },[notification])

    const handleSearch = () => {
        dispatch(fetchSites(search));
    }

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            handleSearch();
        }
    }

    const handleClearSearch = () => {
        setSearch('');
        dispatch(fetchSites(''));
    }

    const handleCloseConfirmationModal = () => {
        setShowResetModal(false)
    }

    const handleConfirm = () => {
        dispatch(deleteSite(selectedId))
    }

    const handleDeleteButton = (id: number) => {
        setShowResetModal(true)
        setSelectedId(id);
        setConfirmationDetails({
            title: 'Delete Site',
            body: 'Are you sure you want to delete this site?',
            confirmButtonName: 'Yes'
        })
    }

    return (
        <>  
            { (feature === 'sites') &&
                <Notification /> 
            }

            { showResetModal &&
                <Confirmation 
                    title={confirmationDetails.title} 
                    body={confirmationDetails.body} 
                    confirmButtonName={confirmationDetails.confirmButtonName}
                    confirmButton={handleConfirm}
                    closeButton={handleCloseConfirmationModal}
                />
            }

            <div className="w-screen h-screen pl-[264px] p-6 bg-[#232323] text-gray-300">
                {/* Title */}
                <h1 className="text-3xl font-bold">SITES</h1>

                {/* Controller */}
                <div className="w-full h-10 mt-6 flex justify-between">
                    <div className="w-44">
                        <Link to={'/sites/add'} className="block p-2 font-bold text-white bg-blue-700 over:bg-blue-800 rounded cursor-pointer shadow text-center">New Site</Link>
                    </div>
                    <div className="h-full relative flex items-center gap-x-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute left-2 shadow shadow-[#181818] p-1 rounded" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                        <input onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e) => handleEnterKey(e)} value={search} type="text" className="h-full w-96 pl-9.5 pr-20 rounded bg-[#303030] shadow shadow-[#181818] border border-[#404040] focus:outline-0"/>
                        <button onClick={handleClearSearch} className="absolute right-19 cursor-pointer text-red-500 hover:text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 -960 960 960" fill="currentColor">
                                <path d="m256-168-88-88 224-224-224-224 88-88 224 224 224-224 88 88-224 224 224 224-88 88-224-224-224 224Z"/>
                            </svg>
                        </button>
                        
                        <button onClick={handleSearch} className="absolute right-1 py-1.5 px-3 bg-[#181818] hover:bg-[#151515] rounded shadow shadow-[#0c0f14] text-sm font-semibold cursor-pointer">Search</button>
                    </div>
                </div>

                {/* User List */}
                <div className="w-full h-[calc(100%-100px)] mt-3 overflow-hidden">
                    <div className="w-[350px] h-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#181818]">
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { loading && (<TableLoading colSpan={5} />)}
                                { sites?.map((site) => (
                                    <tr className="cursor-pointer hover:bg-[#303030] focus:bg-[#303030]" key={site.id}>
                                        <td className="text-left px-6">{site.name}</td>
                                        <td className="text-center whitespace-nowrap">
                                            <Link to={`/sites/edit/${site.id}`} className="text-blue-500 font-semibold cursor-pointer">EDIT</Link>
                                            <span className="mx-1 cursor-default">|</span> 
                                            <button onClick={()=>handleDeleteButton(site.id)} className="text-red-500 font-semibold cursor-pointer">DELETE</button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SiteIndex;