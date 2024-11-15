import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'

import { dataFields, updateDataFields } from "../../services/dataServices"
import spinnerGif from "../../assets/spinner.gif"

export default function FieldsSettings() {
    const navigate = useNavigate()

    const [selectChange, setSelectChange] = useState(false)
    const [selectedModel, setSelectedModel] = useState({ name: "", title: "" })

    const [fields, setFields] = useState([])

    const [fieldsStatus, setFieldsStatus] = useState({})
    const [fieldsSelective, setFieldsSelective] = useState({})

    const [loading, setLoading] = useState(false)

    function selectHandler(e) {
        setSelectChange(true)
        setSelectedModel({ name: e.target.value, title: e.target.innerText })
    }

    const getFormStatus = (e) => {
        setFieldsStatus({
            ...fieldsStatus,
            [e.target.name]: e.target.checked
        })
    }

    const getFormSelective = (e) => {
        setFieldsSelective({
            ...fieldsSelective,
            [e.target.name]: e.target.checked
        })
    }

    async function getFields(model){
        try {
            setLoading(true)
            const { data } = await dataFields(model)
            setFields(JSON.parse(data.fields_data))
            setLoading(false)
  
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        const statusObj = {}
        for(const field of fields) {
            statusObj[field.name] = field.status
        }
        setFieldsStatus({ ...statusObj })

        const selectiveObj = {}
        for(const field of fields) {
            selectiveObj[field.name] = field.selective
        }
        setFieldsSelective({ ...selectiveObj })
    }, [fields])

    useEffect(() => {
        if(selectedModel.name) getFields(selectedModel.name)
    }, [selectedModel])

    const models = useMemo(() => {
        return [
            { name: "personnel", title: "پرسنل" }
        ]
    }, [selectChange])

    const successNotify = (text) => toast.success(text)

    async function updateFields(e) {
        e.preventDefault()
        const allFields = [ ...fields ]
        for (const field of allFields) {
            field.status = fieldsStatus[field.name]
            field.selective = fieldsSelective[field.name]
        }
        const updatedData = {
            model_name: selectedModel.name,
            persian_model_name: selectedModel.title,
            fields_data: JSON.stringify(allFields)
        }

        try {
            const { status } = await updateDataFields(selectedModel.name, updatedData)

            if(status === 200) {
                navigate('/settings/fields')
                successNotify('تغییرات با موفقیت ثبت شد')
            }
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-4">
                        <div className="form-group">
                            <label>آیتم مورد نظر را انتخاب نمایید:</label>
                            <select className="form-control" onChange={(e) => selectHandler(e)}>
                                <option value=""></option>
                                {models.map((model, index) => (
                                    <option value={model.name} key={index}>{model.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                    { selectChange
                        ? loading 
                            ? (
                                <img src={spinnerGif} className="d-block m-auto"
                                style={{width: "200px"}} alt="data loading"/>
                            )
                            : fields.length > 0 
                                ? (
                                    <form method="post" onSubmit={updateFields}>
                                        <fieldset className="row pl-4 border mb-4">
                                            <legend className="py-3">
                                                <span className="bg-info p-2 rounded h5">فیلدهای فعال</span>
                                            </legend>
                                            {fields.map((field, index) => (
                                                <div key={index} className="col-6 col-lg-4 col-xl-3 mb-2">
                                                    <div className="input-group p-2 bg-warning">
                                                        <input type="checkbox" 
                                                            className="form-check-input ml-1" 
                                                            checked={fieldsStatus[field.name]} 
                                                            name={field.name} 
                                                            onChange={(e) => getFormStatus(e)}/>
                                                        <label className="form-check-label ml-4">
                                                            {field.title}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </fieldset>

                                        <fieldset className="row pl-4 border my-4">
                                            <legend className="py-3">
                                                <span className="bg-info p-2 rounded h5">فیلدهای اصلی</span>
                                            </legend>
                                            {fields.map((field, index) => (
                                                <>
                                                    {field.status && (
                                                        <div key={index} 
                                                        className="col-6 col-lg-4 col-xl-3 mb-2">
                                                            <div className="input-group p-2 bg-danger">
                                                                <input type="checkbox" 
                                                                className="form-check-input ml-1" 
                                                                checked={fieldsSelective[field.name]} 
                                                                name={field.name} 
                                                                onChange={(e) => getFormSelective(e)}/>
                                                                <label className="form-check-label ml-4">
                                                                    {field.title}
                                                                </label>
                                                            </div>
                                                            
                                                        </div>
                                                    )}
                                                </>
                                                
                                            ))}
                                        </fieldset>
                                        <button className="btn btn-success btn-lg" type="submit">
                                            ثبت تغییرات
                                        </button>
                                    </form>
                                )
                                    
                                : <h3 className="alert alert-warning text-center text-danger">اطلاعاتی جهت نمایش وجود ندارد</h3>
                        : null
                    }

                <ToastContainer />
                
            </div>
        </div>
    )
}
