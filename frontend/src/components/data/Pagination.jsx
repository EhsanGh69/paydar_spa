import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { DataContext } from "../../context/dataContext"

export default function Pagination() {
    const { 
        allDataCount, pageSize, 
        setCurrentPage, currentPage,
        app, model
    } = useContext(DataContext)

    const navigate = useNavigate()

    const paginationControl = (pageNum) => {
        setCurrentPage(pageNum)
        navigate(`/${app}/${model}?page=${pageNum}`)
    }

    let pagesCount = Math.ceil(allDataCount / pageSize)
    let pageNumbers = Array.from(Array(pagesCount).keys())

  return (
    <>
        {pageNumbers.length > 1 && (
            <div className="row">
                <nav className="col-1 mx-auto">
                    <ul className="pagination d-flex flex-row-reverse">
                        {currentPage - 1 > 0 && (
                            <li className="page-item">
                                <button className="page-link" 
                                    onClick={() => paginationControl(currentPage - 1)}
                                    aria-label="Previous">
                                    <i className="fas fa-angle-left"></i>
                                </button>
                            </li>
                        )}
                        
                        {pageNumbers.map(pageNumber => (
                            <li 
                                style={{ cursor: "pointer" }}
                                className={
                                    pageNumber + 1 === currentPage
                                    ? "page-item active"
                                    : "page-item"
                                } 
                                key={pageNumber + 1}>
                                <button className="page-link" 
                                    onClick={() => paginationControl(pageNumber + 1)}>
                                    {pageNumber + 1}
                                </button>
                            </li>
                        ))}
        
                        {currentPage + 1 <= pagesCount && (
                            <li className="page-item">
                                <button className="page-link" 
                                    onClick={() => paginationControl(currentPage + 1)}
                                    aria-label="Next">
                                    <i className="fas fa-angle-right"></i>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        )}
    </>
  )
}
