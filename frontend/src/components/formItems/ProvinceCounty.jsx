import { useEffect, useState } from "react"
import { allProvinces, singleProvince } from "../../services/dataServices"

export default function ProvinceCounty({handler, province, county, error}) {

    const [provinces, setProvinces] = useState([])
    const [selectedProvince, setSelectedProvince] = useState("")
    const [counties, setCounties] = useState([])

    async function getAllProvinces() {
        try {
            const { data } = await allProvinces()
            setProvinces(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getSingleProvince(province_slug) {
        try {
            const { data } = await singleProvince(province_slug)
            setCounties(JSON.parse(data.county_list).counties)
        } catch (error) {
            console.log(error)
        }
    }

    function selectProvinceHandler(e) {
        setSelectedProvince(e.target.value)
        handler(e)
    }

    useEffect(() => {
        getAllProvinces()
    }, [])

    useEffect(() => {
        if(county !== undefined && province !== undefined) {
            const foundProvince = provinces.find(item => item.province_name === province)
            getSingleProvince(foundProvince.province_slug)
        }
        else if(selectedProvince !== "") {
            const foundProvince = provinces.find(item => item.province_name === selectedProvince)
            getSingleProvince(foundProvince.province_slug)
        }else {
            setCounties([])
        }
    }, [selectedProvince, provinces])

  return (
    <>
        <div className="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">استان</span>
            </div>
            <select name="province" 
                onChange={selectProvinceHandler}
                className="custom-select" value={province}>
                    <option value="">انتخاب کنید</option>
                {provinces.length > 0 && provinces.map((province, index) => (
                    <option key={index} value={province.province_name}>{province.province_name}</option>
                ))}
            </select>
        </div>

        <div className="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">شهرستان</span>
            </div>
            <select name="county" 
                className="custom-select" 
                onChange={handler}>
                <option value="">انتخاب کنید</option>
                {counties.length > 0 && counties.map((item, index) => (
                    <option key={index} value={item.name} 
                        selected={county !== undefined && county === item.name ? true : false }>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>

        {error && (
            <strong className="form-text text-danger">{error}</strong>
        )}
    </>
  )
}
