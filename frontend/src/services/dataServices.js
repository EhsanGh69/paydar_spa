import axios from "axios"

export function allProvinces() {
    return axios.get('/settings/county_list/')
}

export function singleProvince(province_slug) {
    return axios.get(`/settings/county_list/${province_slug}/`)
}

export function dataFields(model) {
    return axios.get(`/settings/model_fields/${model}/`)
}

export function updateDataFields(model, data) {
    return axios.put(`/settings/model_fields/${model}/`, data)
}

//* ------------------------------------------------------------

export function orderData(app, model, orderField) {
    return axios.get(`/${app}/${model}/?ordering=${orderField}`)
}

export function filterData(app, model, filterField) {
    return axios.get(`/${app}/${model}/?search=${filterField}`)
}

export function singleData(app, model, id) {
    return axios.get(`/${app}/${model}/${id}/`)
}

export function createData(app, model, data) {
    return axios.post(`/${app}/${model}/`, data)
}

export function updateData(app, model, id, data) {
    return axios.put(`/${app}/${model}/${id}/`, data)
}

export function deleteData(app, model, id) {
    return axios.delete(`/${app}/${model}/${id}/`)
}
