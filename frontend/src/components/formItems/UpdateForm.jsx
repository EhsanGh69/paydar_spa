import Input from "./Input"
import TextArea from "./TextArea"
import Select from "./Select"
import ProvinceCounty from "./ProvinceCounty"

export default function UpdateForm({ updateForm, fields, dataObj, getFormData, errors }) {

  return (
    <form method="post" encType="multipart/form-data" onSubmit={updateForm}
        className="border border-success rounded p-3 my-3">
        <div className="row">
            {fields.length > 0 && fields.map((field, index) => (
                <div className="col-12 col-xl-6 mb-3" key={index}>
                    {field.group === 'input' &&
                        (<Input type={field.type} name={field.name} value={dataObj[field.name]}
                            holder={field.title} handler={getFormData} error={errors[field.name]} />)
                    }
                    {field.group === 'select' && 
                        (<Select name={field.name} options={field.options} value={dataObj[field.name]}
                            title={field.title} handler={getFormData} error={errors[field.name]} />)
                    }
                    {field.group === 'province_county' && 
                        (<ProvinceCounty handler={getFormData} error={errors[field.name]}
                            province={dataObj.province} county={dataObj.county} />)
                    }
                    {field.group === 'textArea' &&
                        (<TextArea name={field.name} value={dataObj[field.name]}
                            holder={field.title} handler={getFormData} error={errors[field.name]} />)
                    }
                </div>
            ))}
        </div>
        <div className="row">
            <div className="col-8 mt-3 d-flex">
                <button className="btn btn-success" type="submit">
                    <strong>اعمال تغییرات</strong>
                </button>
            </div>
        </div>
    </form>
  )
}
