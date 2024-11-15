import { useEffect, useState } from "react"

import DataCard from "../../components/data/DataCard"

import { singleData, orderData, filterData, dataFields } from "../../services/dataServices"
import { DataContext } from "../../context/dataContext"
import { setPaginate } from "../../helpers/dataHelpers"

export default function Personnel() {

    const [allPersonnel, setAllPersonnel] = useState([])
    const [paginatedPersonnel, setPaginatedPersonnel] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [personnel, setPersonnel] = useState({})
    const [loading, setLoading] = useState(false)
    const [orderingField, setOrderingField] = useState("")
    const [activeFields, setActiveFields] = useState([])
    const [selectiveFields, setSelectiveFields] = useState([])

    let pageSize = 3

    async function activePersonnelFields() {
      try {
          setLoading(true)
          const { data } = await dataFields('personnel')
          const allFields = JSON.parse(data.fields_data)
          setActiveFields(allFields.filter(field => field.status))
          const selectives = allFields.filter(field => field.selective)
          setSelectiveFields(selectives.map(selective => selective.title))
          setLoading(false)

        } catch (err) {
          console.log(err)
          setLoading(false)
        }
    }

    async function getOrderedPersonnel(orderField, curPage) {
      try {
          setLoading(true)
          const { data } = await orderData('persons', 'personnel', orderField)
          setAllPersonnel(data)
          setPaginatedPersonnel(setPaginate(pageSize, curPage, data))
          setLoading(false)

        } catch (err) {
          console.log(err)
          setLoading(false)
        }
    }

    async function getFilteredPersonnel(filterField, curPage) {
      try {
          setLoading(true)
          const { data } = await filterData('persons', 'personnel', filterField)
          setAllPersonnel(data)
          setPaginatedPersonnel(setPaginate(pageSize, curPage, data))
          setLoading(false)

        } catch (err) {
          console.log(err)
          setLoading(false)
        }
    }

    async function getPersonnel(id) {
      try {
          setLoading(true)
          const { data } = await singleData('persons', 'personnel', id)
          setPersonnel(data)
          setLoading(false)

        } catch (err) {
          console.log(err)
          setLoading(false)
        }
    }

    useEffect(() => {
      setPaginatedPersonnel(setPaginate(pageSize, currentPage, allPersonnel))
    }, [currentPage])

    useEffect(() => {
        getOrderedPersonnel(orderingField, currentPage)
        activePersonnelFields()
    }, [])


  return (
    <>
        <DataContext.Provider value={{
            allData: allPersonnel,
            paginatedData: paginatedPersonnel,
            setPaginatedData: setPaginatedPersonnel,
            allDataCount: allPersonnel.length,
            data: personnel,
            getData: getPersonnel,
            loading,
            app: "persons",
            model: "personnel",
            pageSize,
            currentPage,
            setCurrentPage,
            orderingFields: [
              { value: 'full_name', name: 'نام و نام خانوادگی' }, 
              { value: 'job', name: 'سمت' }
            ],
            getOrderedData: getOrderedPersonnel,
            orderingField,
            setOrderingField,
            getFilteredData: getFilteredPersonnel,
            selectiveFields,
            activeFields
        }}>
            <DataCard />
        </DataContext.Provider>
    </>
  )
}
