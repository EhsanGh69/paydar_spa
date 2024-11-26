import { useContext, useEffect, useState } from "react"


import { DataContext } from "../../context/dataContext"
import spinnerGif from "../../assets/spinner.gif"


export default function DataTable({setShowUpdate, setShowDetails, setShowCreate}) {

    const { 
        paginatedData, loading, selectiveFields, getData,
        orderingField, currentPage, getOrderedData, data, activeFields,
        contentRef, showActionBtns
    } = useContext(DataContext)

    const [selectives, setSelectives] = useState([])
    const [updateAct, setUpdateAct] = useState(false)
    const [detailsAct, setDetailsAct] = useState(false)
    const [showBtns, setShowBtns] = useState(false)
    

    const updateBtnHandler = (id) => {
        setShowCreate(false)
        setShowDetails(false)
        setDetailsAct(false)
        setUpdateAct(true)
        getData(id)
        getOrderedData(orderingField, currentPage)
    }

    const detailsBtnHandler = (id) => {
        setShowCreate(false)
        setShowUpdate(false)
        setUpdateAct(false)
        setDetailsAct(true)
        getData(id)
    }

    const deleteBtnHandler = (id) => {
        setShowCreate(false)
        setShowDetails(false)
        setShowUpdate(false)
        setDetailsAct(false)
        setUpdateAct(false)
        getData(id)
    }

    useEffect(() => {
        if(updateAct && data.id !== undefined) setShowUpdate(true)
        if(detailsAct && data.id !== undefined) setShowDetails(true)
    }, [data])

    useEffect(() => {
        setSelectives(activeFields.filter((field) => field.selective))
        setShowBtns(true)
    }, [paginatedData])


    return (
        <div className="row">
            <div className="col-sm-12 table-responsive">
            {loading 
            ? (
                <img src={spinnerGif} className="d-block m-auto"
                style={{width: "100px"}} alt="data loading"/>
            )
            : paginatedData.length > 0 
            ? (
                <table 
                    id="data-table" 
                    className="table table-bordered table-striped sortable" 
                    role="grid" aria-describedby="example1_info"
                    ref={contentRef}
                >
                    <thead>
                        <tr role="row" className="">
                            {selectiveFields.map((field, index) => (
                                <th 
                                className="text-center rounded-0 text-warning" 
                                key={index}
                                style={{ fontWeight: 'bold' }}
                                rowSpan="1" colSpan="1">
                                    { field }
                                </th>
                            ))}
                            {showActionBtns && (
                                <th 
                                    className="text-center action-th rounded-0 text-warning"
                                    style={{ fontWeight: 'bold' }}
                                    rowSpan="1" colSpan="1">
                                    <span>&emsp;&emsp;</span>
                                    <span>اقدام</span>
                                    <span>&emsp;&emsp;</span>
                                </th>
                            )}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((data, index) => (
                            <tr role="row" className="odd" key={index}>
                                
                                {selectives.map((field, index) => (
                                    <td className="text-center" key={index}>
                                        {
                                            data[field.name] === null ? "نامشخص"
                                            : field.name === 'province_county' 
                                            ? `${JSON.parse(data[field.name]).province} - ${JSON.parse(data[field.name]).county}`
                                            : field.name.includes('date') 
                                            ? data[field.name].replaceAll('-', '/') 
                                            : data[field.name]
                                        }
                                    </td>
                                ))}

                                {showBtns && showActionBtns && (
                                    <td className="action-td text-center">
                                        <button className="btn btn-outline-primary mb-2 pb-0" title="مشاهده"
                                            onClick={() => detailsBtnHandler(data.id)}>
                                            <i className="fa-solid fa-eye"></i>
                                        </button>

                                        <button className="btn btn-outline-info mb-2 ml-2 pb-0" title="ویرایش"
                                            onClick={() => updateBtnHandler(data.id)}>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>

                                        <button className="btn btn-outline-danger mb-2 ml-2 pb-0"
                                            onClick={() => deleteBtnHandler(data.id)} title="حذف"
                                            data-toggle="modal" data-target="#confirmDelete">
                                            <i className="fa-solid fa-xmark" style={{fontSize: "1.2rem"}}></i>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : <h3 className="alert alert-warning text-center text-danger">اطلاعاتی جهت نمایش وجود ندارد</h3>
            }
                
            </div>
        </div>
    )
}
