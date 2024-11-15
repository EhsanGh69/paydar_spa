import { useEffect, useState, useContext } from "react"

import { DataContext } from "../../context/dataContext"

export default function DataDetails() {

    const { data, activeFields } = useContext(DataContext)

    const [provinceCounty, setProvinceCounty] = useState("")

    useEffect(() => {
      if(data.province_county !== "") {
        const province_county = JSON.parse(data.province_county)
        setProvinceCounty(`${province_county.province} - ${province_county.county}`)
      }else {
        setProvinceCounty("نامشخص")
      }
    }, [data])

    return (
      <div className="card">
        <div className="card-body">
          <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
            <div className="row">
              {activeFields.map((field, index) => (
                <div className="col-12 col-md-6 col-lg-4" key={index}>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">{ field.title }</span>
                    </div>
                    <p className="pt-3 pl-2">
                      {
                        data[field.name] === null ? "نامشخص"
                        : field.name === 'province_county' ? provinceCounty
                        : field.name.includes('date') ? data[field.name].replaceAll('-', '/') 
                        : data[field.name]
                      }
                    </p>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}
