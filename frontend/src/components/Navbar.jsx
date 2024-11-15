import { useNavigate, Link } from "react-router-dom"

import { logout } from "../services/authServices"

export default function Navbar() {

    const navigate = useNavigate()

    return (
        <nav className="main-header navbar navbar-expand navbar-white 
            navbar-light d-flex justify-content-between">
            <ul className="navbar-nav mb-4 mb-sm-0">
                <li className="nav-item d-md-none">
                    <a className="nav-link" data-widget="pushmenu" href="#">
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
                <li className="nav-item border-right border-left-0 mr-3">
                    <Link to={"/"} className="nav-link">
                        <i className="fa-solid fa-house mr-1"></i>
                        <span>خانه</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <h4 className="m-0 text-dark">صفحه اصلی</h4>
                </li>
            </ul>
            <ul className="navbar-nav d-flex flex-column flex-sm-row mr-2 border-right-0 border-left">
                <li className="nav-item mb-3 mb-sm-0">
                    <a className="nav-link"
                        data-widget="control-sidebar"
                        data-slide="true"
                        href="#">
                        <i className="fa-solid fa-lock mr-1"></i>
                        <span>تغییر رمز عبور</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="control-sidebar"
                        data-slide="true" style={{cursor: "pointer"}}
                        onClick={() => logout(navigate)}>
                        <i className="fas fa-sign-out-alt text-lg mr-1"></i>
                        <span>خروج</span>
                    </a>
                </li>
            </ul>
      </nav>
    )
}