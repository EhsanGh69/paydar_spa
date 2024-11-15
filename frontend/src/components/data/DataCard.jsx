import { useState } from "react"
import { ToastContainer } from 'react-toastify'

import Buttons from "./Buttons"
import SearchFilter from "./SearchFilter"
import DataTable from "./DataTable"
import Pagination from "./Pagination"
import ConfirmDelete from "./ConfirmDelete"
import DataCreate from "./DataCreate"
import DataUpdate from "./DataUpdate"
import DataDetails from "./DataDetails"
import { successNotify, infoNotify, warnNotify } from "../../helpers/notifyConfigs"


export default function DataCard() {

    const [showCreate, setShowCreate] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
  
    return (
        <div className="card">
            <div className="card-body">
                <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">

                    <Buttons showCreate={showCreate} setShowCreate={setShowCreate} 
                            showUpdate={showUpdate} setShowUpdate={setShowUpdate} 
                            showDetails={showDetails} setShowDetails={setShowDetails} />

                    { showCreate &&
                        <DataCreate setShowCreate={setShowCreate} successNotify={successNotify} />
                    }

                    { showUpdate &&
                        <DataUpdate setShowUpdate={setShowUpdate} infoNotify={infoNotify} />
                    }

                    { showDetails && <DataDetails /> }
                    
                    <SearchFilter />

                    <DataTable 
                        setShowUpdate={setShowUpdate} 
                        setShowDetails={setShowDetails} 
                        setShowCreate={setShowCreate} 
                    />

                    <Pagination />

                    <ConfirmDelete warnNotify={warnNotify} />

                    <ToastContainer />
                        
                </div>
            </div>
        </div>
    )
}