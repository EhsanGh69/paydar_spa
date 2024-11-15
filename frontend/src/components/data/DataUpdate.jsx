import { useState, useContext, useEffect  } from "react"

import { DataContext } from "../../context/dataContext"
import { updateData } from "../../services/dataServices"
import { makeFormData } from "../../helpers/dataHelpers"
import UpdateForm from "../formItems/UpdateForm"

export default function DataUpdate({setShowUpdate, infoNotify}) {

    const { 
        app, model, data, currentPage, getOrderedData,
        activeFields, orderingField
    } = useContext(DataContext)

    const fieldNames = [ ...activeFields.map(field => field.name) ]
    
    const [dataObj, setDataObj] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fieldsObj = {}
        for (const field of fieldNames) {
            if(data[field] !== "") {
                if(field === "province_county") {
                    fieldsObj['province'] = JSON.parse(data[field]).province
                    fieldsObj['county'] = JSON.parse(data[field]).county
                }
                else fieldsObj[field] = data[field]
            }
        }
        setDataObj({ ...fieldsObj })
    }, [data, activeFields])

    const getFormData = (event) => {
        const inputType = event.target.type
        if(inputType === 'file') {
            setDataObj({
                ...dataObj,
                [event.target.name]: event.target.files[0]
            })
        }else {
            setDataObj({
                ...dataObj,
                [event.target.name]: event.target.value
            })
        }
    }

    const updateForm = async (event) => {
        event.preventDefault()
        const formData = makeFormData(fieldNames, dataObj)
        try {
            const { status } = await updateData(app, model, data.id, formData)

            if(status === 200) {
                setDataObj({})
                setShowUpdate(false)
                getOrderedData(orderingField, currentPage)
                infoNotify(`${data.full_name} با موفقیت ویرایش شد`)
            }
        } catch (err) {
            console.log(err.response.data)
            setErrors(err.response.data)
        }
    }

  return (
    <UpdateForm dataObj={dataObj} errors={errors} fields={activeFields} 
       getFormData={getFormData} updateForm={updateForm} />
  )
}
