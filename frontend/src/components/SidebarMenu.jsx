import { NavLink, useLocation } from 'react-router-dom'

export default function SidebarMenu({appTitle, appName, appLinks}) {

    const location = useLocation()

    return (
        <>
            {appLinks.length > 1 ? (
                <li 
                    className={
                        `nav-item has-treeview 
                        ${location.pathname.includes(appName) ? " menu-open" : "" }`
                    }
                >
                    <a href="#" 
                        className={
                            `nav-link
                            ${location.pathname.includes(appName) ? " active" : "" }`
                        }
                    >
                        <p className="mr-2" style={{fontSize: '1.2rem'}}>
                            <span>{appTitle}</span>   
                            <i className="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul 
                        className="nav nav-treeview rounded"
                        style={{
                            display: location.pathname.includes(appName) ? "block" : "none",
                            backgroundColor: "#494e54"
                        }}
                        >
                        {appLinks.length > 0 && appLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <NavLink 
                                    to={`/${appName}/${link.name}`} 
                                    className={({isActive}) => {
                                        return [
                                            "nav-link",
                                            isActive || location.pathname.includes(link.name) ? "active" : ""
                                        ].join(" ")
                                    }}
                                >
                                    <i
                                        className={`fa-solid ${link.icon}  text-primary`}
                                        style={{fontSize: '1.2rem'}}
                                    ></i>
                                    <span className="ml-2">{link.title}</span>
                                </NavLink>
                            </li>
                        ))}
                        
                    </ul>
                </li>
            ) : (
                <li className="nav-item mt-2">
                    <NavLink 
                        to={`/${appName}`} 
                        className={({isActive}) => {
                            return [
                                "nav-link",
                                isActive ? "active" : ""
                            ].join(" ")
                        }}
                    >
                        <i
                            className={`fa-solid ${appLinks.icon}  text-primary`}
                            style={{fontSize: '1.2rem'}}
                        ></i>
                        <span className="ml-2">{appLinks.title}</span>
                    </NavLink>
                </li>
            )}
        </>
        
    )
}
