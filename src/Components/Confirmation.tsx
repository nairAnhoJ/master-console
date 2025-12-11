interface Props {
    title: string;
    body: string;
    confirmButtonName: string;
    closeButton: () => void;
    confirmButton: () => void;
}


const Confirmation = ({title, body, confirmButtonName, closeButton, confirmButton}: Props) => {
    return (
        <>
            <div className="fixed w-screen h-screen flex items-center justify-center z-99 bg-[#181818]/75 text-white">
                <div className="w-[500px] bg-[#292929] shadow shadow-[#151515] rounded-lg">
                    <div className="w-full flex items-center p-6 border-b border-[#454545]">
                        <h1 className="text-xl font-bold">{title}</h1>
                    </div>
                    <div className="p-6">
                        <p className="text-sm">{body}</p>
                    </div>
                    <div className="p-6 border-t border-[#454545] flex items-center gap-x-3">
                        <button className="p-2 w-24 font-bold rounded-lg cursor-pointer bg-blue-500 " onClick={confirmButton}>{confirmButtonName}</button>
                        <button className="p-2 w-24 font-bold rounded-lg cursor-pointer bg-[#202020]" onClick={closeButton}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Confirmation;