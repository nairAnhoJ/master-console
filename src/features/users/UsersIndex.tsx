import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { fetchUser } from "./userSlice";

const UsersIndex = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUser());
    }, [])

    return (
        <>  
            { loading && (<h1>LOADING...</h1>)}
            <div className="w-screen min-h-screen pl-[264px] p-6 bg-[#212121] text-white">
                { users?.map((user) => (
                    <p key={user.id}>{user.name}</p>
                )) }
            </div>
        </>
    )
}

export default UsersIndex;