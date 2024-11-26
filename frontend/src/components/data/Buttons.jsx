import { useContext } from "react"
import { useReactToPrint } from 'react-to-print'

import { DataContext } from "../../context/dataContext"

export default function Buttons({
    showCreate, setShowCreate, 
    showUpdate, setShowUpdate,
    showDetails, setShowDetails
}) 
{

    const { contentRef, setShowActionBtns, downloadExcel } = useContext(DataContext)

    const closeBtnHandler = () => {
        if(showCreate) setShowCreate(!showCreate)
        else if(showUpdate) setShowUpdate(!showUpdate)
        else setShowDetails(!showDetails)
    }

    const pdfFn = useReactToPrint({ contentRef })

    return (
        <div className="d-flex justify-content-between">
            <div>
                {!showCreate && !showUpdate && !showDetails ? (
                    <button className="btn btn-success pb-0" onClick={() => setShowCreate(!showCreate)}>
                        <i className="fa-solid fa-plus" style={{fontSize: "1.5rem"}}></i>
                    </button>
                ) : (
                    <button className="btn btn-danger pb-0" onClick={closeBtnHandler}>
                        <i className="fa-solid fa-xmark" style={{fontSize: "1.5rem"}}></i>
                    </button>
                )}
            </div>
            <div>
                <button 
                    type="submit" className="btn btn-warning" 
                    id="print-btn" title="خروجی پی دی اف"
                    onClick={() => {
                        setShowActionBtns(false)
                        setTimeout(() => pdfFn(), 100)
                    }}>
                    <i className="fa-solid fa-file-pdf" 
                    style={{fontSize: "1.5rem"}}></i>
                </button>
                <button 
                    className="btn btn-success mr-2" 
                    id="excel-btn" title="خروجی اکسل"
                    onClick={() => {
                        setShowActionBtns(false)
                        setTimeout(() => downloadExcel(), 500)
                    }}>
                    <i className="fa-solid fa-file-excel" 
                    style={{fontSize: "1.5rem"}}></i>
                </button>
            </div>
        </div>
    )
}