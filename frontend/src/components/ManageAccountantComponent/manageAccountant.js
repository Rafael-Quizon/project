import React from 'react'
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap'
import styles from './manageAccountant.module.scss'
import { FaTrash, FaPen, FaPlusSquare, FaSearch } from 'react-icons/fa'
import { getAllAccountant, deleteAccountant, searchAccountant } from '../../services/accountServices'
import { getAllBranch } from '../../services/branchServices'

export default class AdminBody extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            filterByBranch: 0,
            accounts: [],
            branches: [],
            searchBar: '',
            show: false,
            currentDeleteId: 0
        }
    }

    componentDidMount() {
        this.fetchAllAccountant()
        this.fetchAllBranch()
    }

    fetchAllAccountant = async () => {
        let accounts = await getAllAccountant()
        this.setState({ accounts: accounts.data })
    }

    fetchAllBranch = async () => {
        let branches = await getAllBranch()
        if (branches.data.length < 1) {
            return
        }
        this.setState({ branches: branches.data })
    }

    deleteAccountModal = async (id) => {
        this.setState({ show: true, currentDeleteId: id })
    }

    deleteAccount = async () => {
        const { currentDeleteId } = this.state
        await deleteAccountant(currentDeleteId)
        this.setState({ show: false, currentDeleteId: 0 })

        this.fetchAllAccountant()
    }

    searchHandler = async (e) => {
        e.preventDefault()

        const { searchBar, filterByBranch } = this.state
        let searchRequest = { key: searchBar }

        if (filterByBranch !== 0) {
            searchRequest.branchId = filterByBranch
        }

        let response = await searchAccountant(searchRequest)
        this.setState({
            accounts: response.data
        })

    }

    onFieldChange = (fieldName) => {
        return (e) => {
            this.setState({ [fieldName]: e.target.value })
        }
    }

    currentActionFilterHandler = (action, id) => {
        this.props.currentActionHandler(action, id)
        this.props.createHandler("Create Accountant")
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        const {
            accounts,
            filterByBranch,
            branches,
            show
        } = this.state

        return (
            <div className={styles.AdminBody}>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Accountant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       Are you sure you want to delete this Account.?
                                                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="danger" onClick={this.deleteAccount}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                <Row className={`mt-5 px-5`}>
                    <h1>Manage Accountants</h1>
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
                            <Button className={`form-control h-100 w-25 mr-3`} type="submit">
                                <FaSearch className={`mr-1`} /> Search
                            </Button>
                        </Form>
                    </Col>
                    <Col className={`d-flex justify-content-end align-items-center`} sm={3}>
                        <Button className={`d-flex align-items-center btn btn-success`} onClick={() => this.currentActionFilterHandler('create', 0)}>
                            <FaPlusSquare className={`mr-1`} />Create New Account
                        </Button>
                    </Col>

                </Row>
                <Row className={`mt-2 px-5`}>
                    <div className={`${styles.TableDiv} pl-3 w-100`}>
                        <Table className={`${styles.Table}`}>
                            <thead className={`thead-light`}>
                                <tr>
                                    <th>ID</th>
                                    <th colSpan={3}>Name <FaSearch className={`ml-1`} size={12} /></th>
                                    <th>Username <FaSearch className={`ml-1`} size={12} /></th>
                                    <th colSpan={2}>Branch <FaSearch className={`ml-1`} size={12} /></th>
                                    <th>Salary</th>
                                    <th className={`text-center`}>Delete</th>
                                    <th className={`text-center`}>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.map((accountant, index) => {
                                        let fullName = accountant.firstName + " " + accountant.lastName
                                        return (
                                            <tr key={`tr-accountant-${index}`}>
                                                <td>{accountant.id}</td>
                                                <td colSpan={3}>{fullName}</td>
                                                <td>{accountant.accountUsers.username}</td>
                                                <td colSpan={2}>{accountant.userBranches.name}</td>
                                                <td>{accountant.salary}</td>
                                                <td align="center">
                                                    <FaTrash onClick={() => this.deleteAccountModal(accountant.id)} className={`${styles.FaIcons}`} />
                                                </td>
                                                <td align="center">
                                                    <FaPen onClick={() => this.currentActionFilterHandler('update', accountant.id)} className={`${styles.FaIcons}`} />
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