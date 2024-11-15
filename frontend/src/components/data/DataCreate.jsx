import { useState, useContext  } from "react"
import { useNavigate } from "react-router-dom"

import { DataContext } from "../../context/dataContext"
import { createData } from "../../services/dataServices"
import { makeFormData } from "../../helpers/dataHelpers"

import CreateForm from "../formItems/CreateForm"

export default function DataCreate({setShowCreate, successNotify}) {
    const navigate = useNavigate()

    const { 
        app, model, setOrderingField, getOrderedData, setCurrentPage, activeFields
    } = useContext(DataContext)

    const fieldNames = [ ...activeFields.map(field => field.name) ]

    const [dataObj, setDataObj] = useState({})
    const [errors, setErrors] = useState({})

    const getFormData = (event) => {
        setDataObj({
            ...dataObj,
            [event.target.name]: event.target.value
        })
    }

    const createForm = async (event) => {
        event.preventDefault()
        
        const formData = makeFormData(fieldNames, dataObj)

        try {
            const { status, data } = await createData(app, model, formData)

            if(status === 201) {
                setDataObj({})
                setShowCreate(false)
                setOrderingField("")
                getOrderedData("", 1)
                setCurrentPage(1)
                navigate(`/${app}/${model}?page=1`)
                successNotify(`${data.full_name} با موفقیت اضافه شد`)
            }
        } catch (err) {
            console.log(err.response.data)
            setErrors(err.response.data)
        }
    }

  return (
    <CreateForm createForm={createForm} fields={activeFields} 
    getFormData={getFormData} errors={errors} />
  )
}
