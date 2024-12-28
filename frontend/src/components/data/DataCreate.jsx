import { useState, useContext, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { DataContext } from "../../context/dataContext"
import { createData } from "../../services/dataServices"
import { makeFormData } from "../../helpers/dataHelpers"
import { fieldsValidator } from "../../validations/fieldsValidator"

import CreateForm from "../formItems/CreateForm"

export default function DataCreate({ setShowCreate, successNotify }) {
    const navigate = useNavigate()

    const {
        firstField, app, model, setOrderingField, getOrderedData, setCurrentPage, activeFields
    } = useContext(DataContext)

    const initialValues = useMemo(() => {
        const fieldsObj = {}
        for (const field of activeFields) {
            fieldsObj[field.name] = field.type === 'number' ? 0 : ''
        }
        return fieldsObj
    })

    const [dataObj, setDataObj] = useState({ ...initialValues })
    const [fieldNames, setFieldNames] = useState([])
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setFieldNames([...activeFields.map(field => field.name)])
    }, [])

    const getFormData = (event) => {
        if (event.target.type === 'file') {
            setDataObj({
                ...dataObj,
                [event.target.name]: event.target.files[0]
            })
        } else if (event.target.type === 'number') {
            setDataObj({
                ...dataObj,
                [event.target.name]: isNaN(event.target.value) ? 0 : Number(event.target.value)
            })
        } else {
            setDataObj({
                ...dataObj,
                [event.target.name]: event.target.value
            })
        }
    }

    const resetFields = () => {
        const fieldsObj = {}
        for (const field of activeFields) {
            fieldsObj[field.name] = field.type === 'number' ? 0 : '' 
        }
        setDataObj({ ...fieldsObj })
        setErrors({})
    }

    const createForm = async (event) => {
        event.preventDefault()

        try {
            const fileField = activeFields.find(field => field.type === 'file')
            if (fileField !== undefined)
                await fieldsValidator(activeFields, dataObj[fileField.name])
                    .validate(dataObj, { abortEarly: false })
            else
                await fieldsValidator(activeFields)
                    .validate(dataObj, { abortEarly: false })

            const formData = makeFormData(fieldNames, dataObj)

            const { status, data } = await createData(app, model, formData)

            if (status === 201) {
                setDataObj({})
                setShowCreate(false)
                setOrderingField("")
                getOrderedData("", 1)
                setCurrentPage(1)
                navigate(`/${app}/${model}?page=1`)
                successNotify(`${data[firstField]} با موفقیت اضافه شد`)
            }
        } catch (error) {
            if (error.inner !== undefined) {
                const errorsObj = {}
                error.inner.pop()
                for (const err of error.inner) {
                    errorsObj[err.path] = err.message
                }
                setErrors({ ...errorsObj })
            } else {
                console.log(error)
            }
        }
    }

    return (
        <CreateForm createForm={createForm} fields={activeFields}
            getFormData={getFormData} resetFields={resetFields} errors={errors} />
    )
}
