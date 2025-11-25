import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { fetchUser } from "./userSlice";
import TableLoading from "../../Components/TableLoading";
import { Link } from "react-router-dom";

const UsersIndex = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    return (
        <>  
            <div className="w-screen h-screen pl-[264px] p-6 bg-[#232323] text-gray-300">
                {/* Controller */}
                <div className="fixed w-[calc(100%-288px)] h-10 flex justify-between">
                    <div className="">
                        <Link to={'/users/add'} className="block p-2 px-7 font-bold text-white bg-blue-700 over:bg-blue-800 rounded cursor-pointer shadow">New User</Link>
                    </div>
                    <div className="h-full relative flex items-center gap-x-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 absolute left-2 shadow shadow-[#181818] p-1 rounded" viewBox="0 -960 960 960" fill="currentColor">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                        </svg>
                        <input type="text" className="h-full w-96 pl-9.5 pr-20 rounded bg-[#303030] shadow shadow-[#181818]"/>
                        <button className="absolute right-1 py-1.5 px-3 bg-[#181818] hover:bg-[#151515] rounded shadow shadow-[#0c0f14] text-sm font-semibold cursor-pointer">Search</button>
                    </div>
                </div>

                {/* User List */}
                <div className="w-full h-[calc(100%-62px)] mt-[62px] overflow-hidden">
                    <div className="w-full h-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-[#181818]">
                                    <th className="py-3">ID Number</th>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Site</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { loading && (<TableLoading colSpan={5} />)}
                                { users?.map((user) => (
                                    <tr className="cursor-pointer hover:bg-[#303030]" key={user.id}>
                                        <th className="text-center py-2">{user.id_number}</th>
                                        <td className="text-center">{user.name}</td>
                                        <td className="text-center">{user.department_name}</td>
                                        <td className="text-center">{user.site_name}</td>
                                        <td className="text-center whitespace-nowrap">
                                            <button className="text-blue-500 font-semibold cursor-pointer">EDIT</button>
                                            <span className="mx-1 cursor-default">|</span> 
                                            <button className="text-orange-500 font-semibold cursor-pointer">RESET</button>
                                            <span className="mx-1 cursor-default">|</span> 
                                            <button className="text-red-500 font-semibold cursor-pointer">DEACTIVATE</button>
                                            <span className="mx-1 cursor-default">|</span> 
                                            <button className="text-red-500 font-semibold cursor-pointer">DELETE</button>
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

export default UsersIndex;