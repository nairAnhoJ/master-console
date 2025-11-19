import { Link } from "react-router-dom";

const Navigation = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    return (
        <>
            <div className="h-screen w-60 fixed top-0 left-0 border-r border-neutral-700 bg-linear-to-l from-[#171717] to-[#212121]">
                <div className="flex flex-col items-center justify-between h-full">

                    {/* Header | Logo */}
                    <div className="p-6">
                        <img src="/public/logo.ico" className="w-10 h-10" alt="logo" />
                    </div>

                    {/* Body | Menus */}
                    <div className="w-full p-6">
                        <Link to={'/users'} replace className="w-full py-3 px-3 flex gap-x-3 items-center text-white text-sm rounded-lg hover:bg-[#303030] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M123-232v-52q0-26 13.5-43.5t36.45-28.59Q222-379 269.5-393.5 317-408 391-408t121.5 14.5q47.5 14.5 96.55 37.41Q632-345 645.5-327.5 659-310 659-284v52H123Zm616 0v-52q0-32-10.95-59.98Q717.11-371.96 697-392q23 6 45 15.5t45 20.5q23 11 36.5 30.16T837-284v52h-98ZM391-512q-44.55 0-76.27-31.72Q283-575.45 283-620t31.73-76.28Q346.45-728 391-728t76.27 31.72Q499-664.55 499-620t-31.73 76.28Q435.55-512 391-512Zm258-108q0 44.55-31.72 76.28Q585.55-512 541-512q18.32-22.76 28.16-50.51 9.84-27.74 9.84-57.61Q579-650 568.5-677 558-704 541-728q44.55 0 76.28 31.72Q649-664.55 649-620ZM151-260h480v-24q0-15-7.5-26T595-332q-42-23-90-35.5T391-380q-66 0-114 12.5T187-332q-21 11-28.5 22t-7.5 26v24Zm240-280q33 0 56.5-23.5T471-620q0-33-23.5-56.5T391-700q-33 0-56.5 23.5T311-620q0 33 23.5 56.5T391-540Zm0 280Zm0-360Z"/>
                            </svg>
                            Users 
                        </Link>
                        <button className="w-full py-3 px-3 flex gap-x-3 items-center text-white text-sm rounded-lg hover:bg-[#303030] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M626-146v-120H466v-400H334v120H106v-268h228v120h292v-120h228v268H626v-120H494v372h132v-120h228v268H626ZM134-786v212-212Zm520 400v212-212Zm0-400v212-212Zm0 212h172v-212H654v212Zm0 400h172v-212H654v212ZM134-574h172v-212H134v212Z"/>
                            </svg>
                            Department
                        </button>
                        <button className="w-full py-3 px-3 flex gap-x-3 items-center text-white text-sm rounded-lg hover:bg-[#303030] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="m600-176-240-84-150 58q-14 5-26-3t-12-23v-468q0-10 4.5-18.5T190-726l170-58 240 84 150-58q14-5 26 1.5t12 20.5v476q0 11-6 19t-16 11l-166 54Zm-14-34v-468l-212-74v468l212 74Zm28 0 146-48v-474l-146 54v468Zm-414-18 146-56v-468l-146 50v474Zm414-450v468-468Zm-268-74v468-468Z"/>
                            </svg>
                            Areas
                        </button>
                        <button className="w-full py-3 px-3 flex gap-x-3 items-center text-white text-sm rounded-lg hover:bg-[#303030] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-7" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M480-275q98-88 149-171t51-155q0-88-56-143.5T480-800q-88 0-144 55.5T280-601q0 72 51 155t149 171Zm0 36q-112-95-170-187.5T252-601q0-100 64-163.5T480-828q100 0 164 63.5T708-601q0 82-58 174T480-239Zm0-301q25 0 42.5-17.5T540-600q0-25-17.5-42.5T480-660q-25 0-42.5 17.5T420-600q0 25 17.5 42.5T480-540ZM252-132v-28h456v28H252Zm228-468Z"/>
                            </svg>
                            Sites
                        </button>
                    </div>

                    {/* Footer | Log Out */}
                    <div className="w-full p-6">
                        <button onClick={handleLogout} className="w-full py-3 px-3 flex gap-x-3 items-center text-white text-sm rounded-lg hover:bg-[#303030] cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-7" fill="currentColor" viewBox="0 -960 960 960">
                                <path d="M440-452q12 0 20-8.5t8-19.5q0-12-8-20t-20-8q-11 0-19.5 8t-8.5 20q0 11 8.5 19.5T440-452ZM280-172v-28l292-24v-483q0-25-16.5-43T515-770l-203-16v-28l206 16q35 3 58.5 29t23.5 61v510l-320 26Zm-84 0v-28h56v-554q0-26 17.5-43t42.5-17h336q26 0 43 17t17 43v554h56v28H196Zm84-28h400v-554q0-14-9-23t-23-9H312q-14 0-23 9t-9 23v554Z"/>
                            </svg>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation