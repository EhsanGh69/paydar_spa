import { useEffect, useRef, useState } from "react"
import { useDownloadExcel } from 'react-export-table-to-excel'

import DataCard from "../../components/data/DataCard"
import { singleData, orderData, filterData, dataFields } from "../../services/dataServices"
import { DataContext } from "../../context/dataContext"
import { setPaginate } from "../../helpers/dataHelpers"

export default function Owners() {
    const [allOwners, setAllOwners] = useState([])
    const [paginatedOwners, setPaginatedOwners] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [owner, setOwner] = useState({})
    const [loading, setLoading] = useState(false)
    const [orderingField, setOrderingField] = useState("")
    const [activeFields, setActiveFields] = useState([])
    const [selectiveFields, setSelectiveFields] = useState([])
    const contentRef = useRef(null)
    const [showActionBtns, setShowActionBtns] = useState(true)
    const { onDownload } = useDownloadExcel({
        currentTableRef: contentRef.current,
        filename: 'owners table',
        sheet: 'owners'
    })

    let pageSize = 3

    async function activeOwnerFields() {
        try {
            setLoading(true)
            const { data } = await dataFields('owner')
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
            const { data } = await orderData('persons', 'owners', orderField)
            setAllOwners(data)
            setPaginatedOwners(setPaginate(pageSize, curPage, data))
            setLoading(false)

        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    async function getFilteredOwners(filterField, curPage) {
		try {
			setLoading(true)
			const { data } = await filterData('persons', 'owners', filterField)
			setAllOwners(data)
			setPaginatedOwners(setPaginate(pageSize, curPage, data))
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

    async function getOwner(id) {
		try {
			setLoading(true)
			const { data } = await singleData('persons', 'owners', id)
			setOwner(data)
			setLoading(false)

		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}


    useEffect(() => {
		setPaginatedOwners(setPaginate(pageSize, currentPage, allOwners))
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
                firstField: "full_name",
                allData: allOwners,
                paginatedData: paginatedOwners,
                setPaginatedData: setPaginatedOwners,
                allDataCount: allOwners.length,
                data: owner,
                getData: getOwner,
                loading,
                app: "persons",
                model: "owners",
                pageSize,
                currentPage,
                setCurrentPage,
                orderingFields: [
                    { value: 'full_name', name: 'نام و نام خانوادگی' },
                    { value: 'ownership_type', name: 'نوع مالکیت' }
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
