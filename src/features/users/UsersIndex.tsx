
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
}

const UsersIndex = () => {
    return (
        <>
            <div>
                test
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default UsersIndex;