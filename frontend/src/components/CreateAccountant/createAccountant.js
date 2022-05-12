import React from 'react'
import styles from './createAccountant.module.scss'

import { Form, Button, Col, Row } from 'react-bootstrap'
import { createAccountant, getAccountant, updateAccountant } from '../../services/accountServices'
import { getAllBranch } from '../../services/branchServices'
import { removeMany, storeMany, retrieveMany } from '../../helpers/localStorageHelper'

export default class CreateAccountant extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branches: [],
            username: '',
            password: '',
            lastName: '',
            middleName: '',
            firstName: '',
            branchId: 0,
            salary: 0,
            errors: ''
        }
    }

    componentDidMount() {
        const { currentAction, currentActionId } = this.props
        this.fetchAllBranch()
        this.setSessionToState()

        if (currentAction === 'update' && currentActionId !== 0) {
            this.fetchAccountant(currentActionId)
        }

    }

    componentWillUnmount() {
        removeMany([
            'currentAction',
            'currentActionId',
            'usernameAcc',
            'lastNameAcc',
            'middleNameAcc',
            'firstNameAcc',
            'salaryAcc',
            'branchIdAcc'
        ])
    }

    createUpdateAccountantHandler = async (e) => {
        //TODO needs validation
        e.preventDefault()

        let currentAction = this.props.currentAction
        let request = this.requestBuilder()
        let response

        if (currentAction === 'update') {
            if (request.password === '') {
                delete request.password
            }
            request.id = this.props.currentActionId
            response = await updateAccountant(request)
        } else {
            response = await createAccountant(request)
        }

        if (response.status === 'failed') {
            this.setState({ errors: response.errors })
        } else if (response.status === 'success') {
            this.props.currentViewHandler('Manage Accountant')
        }
    }

    fetchAllBranch = async () => {
        let branches = await getAllBranch()
        if (branches.data.length < 1) {
            return
        }
        this.setState({ branches: branches.data })
    }

    fetchAccountant = async (currentActionId) => {
        let response = await getAccountant(currentActionId)
        let data = response.data

        if(data === undefined) {
            return
        }

        storeMany({
            usernameAcc: data.accountUsers.username,
            lastNameAcc: data.lastName,
            middleNameAcc: data.middleName,
            firstNameAcc: data.firstName,
            salaryAcc: data.salary,
            branchIdAcc: data.branchId
        })
        
        this.setState({
            username: data.accountUsers.username,
            password: data.password,
            lastName: data.lastName,
            middleName: data.middleName,
            firstName: data.firstName,
            salary: data.salary,
            branchId: data.branchId
        })
    }

    setSessionToState = () => {
        let obj = retrieveMany([
            'usernameAcc',
            'lastNameAcc',
            'middleNameAcc',
            'firstNameAcc',
            'salaryAcc',
            'branchIdAcc'
        ])

        if (Object.keys(obj).length === 0) {
            return
        }

        this.setState({
            username: obj.usernameAcc || '',
            lastName: obj.lastNameAcc || '',
            middleName: obj.middleNameAcc || '',
            firstName: obj.firstNameAcc || '',
            salary: obj.salaryAcc || 0,
            branchId: obj.branchIdAcc || 1
        })
    }

    onFieldChange = (fieldName) => {
        return (e) => {
            let sessionField = fieldName + 'Acc'
            storeMany({
                [sessionField]: e.target.value
            })
            this.setState({ [fieldName]: e.target.value })
        }
    }

    requestBuilder = () => {
        const {
            username,
            password,
            lastName,
            middleName,
            firstName,
            salary
        } = this.state

        return {
            username,
            password,
            lastName,
            firstName,
            middleName,
            branchId: parseInt(document.querySelector('#formGridBranch').value),
            salary: parseFloat(salary)
        }
    }

    render() {
        const {
            branches,
            branchId,
            username,
            password,
            lastName,
            middleName,
            firstName,
            salary,
            errors
        } = this.state

        const { currentAction } = this.props

        return (
            <div className={`${styles.FormDiv} d-flex justify-content-center px-5 py-5`}>
                <Form onSubmit={this.createUpdateAccountantHandler}>
                    <Row className={`mt-5 px-3`}>
                        <h1 className={`text-capitalize`}>{currentAction} Accountant</h1>
                    </Row>
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={this.onFieldChange('username')} value={username} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder={currentAction === 'update' ? 'Leave it blank for default password' : 'Password'} onChange={this.onFieldChange('password')} value={password} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastname" placeholder="Last Name" onChange={this.onFieldChange('lastName')} value={lastName} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstname" placeholder="First Name" onChange={this.onFieldChange('firstName')} value={firstName} />
                        </Form.Group>

                        <Form.Group as={Col} sm={3} controlId="formGridMiddleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="middlename" placeholder="Middle Name" onChange={this.onFieldChange('middleName')} value={middleName} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridBranch">
                            <Form.Label>Branch</Form.Label>
                            <Form.Control as="select" onChange={this.onFieldChange('branchId')} value={branchId}>
                                {
                                    branches.map(b => {
                                        return <option key={`branches-${b.id}`} value={b.id}>{b.name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" onChange={this.onFieldChange('salary')} value={salary} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formErrorArea">
                            <Form.Label className={`${styles.error}`}>{errors}</Form.Label>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}