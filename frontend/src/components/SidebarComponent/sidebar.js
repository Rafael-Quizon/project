import React from "react";
import { ProSidebar, SidebarHeader, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar'
import { FaTachometerAlt, FaCalculator, FaSchool } from 'react-icons/fa'
import styles from './sidebar.module.scss';
import loginLogo from '../../assets/images/logo/login-logo.png'
import sidebarBg from '../../assets/images/cards/sidebar-bg.jpg'

class Sidebar extends React.Component {

    render() {
        const {
            accountRole,
            currentViewHandler
        } = this.props

        return (
            <ProSidebar collapsed="false" width={`100%`} className={`${styles.Sidebar}`}>
                <img src={sidebarBg} className={`${styles.SidebarBg}`} alt="sidebar-logo" />
                <SidebarHeader className={`mb-4`}>
                    <img className={`${styles.DashboardLogo}`} src={loginLogo} alt="logo"></img>
                </SidebarHeader>
                <SidebarContent>
                <Menu iconShape={'circle'}>
                        <MenuItem
                            style={{ listStyleType: 'none' }}
                            icon={<FaTachometerAlt className={`mr-2`} size={20} />}
                            onClick={(e) => currentViewHandler(e.target.innerText)}
                            className={`${styles.MenuItems}`}>Dashboard
                        </MenuItem>
                    </Menu>
                    {
                        accountRole === 'admin' &&
                        <Menu iconShape={'circle'}>
                            <MenuItem
                                style={{ listStyleType: 'none' }}
                                icon={<FaCalculator className={`mr-2 ${styles.MenuItems}`} size={20} />}
                                onClick={(e) => currentViewHandler(e.target.innerText)}>Manage Accountant
                            </MenuItem>
                        </Menu>
                    }
                    <Menu iconShape={'circle'}>
                        <MenuItem
                            style={{ listStyleType: 'none' }}
                            icon={<FaSchool className={`mr-2`} size={20} />}
                            onClick={(e) => currentViewHandler(e.target.innerText)}>Manage Student
                            </MenuItem>
                    </Menu>
                    <Menu iconShape={'circle'}>
                        <MenuItem
                            style={{ listStyleType: 'none' }}
                            icon={<FaSchool className={`mr-2`} size={20} />}
                            onClick={(e) => currentViewHandler(e.target.innerText)}>Manage Courses
                            </MenuItem>
                    </Menu>

                </SidebarContent>
            </ProSidebar>
        )
    }
}
export default Sidebar