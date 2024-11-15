import { useContext } from "react"

import { DataContext } from "../../context/dataContext"

export default function SearchFilter() {

    const { 
        orderingFields, getOrderedData, 
        setOrderingField, currentPage, orderingField,
        getFilteredData
    } = useContext(DataContext)

    const orderingHandler = (event) => {
        getOrderedData(event.target.value, currentPage)
        setOrderingField(event.target.value)
    }

    const filteringHandler = (event) => {
        getFilteredData(event.target.value, currentPage)
        setOrderingField(orderingField)
    }

    return (
        <div className="row my-2">
            <div className="col-12 col-xl-9 mt-2">
                <div id="example1_filter" className="dataTables_filter">
                    <form action="{% url search_url %}" method="get" id="search-form">
                        <div className="row pr-3">
                            <div className="form-group col-12 col-xl-3 p-0">
                                <input 
                                    type="search" className="form-control w-100" 
                                    name="data_search" placeholder="جستجو" id="search-input"
                                    onChange={filteringHandler} autoComplete="off"/>
                            </div>
                            
                            <div className="form-group col-12 col-xl-2">
                                <select name="date_filter" className="form-control" id="date-filter"
                                    value={orderingField} onChange={(event) => orderingHandler(event)}>
                                    <option value="">
                                        مرتب سازی
                                    </option>
                                    {orderingFields.map((orderingField, index) => (
                                        <option key={index} value={orderingField.value}>
                                            {orderingField.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}