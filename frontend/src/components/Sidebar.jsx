import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

import SidebarMenu from "./SidebarMenu"
import { getMe } from '../services/authServices'

export default function Sidebar() {

    const menuItems = {
        persons: [
            {title: "پرسنل", name: "personnel", icon: "fa-people-roof"},
            {title: "مالکین", name: "owners", icon: "fa-person-shelter"},
            {title: "پیمانکاران", name: "contractors", icon: "fa-person-digging"},
            {title: "تأمین کنندگان", name: "suppliers", icon: "fa-people-line"},
        ],
        projects: [
            {title: "پروژه‌های جاری", name: "current_projects", icon: "fa-trowel-bricks"},
            {title: "هزینه‌ها", name: "costs", icon: "fa-cash-register"},
            {title: "سفارش ملزومات", name: "supplies_orders", icon: "fa-truck"},
            {title: "فروش محصولات", name: "products_sales", icon: "fa-store"},
        ],
        archives: [
            {title: "قراردادها", name: "contracts", icon: "fa-handshake"},
            {title: "صورت جلسه‌ها", name: "proceedings", icon: "fa-users-between-lines"},
            {title: "توافق‌نامه‌ها", name: "agreements", icon: "fa-people-arrows"},
            {title: "رسیدها", name: "receipts", icon: "fa-file-invoice"},
            {title: "اسناد ثبتی و اداری", name: "documents", icon: "fa-id-card"},
        ],
        accounting: [
            {title: "چک‌ها", name: "cheques", icon: "fa-wallet"},
            {title: "دریافت‌ها و پرداخت‌ها", name: "receives_pays", icon: "fa-money-bill-transfer"},
            {title: "تنخواه", name: "fund", icon: "fa-user-tag"},
            {title: "صندوق", name: "cash_box", icon: "fa-sack-dollar"},
        ],
        warehousing: [
            {title: "موجودی انبار", name: "stuffs", icon: "fa-boxes-stacked"},
            {title: "ورود به انبار", name: "warehouse_import", icon: "fa-arrow-right-to-bracket"},
            {title: "خروج از انبار", name: "warehouse_export", icon: "fa-arrow-right-from-bracket"},
        ]
    }

    const linkItems = {
        messages: {title: "پیام‌ها", name: "messages", icon: "fa-envelope"},
        users: {title: "کاربران", name: "users", icon: "fa-users"},
        groups: {title: "گروه‌ها", name: "groups", icon: "fa-elevator"},
        settings: {title: "تنظیمات", name: "settings", icon: "fa-gear"}
    }

    const [loggedUser, setLoggedUser] = useState({})

    const getLoggedUser = async () => {
        try {
            const { data } = await getMe()
            setLoggedUser(data)
        } catch (err) {
            console.log(err.response) 
        }
    }

    useEffect(() => {
        getLoggedUser()
    }, [])

    return (
        <aside className="main-sidebar sidebar-dark-cyan elevation-4">
            <div className="sidebar h-100">
                <Link to={"/"} className="nav-link" 
                    style={{borderBottom: '1px solid #4f5962'}}>
                    <p className="text-center"><img src="/logo192.png" alt="Logo" width="70" style={{opacity: '0.8'}} /></p>
                    <h5 className="brand-text text-center">سامانه مدیریت پروژه ها</h5>
                </Link>
                <div className="user-panel mt-3 pb-3 mb-3 d-flex justify-content-around">
                    <div className="image">
                        <img src="/panel/img/co.png" className="img-circle elevation-2" alt="User"/>
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{loggedUser.username}</a>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" 
                        role="menu" data-accordion="false">
                        
                        <SidebarMenu appTitle="اشخاص" appName="persons" appLinks={menuItems.persons} />

                        <SidebarMenu appTitle="پروژه ها" appName="projects" appLinks={menuItems.projects} />

                        <SidebarMenu appTitle="بایگانی اسناد" appName="archives" appLinks={menuItems.archives} />

                        <SidebarMenu appTitle="حسابداری" appName="archives" appLinks={menuItems.accounting} />

                        <SidebarMenu appTitle="انبارداری" appName="archives" appLinks={menuItems.warehousing} />

                        <SidebarMenu appTitle="" appName="messages" appLinks={linkItems.messages} />
                        
                        <SidebarMenu appTitle="" appName="users" appLinks={linkItems.users} />

                        <SidebarMenu appTitle="" appName="groups" appLinks={linkItems.groups} />

                        <SidebarMenu appTitle="" appName="settings" appLinks={linkItems.settings} />

                    </ul>
                </nav>
            </div>
        </aside>
    )
}