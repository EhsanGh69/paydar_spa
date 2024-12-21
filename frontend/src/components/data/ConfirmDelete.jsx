import { useContext } from "react"

import { DataContext } from "../../context/dataContext"
import { deleteData } from "../../services/dataServices"

export default function ConfirmDelete({warnNotify}) {

    const { firstField ,data, app, model, getOrderedData, orderingField, currentPage } = useContext(DataContext)

    const confirmBtnHandler = () => {
        deleteData(app, model, data.id)
        setTimeout(() => {
            getOrderedData(orderingField, currentPage)
            warnNotify(`${data[firstField]} با موفقیت حذف شد`)
        }, 500)
    }

  return (
    <div className="modal fade" id="confirmDelete" tabIndex="-1" aria-labelledby="confirmDeleteLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="confirmDeleteLabel">تایید حذف</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                آیا از حذف {data[firstField]} اطمینان دارید؟
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">انصراف</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal"
                onClick={confirmBtnHandler}>تایید</button>
            </div>
            </div>
        </div>
    </div>
  )
}
