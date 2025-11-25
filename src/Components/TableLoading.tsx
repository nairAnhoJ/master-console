type Props = {
    colSpan: number
}

const TableLoading = ({colSpan}: Props) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className="flex justify-center gap-x-1 font-black text-2xl">
                    <div className="animate-bounce">.</div>
                    <div style={{ animationDelay: "150ms" }} className="animate-bounce">.</div>
                    <div style={{ animationDelay: "300ms" }} className="animate-bounce">.</div>
                </div>
            </td>
        </tr>
    )
}

export default TableLoading;