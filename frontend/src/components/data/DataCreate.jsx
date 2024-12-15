import { useState, useContext, useEffect, useMemo  } from "react"
import { useNavigate } from "react-router-dom"

import { DataContext } from "../../context/dataContext"
import { createData } from "../../services/dataServices"
import { makeFormData } from "../../helpers/dataHelpers"
import { fieldsValidator } from "../../validations/fieldsValidator"

import CreateForm from "../formItems/CreateForm"

export default function DataCreate({setShowCreate, successNotify}) {
    const navigate = useNavigate()

    const { 
        app, model, setOrderingField, getOrderedData, setCurrentPage, activeFields
    } = useContext(DataContext)

    const initialValues = useMemo(() => {
        const fieldsObj = {}
        for (const field of activeFields) {
            fieldsObj[field.name] = ''
        }
        return fieldsObj
    })

    const [dataObj, setDataObj] = useState({ ...initialValues })
    const [fieldNames, setFieldNames] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setFieldNames([ ...activeFields.map(field => field.name) ])
    }, [])

    const getFormData = (event) => {
        console.log('get form data')
        setDataObj({
            ...dataObj,
            [event.target.name]: event.target.value
        })
    }

    const resetFields = () => {
        const fieldsObj = {}
        for (const field of activeFields) {
            fieldsObj[field.name] = ''
        }
        setDataObj({ ...fieldsObj })
        setErrors({})
    }

    const createForm = async (event) => {
        event.preventDefault()
        
        try {
            const sch = fieldsValidator(activeFields)
            await sch.validate(dataObj, { abortEarly: false })

            const formData = makeFormData(fieldNames, dataObj)

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
        } catch (error) {
            const errorsObj = {}
            for (const err of error.inner) {
                errorsObj[err.path] = err.message
            }
            setErrors(errorsObj)
        }
    }

  return (
    <CreateForm createForm={createForm} fields={activeFields} 
    getFormData={getFormData} resetFields={resetFields} errors={errors} />
  )
}
