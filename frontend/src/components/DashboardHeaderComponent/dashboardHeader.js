import React from 'react'
import styles from './dashboardHeader.module.scss'
import header from '../../assets/images/cards/Rizal_Branch.jpg'
import { FaCog } from 'react-icons/fa'
import { Dropdown } from 'react-bootstrap'

export default class DashboardHeader extends React.Component {
    render() {
        const { logoutHandler, accountName } = this.props

        return (
            <div className={styles.DashboardHeader}>
                <img className={`${styles.DashboardHeaderBg}`} src={header}></img>
                <span>{accountName}</span>
                <Dropdown className={`mr-4 ml-2`}>
                    <Dropdown.Toggle id="dropdown-basic">
                        <FaCog className={`mr-1`} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => logoutHandler()}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}