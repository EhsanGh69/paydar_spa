import { useEffect, useRef, useState } from "react"
import { useDownloadExcel } from 'react-export-table-to-excel'

import DataCard from "../../components/data/DataCard"
import { singleData, orderData, filterData, dataFields } from "../../services/dataServices"
import { DataContext } from "../../context/dataContext"
import { setPaginate } from "../../helpers/dataHelpers"

export default function Contractors() {
    const [allContractors, setAllContractors] = useState([])
    const [paginatedOwners, setPaginatedContractors] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [contractor, setContractor] = useState({})
    const [loading, setLoading] = useState(false)
    const [orderingField, setOrderingField] = useState("")
    const [activeFields, setActiveFields] = useState([])
    const [selectiveFields, setSelectiveFields] = useState([])
    const contentRef = useRef(null)
    const [showActionBtns, setShowActionBtns] = useState(true)
    const { onDownload } = useDownloadExcel({
        currentTableRef: contentRef.current,
        filename: 'contractors table',
        sheet: 'contractors'
    })

    let pageSize = 3

    async function activeOwnerFields() {
        try {
            setLoading(true)
            const { data } = await dataFields('contractor')
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

    async function getOrderedOwners(orderField, curPage) {
        try {
            setLoading(true)
            const { data } = await orderData('persons', 'contractors', orderField)
            setAllContractors(data)
            setPaginatedContractors(setPaginate(pageSize, curPage, data))
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    async function getFilteredOwners(filterField, curPage) {
        try {
            setLoading(true)
            const { data } = await filterData('persons', 'contractors', filterField)
            setAllContractors(data)
            setPaginatedContractors(setPaginate(pageSize, curPage, data))
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    async function getOwner(id) {
        try {
            setLoading(true)
            const { data } = await singleData('persons', 'contractors', id)
            setContractor(data)
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }


    useEffect(() => {
        setPaginatedContractors(setPaginate(pageSize, currentPage, allContractors))
    }, [currentPage])

    useEffect(() => {
        getOrderedOwners(orderingField, currentPage)
        activeOwnerFields()
    }, [])

    useEffect(() => {
        setTimeout(() => setShowActionBtns(true), 1000)
    }, [showActionBtns])

    return (
        <>
            <DataContext.Provider value={{
                firstField: "company_name",
                allData: allContractors,
                paginatedData: paginatedOwners,
                setPaginatedData: setPaginatedContractors,
                allDataCount: allContractors.length,
                data: contractor,
                getData: getOwner,
                loading,
                app: "persons",
                model: "contractors",
                pageSize,
                currentPage,
                setCurrentPage,
                orderingFields: [
                    { value: 'company_name', name: 'نام شرکت' }
                ],
                getOrderedData: getOrderedOwners,
                orderingField,
                setOrderingField,
                getFilteredData: getFilteredOwners,
                selectiveFields,
                activeFields,
                contentRef,
                showActionBtns,
                setShowActionBtns,
                downloadExcel: onDownload
            }}>
                <DataCard />
            </DataContext.Provider>
        </>
    )
}
