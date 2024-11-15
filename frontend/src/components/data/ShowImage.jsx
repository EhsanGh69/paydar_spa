import { useContext } from "react"

import { DataContext } from "../../context/dataContext"

export default function ShowImage() {

  const { data } = useContext(DataContext)

  return (
    <div className="modal fade" id="showImage" tabIndex="-1" 
        aria-labelledby="showImageLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="showImageLabel">
                        مشاهده تصویر قرارداد {data.full_name}
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body text-center">
                    <img src={data.contract_image} alt="contract image" width="400" />
                </div>
            </div>
        </div>
    </div>
  )
}
