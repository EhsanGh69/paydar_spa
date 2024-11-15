import { useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"

import { tokenControl } from "../../services/authServices"

export default function AuthIndex() {
    document.body.style.backgroundImage = 'url("/panel/img/auth_bg.jpg")'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = 'cover'


    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      tokenControl(navigate, location.pathname)
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3" 
                    style={{paddingTop: "5rem"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}