

const UsersAdd = () => {
    return (
        <>
            <div className="fixed w-screen h-screen bg-[#232323] pl-[264px] p-6 text-gray-300">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold">Add New User</h1>
                    </div>

                    <div className="mt-6 text-sm">
                        <div className="flex gap-x-6">
                            <div className="flex-1">
                                <h1>ID Number</h1>
                                <input className="border rounded p-2 w-full" type="text" name="id_number" autoComplete="false"/>
                            </div>
                            <div className="flex-1">
                                <h1>Name</h1>
                                <input className="border rounded p-2 w-full" type="text" name="name" autoComplete="false" />
                            </div>
                        </div>
                        <div className="mt-3 flex gap-x-6">
                            <div className="flex-1">
                                <h1>Department</h1>
                                <select className="border rounded p-2 w-full" name="department" id="">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <h1>Site</h1>
                                <select className="border rounded p-2 w-full" name="site" id="">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3 flex gap-x-6">
                            <div className="w-2/3">
                                <h1>E-mail</h1>
                                <input className="border rounded p-2 w-full" type="text" name="email" autoComplete="false" />
                            </div>
                            <div className="w-1/3">
                                <h1>Phone</h1>
                                <input className="border rounded p-2 w-full" type="text" name="phone" autoComplete="false" />
                            </div>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default UsersAdd;