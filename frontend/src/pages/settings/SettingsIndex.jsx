import { Link } from "react-router-dom"
import { ToastContainer } from 'react-toastify'

import "./SettingsIndex.css"

export default function SettingsIndex() {
  return (
    <div className="card">
        <div className="card-body">
            <div className="row">

                <div className="col-12 col-md-2 col-xl-3">
                    <Link to="/settings/fields">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-body text-center">
                                <h3><i class="fa-solid fa-list-check"></i></h3>
                                <h5>تنظیمات فیلدها</h5>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-12 col-md-2 col-xl-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body text-center">
                            <h3><i class="fa-solid fa-palette"></i></h3>
                            <h5>شخصی سازی</h5>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-2 col-xl-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body text-center">
                            <h3><i class="fa-brands fa-font-awesome"></i></h3>
                            <h5>تنظیمات نام و لوگو</h5>
                        </div>
                    </div>
                </div>

                <ToastContainer />

            </div>
        </div>
    </div>
  );
}
