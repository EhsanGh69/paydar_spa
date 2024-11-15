import jalaali from "jalaali-js"

export function setPaginate(size, current, allData) {
    let endIndex = size * current
    let startIndex = endIndex - size
    return allData.slice(startIndex, endIndex)
}

export function getDataPage(allCount, size, allData, dataId) {
    const pageNumbers = Array.from(Array(Math.ceil(allCount / size)).keys())

    const paginatedData = []
    pageNumbers.forEach(num => {
        if(num === 0)
            paginatedData.push(allData.slice(0, size))
        else
            paginatedData.push(allData.slice(size * num, size * (num + 1)))    
    })

    let dataPage
    paginatedData.map((item, index) => {
        const foundData = item.find(data => data.id === dataId)
        if(foundData) dataPage = index + 1
    })

    return dataPage
}

export function dateConvert(date) {
    let dateArray = []
    if(date.includes('/')) dateArray = date.split('/')
    else if(date.includes('-')) dateArray = date.split('-')
    const dateNumbers = dateArray.map(item => Number(item))
    const gregDate = jalaali.toGregorian(dateNumbers[0], dateNumbers[1], dateNumbers[2])
    return `${gregDate.gy}-${gregDate.gm}-${gregDate.gd}`
}

export function makeFormData(fieldNames, dataObj) {
    const formData = new FormData()
    fieldNames.map(fieldName => {
        if(fieldName !== 'province_county' && dataObj[fieldName] === undefined) {
            formData.append(fieldName, "_")
        }
        else if(fieldName === 'province_county') {
            formData.append("province_county", JSON.stringify(
                { province: dataObj.province, county: dataObj.county }
            ))
        }
        else if(fieldName.includes('date')) {
            formData.append(fieldName, dateConvert(dataObj[fieldName]))
        }
        else formData.append(fieldName, dataObj[fieldName])
    })

    return formData
}