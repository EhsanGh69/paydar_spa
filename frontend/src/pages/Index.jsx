import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react";

import { tokenControl } from "../services/authServices"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"

export default function MainRoutes() {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      tokenControl(navigate, location.pathname)
    }, [])

    return (
        <div className="wrapper">
            <Navbar />
            <Sidebar />

            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid pt-3">
                        <Outlet />
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}