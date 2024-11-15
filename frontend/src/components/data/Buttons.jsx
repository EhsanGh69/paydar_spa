export default function Buttons({
    showCreate, setShowCreate, 
    showUpdate, setShowUpdate,
    showDetails, setShowDetails
}) {

    const closeBtnHandler = () => {
        if(showCreate) setShowCreate(!showCreate)
        else if(showUpdate) setShowUpdate(!showUpdate)
        else setShowDetails(!showDetails)
    }

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
                <button type="submit" className="btn btn-warning" id="print-btn" title="خروجی پی دی اف">
                    <i className="fa-solid fa-file-pdf" style={{fontSize: "1.5rem"}}></i>
                </button>
                <button className="btn btn-success mr-2" id="excel-btn" title="خروجی اکسل">
                    <i className="fa-solid fa-file-excel" style={{fontSize: "1.5rem"}}></i>
                </button>
            </div>
        </div>
    )
}