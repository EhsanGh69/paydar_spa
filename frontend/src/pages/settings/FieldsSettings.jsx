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
    const [fieldsRequirement, setFieldsRequirement] = useState({})

    const [loading, setLoading] = useState(false)

    function selectHandler(e) {
        if(e.target.value !== '') {
            setSelectChange(true)
            const foundModel = models.find(model => model.name === e.target.value)
            setSelectedModel({ name: e.target.value, title: foundModel.title })
        }else {
            setSelectChange(false)
        }
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

    const getFormRequirement = (e) => {
        setFieldsRequirement({
            ...fieldsRequirement,
            [e.target.name]: e.target.value === 'true'
        })
    }

    async function getFields(model) {
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
        for (const field of fields) {
            statusObj[field.name] = field.status
        }
        setFieldsStatus({ ...statusObj })

        const selectiveObj = {}
        for (const field of fields) {
            selectiveObj[field.name] = field.selective
        }
        setFieldsSelective({ ...selectiveObj })

        const requirementObj = {}
        for (const field of fields) {
            requirementObj[field.name] = field.required
        }
        setFieldsRequirement({ ...requirementObj })
    }, [fields])

    useEffect(() => {
        if (selectChange && selectedModel.name) getFields(selectedModel.name)
    }, [selectedModel, selectChange])

    const models = useMemo(() => {
        return [
            { name: "personnel", title: "پرسنل" },
            { name: "owner", title: "مالکین" },
            { name: "contractor", title: "پیمانکاران" },
        ]
    }, [selectChange])

    const successNotify = (text) => toast.success(text)

    async function updateFields(e) {
        e.preventDefault()
        const allFields = [...fields]
        for (const field of allFields) {
            field.status = fieldsStatus[field.name]
            if (fieldsStatus[field.name])
                field.selective = fieldsSelective[field.name]
            else field.selective = false
            field.required = fieldsRequirement[field.name]
        }
        const updatedData = {
            model_name: selectedModel.name,
            persian_model_name: selectedModel.title,
            fields_data: JSON.stringify(allFields)
        }

        try {
            const { status } = await updateDataFields(selectedModel.name, updatedData)

            if (status === 200) {
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
                            <select className="form-control" onChange={(e) => selectHandler(e)}>
                                <option value="">آیتم مورد نظر را انتخاب نمایید   ...</option>
                                {models.map((model, index) => (
                                    <option value={model.name} key={index}>{model.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {selectChange
                    ? loading
                        ? (
                            <img src={spinnerGif} className="d-block m-auto"
                                style={{ width: "200px" }} alt="data loading" />
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
                                                <div className="bg-warning p-2 ">
                                                    <div className="input-group p-1">
                                                        <input type="checkbox"
                                                            className="form-check-input ml-1"
                                                            checked={fieldsStatus[field.name]}
                                                            name={field.name}
                                                            onChange={(e) => getFormStatus(e)} />
                                                        <label className="form-check-label ml-4">
                                                            {field.title}
                                                        </label>
                                                    </div>
                                                    <div className="p-2 d-flex input-group">
                                                        <div>
                                                            <input type="radio" name={field.name}
                                                                checked={fieldsRequirement[field.name]}
                                                                className="form-check-input ml-1"
                                                                value="true"
                                                                onChange={(e) => getFormRequirement(e)}
                                                                disabled={field.type === 'file' ? true : false}
                                                            />
                                                            <label className="form-check-label ml-4">
                                                                اجباری
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" name={field.name}
                                                                checked={!fieldsRequirement[field.name]}
                                                                className="form-check-input ml-1"
                                                                value="false"
                                                                onChange={(e) => getFormRequirement(e)}
                                                                disabled={field.type === 'file' ? true : false}
                                                            />
                                                            <label className="form-check-label ml-4">
                                                                اختیاری
                                                            </label>
                                                        </div>
                                                    </div>
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
                                                                onChange={(e) => getFormSelective(e)} />
                                                            <label className="form-check-label ml-4">
                                                                {field.title} {" "}
                                                                {field.required
                                                                    ? "(اجباری)"
                                                                    : "(اختیاری)"
                                                                }
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
