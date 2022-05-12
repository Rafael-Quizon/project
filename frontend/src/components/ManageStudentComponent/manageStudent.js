import React from 'react'
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap'
import styles from './manageStudent.module.scss'
import { getAllStudents, deleteStudent, searchStudent } from '../../services/studentServices'
import { getAllAccountant } from '../../services/accountServices'
import { getAllBranch } from '../../services/branchServices'
import { FaTrash, FaPen, FaFilter, FaSearch, FaPlusSquare } from 'react-icons/fa'
import { retrieve, retrieveMany } from '../../helpers/localStorageHelper'

export default class AdminBody extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filterByBranch: 0,
            filterByAccountant: 0,
            searchBar: '',
            students: [],
            branches: [],
            accounts: [],
            show: false,
            currentDeleteId: 0
        }
    }

    componentDidMount() {
        this.fetchAllStudents()
        this.fetchAllAccountant()
        this.fetchAllBranch()
    }

    fetchAllStudents = async () => {
        console.log("test")
        let students = await getAllStudents()
        let session = retrieveMany(['accountBranchId', 'accountRole'])

        if (students.data.length < 1) {
            return
        }
        let data = students.data
        if (session.accountRole === 'accountant') {
            data = data.filter(d => d.branchId == session.accountBranchId)
        }

        this.setState({ students: data })
    }

    fetchAllAccountant = async () => {
        let accounts = await getAllAccountant()
        if (accounts.data.length < 1) {
            return
        }
        this.setState({ accounts: accounts.data })
    }

    fetchAllBranch = async () => {
        let branches = await getAllBranch()
        if (branches.data.length < 1) {
            return
        }
        this.setState({ branches: branches.data })
    }

    deleteStudentModal = async (id) => {
        this.setState({ show: true, currentDeleteId: id })
    }

    deleteStudent = async () => {
        const { currentDeleteId } = this.state
        await deleteStudent(currentDeleteId)
        this.setState({ show: false, currentDeleteId: 0 })

        this.fetchAllStudents()
    }

    deleteStud = async (id) => {
        await deleteStudent(id)
        this.fetchAllStudents()
    }

    searchHandler = async (e) => {
        e.preventDefault()

        const { searchBar, filterByBranch, filterByAccountant } = this.state
        let searchRequest = { key: searchBar }

        if (filterByBranch != 0) {
            searchRequest.branchId = filterByBranch
        }

        if (filterByAccountant != 0) {
            searchRequest.processedBy = filterByAccountant
        }

        let response = await searchStudent(searchRequest)
        this.setState({
            students: response.data
        })

    }

    onFieldChange = (fieldName) => {
        return (e) => {
            this.setState({ [fieldName]: e.target.value })
        }
    }

    currentActionFilterHandler = (action, id) => {
        this.props.currentActionHandler(action, id)
        this.props.createHandler("Create Student")
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        const {
            students,
            filterByBranch,
            filterByAccountant,
            branches,
            accounts,
            show
        } = this.state

        const { accountRole } = this.props

        return (
            <div className={`${styles.AdminBody}`}>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this Student.?
                                                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="danger" onClick={this.deleteStudent}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                <Row className={`mt-5 px-5`}>
                    <h1>Manage Students</h1>
                </Row>
                <Row className={`mt-5 px-5`}>
                    <Col sm={9}>
                        <Form onSubmit={this.searchHandler} className={`w-100 d-flex`} autoComplete="off">
                            <input className={`form-control w-100 mr-3`} type="text" name="search-bar" onChange={this.onFieldChange('searchBar')} placeholder={`Search for (etc. Name, Branch)`} />
                            <select className={`form-control w-50 mr-3`} onChange={this.onFieldChange('filterByBranch')} value={filterByBranch}>
                                <option value={0}>Filter By Branch</option>
                                {
                                    branches.map(b => {
                                        return <option key={`branches-${b.id}`} value={b.id}>{b.name}</option>
                                    })
                                }
                            </select>
                            {
                                retrieve('accountRole') !== 'accountant' &&
                                <select className={`form-control w-50 mr-3`} onChange={this.onFieldChange('filterByAccountant')} value={filterByAccountant}>
                                    <option value={0}>Filter By Accountant</option>
                                    {
                                        accounts.map(a => {
                                            let fullName = a.firstName + " " + a.lastName
                                            return <option key={`accountant-${a.id}`} value={a.id}>{fullName}</option>
                                        })
                                    }
                                </select>
                            }
                            <Button className={`form-control h-100 w-25 mr-3`} type="submit">
                                <FaSearch className={`mr-1`} /> Search
                            </Button>
                        </Form>
                    </Col>
                    <Col className={`d-flex justify-content-end align-items-center`} sm={3}>
                        {accountRole === 'accountant' &&
                            <Button className={`d-flex align-items-center btn btn-success`} onClick={() => this.currentActionFilterHandler('create', 0)}>
                                <FaPlusSquare className={`mr-1`} />Create New Account
                        </Button>
                        }
                    </Col>
                </Row>
                <Row className={`mt-2 px-5`}>
                    <div className={`${styles.TableDiv} pl-3 w-100`}>
                        <Table className={`${styles.Table}`}>
                            <thead className={`thead-light`}>
                                <tr>
                                    <th>ID</th>
                                    <th colSpan={2}>Name</th>
                                    <th colSpan={2}>Branch</th>
                                    <th>Payment Status</th>
                                    <th>Processed By</th>
                                    <th className={`text-center`}>Information</th>
                                    <th className={`text-center`}>Delete</th>
                                    <th className={`text-center`}>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student, index) => {
                                        let fullName = student.firstName + " " + student.lastName
                                        let acFullName = ''
                                        if (student.studentUsers) {
                                            let acFirstName = student.studentUsers.firstName ? student.studentUsers.firstName : ''
                                            let acLastName = student.studentUsers.lastName ? student.studentUsers.lastName : ''
                                            acFullName = acFirstName + ' ' + acLastName
                                        }

                                        return (
                                            <tr key={`tr-student-${index}`}>
                                                <td>{student.id}</td>
                                                <td colSpan={2}>{fullName}</td>
                                                <td colSpan={2}>{student.studentBranches.name}</td>
                                                <td>{student.paymentStatus}</td>
                                                <td>{acFullName}</td>
                                                <td align="center">
                                                    <FaFilter onClick={() => this.currentActionFilterHandler('view', student.id)} className={`${styles.FaIcons} `} />
                                                </td>
                                                <td align="center">
                                                    <FaTrash onClick={() => this.deleteStudentModal(student.id)} className={`${styles.FaIcons} `} />
                                                </td>
                                                <td align="center">
                                                    <FaPen onClick={() => this.currentActionFilterHandler('update', student.id)} className={`${styles.FaIcons}`} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </Row>
            </div>
        )
    }
}