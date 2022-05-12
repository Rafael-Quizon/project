import React from "react";
import { Redirect } from 'react-router-dom'
import { Container, Col, Row } from "react-bootstrap";
import styles from './dashboard.module.scss'

// components
import ManageAccountant from '../../components/ManageAccountantComponent/manageAccountant'
import ManageCourse from '../../components/ManageCourseComponent/course.js'
import ManageStudent from '../../components/ManageStudentComponent/manageStudent'
import Sidebar from "../../components/SidebarComponent/sidebar";
import Header from '../../components/DashboardHeaderComponent/dashboardHeader'
import Body from '../../components/DashboardBodyComponent/dashboardBody'
import CreateAccountant from '../../components/CreateAccountant/createAccountant'
import CreateStudent from '../../components/CreateStudent/createStudent'
import CreateCourse from '../../components/CreateCourse/createCourse'

// icons
import loginBg from '../../assets/images/logo/dashboard-bg.jpg'

// api call 
import { getStatisticsData } from '../../services/studentServices'

// helpers
import { store, retrieve, destroy, storeMany } from '../../helpers/localStorageHelper'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            accountId: 0,
            accountBranchId: 1,
            accountRole: 'admin',
            accountName: '',
            currentView: '',
            currentData: '',
            currentAction: '',
            currentActionId: 0,
            isValidUser: true,
            statisticsData: {}
        }
    }

    static getDerivedStateFromProps(props, state) {
        let newState = props.location.state
        if (newState) {
            let data = newState.data
            if (!retrieve('currentView')) {
                store('currentView', 'Dashboard')
            }
            let firstName = data.accountUsers.firstName
            let lastName = data.accountUsers.lastName
            let fullName = lastName + (firstName ? ', ' + firstName : '')
            storeMany({
                accountBranchId: data.accountUsers.branchId,
                accountRole: data.accountType,
                accountId: data.accountUsers.id,
                accountName: fullName
            })

            return {
                currentData: data,
                accountBranchId: data.accountUsers.branchId,
                accountRole: data.accountType,
                accountId: data.accountUsers.id,
                accountName: fullName,
                isValidUser: true,
                currentView: retrieve('currentView')
            }
        } else {
            return {
                isValidUser: false
            }
        }
    }

    componentDidMount() {
        this.retrieveStatisticsData()
        this.setSessionToState()
    }

    componentWillUnmount() {
        destroy()
    }

    logoutHandler = () => {
        this.props.location.state = ''
        destroy()
        this.forceUpdate()
    }

    retrieveStatisticsData = async () => {
        let response = await getStatisticsData()
        this.setState({ statisticsData: response.data })
    }

    setSessionToState = () => {
        if (retrieve('currentAction') && retrieve('currentActionId')) {
            this.setState({
                currentAction: retrieve('currentAction'),
                currentActionId: retrieve('currentActionId')
            })
        }
    }

    currentViewHandler = (item) => {
        store('currentView', item)
        this.setState({
            currentView: item
        })
    }

    currentActionHandler = (action, id) => {
        storeMany({ currentAction: action, currentActionId: id })
        this.setState({ currentAction: action, currentActionId: id })
    }

    renderBody = () => {
        const {
            currentView,
            currentAction,
            currentActionId,
            statisticsData,
            accountRole
        } = this.state
        console.log(currentView)
        switch (currentView) {
            case 'Dashboard':
                return <Body statisticsData={statisticsData} />
            case 'Manage Accountant':
                return <ManageAccountant createHandler={this.currentViewHandler} currentActionHandler={this.currentActionHandler} />
            case 'Create Accountant':
                return <CreateAccountant currentViewHandler={this.currentViewHandler} currentAction={currentAction} currentActionId={currentActionId} />
            case 'Manage Student':
                return <ManageStudent createHandler={this.currentViewHandler} currentActionHandler={this.currentActionHandler} accountRole={accountRole} />
            case 'Create Student':
                return <CreateStudent currentViewHandler={this.currentViewHandler} currentAction={currentAction} currentActionId={currentActionId} />
            case 'Manage Courses':
                return <ManageCourse createHandler={this.currentViewHandler} currentActionHandler={this.currentActionHandler} accountRole={accountRole} />
            case 'Create Courses':
                return <CreateCourse currentViewHandler={this.currentViewHandler} currentAction={currentAction} currentActionId={currentActionId} />
            default:
                return <div>Selected not found</div>
        }
    }

    render() {
        const {
            accountRole,
            accountName,
            isValidUser
        } = this.state

        if (!isValidUser) {
            return <Redirect to={{ pathname: '/', state: { data: '' } }} />
        }

        return (
            <Container fluid className={`${styles.Dashboard} position-relative`}>
                <Row className={`${styles.MainRow}`}>
                    <Col sm={2} className={`pl-0 h-100`}>
                        <Row className={`${styles.SidebarDiv} ml-1`}>
                            <Sidebar
                                accountRole={accountRole}
                                currentViewHandler={this.currentViewHandler}
                            />
                        </Row>
                    </Col>
                    <Col sm={10} className={`h-100`}>
                        <Row className={`px-0`}>
                            <Header logoutHandler={this.logoutHandler} accountName={accountName} />
                        </Row>
                        <Row className={`px-2 overflow-auto`}>
                            {this.renderBody()}
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Dashboard