import React from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import styles from './createStudent.module.scss'
import { getAllBranch } from '../../services/branchServices'
import { createStudent, updateStudent, getStudent } from '../../services/studentServices'
import { getAllAccountant } from '../../services/accountServices'
import { removeMany, storeMany, retrieveMany, retrieve } from '../../helpers/localStorageHelper'

export default class CreateStudent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            branches: [],
            accountants: [],
            lastName: '',
            middleName: '',
            firstName: '',
            bday: 0,
            age: 0,
            gender: '',
            province: '',
            city: '',
            house: '',
            nationality: '',
            collegedept: '',
            course: '',
            year: '',
            contact: 0,
            email: '',
            religion: '',
            branchId: 0,
            paymentStatus: 0,
            processedBy: 0,
            amount: 0,
            errors: ''
        }
    }

    componentDidMount() {
        const { currentAction, currentActionId } = this.props
        this.fetchAllBranch()
        this.fetchAllAccountant()
        this.setSessionToState()

        if ((currentAction === 'update' || currentAction === 'view') && currentActionId !== 0) {
            this.fetchStudent(currentActionId)
        }
    }

    componentWillUnmount() {
        removeMany([
            'currentAction',
            'currentActionId',
            'lastNameStd',
            'middleNameStd',
            'firstNameStd',
            'AgeStd',
            'BirthdayStd',
            'GenderStd',
            'ProvinceStd',
            'CityStd',
            'HouseNoStd',
            'NationalityStd',
            'CollegeDepartmentStd',
            'CourseStd',
            'YearStd',
            'ContactNumberStd',
            'EmailStd',
            'ReligionStd',
            'amountStd',
            'branchIdStd',
            'paymentStatusStd',
            'processedByStd'
        ])
    }

    createUpdateStudentHandler = async (e) => {
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
            response = await updateStudent(request)
        } else {
            response = await createStudent(request)
        }

        if (response.status === 'failed') {
            this.setState({ errors: response.errors })
        } else if (response.status === 'success') {
            this.props.currentViewHandler('Manage Student')
        }
    }

    fetchAllBranch = async () => {
        let branches = await getAllBranch()
        if (branches.data.length < 1) {
            return
        }
        this.setState({ branches: branches.data })
    }

    fetchAllAccountant = async () => {
        let accountants = await getAllAccountant()
        if (accountants.data.length < 1) {
            return
        }
        this.setState({ accountants: accountants.data })
    }

    fetchStudent = async (currentActionId) => {
        let response = await getStudent(currentActionId)
        let data = response.data

        if (data === undefined) {
            return
        }

        storeMany({
            lastNameStd: data.lastName,
            middleNameStd: data.middleName,
            firstNameStd: data.firstName,
            AgeStd: data.Age,
            BirthdayStd: data.Birthday,
            GenderStd: data.Gender,
            ProvinceStd: data.Province,
            CityStd: data.City,
            HouseNoStd: data.HouseNo,
            NationalityStd: data.Nationality,
            CollegeDepartmentStd: data.CollegeDepartment,
            CourseStd: data.Course,
            YearStd: data.Year,
            ContactNumberStd: data.ContactNumber,
            EmailStd: data.Email,
            ReligionStd: data.Religion,
            amountStd: data.paymentStudents.amount,
            branchIdStd: data.branchId,
            paymentStatusStd: data.paymentStatus,
            processedByStd: data.processedBy
        })

        this.setState({
            lastName: data.lastName,
            middleName: data.middleName,
            firstName: data.firstName,
            age: data.age,
            bday: data.birthday,
            gender: data.gender,
            province: data.province,
            city: data.city,
            house: data.houseNo,
            nationality: data.nationality,
            college: data.collegeDepartment,
            course: data.course,
            year: data.year,
            contact: data.contactNumber,
            email: data.email,
            religion: data.religion,
            amount: data.paymentStudents.amount,
            branchId: data.branchId,
            paymentStatus: data.paymentStatus,
            processedBy: data.processedBy
        })
    }

    setSessionToState = () => {
        let obj = retrieveMany([
            'lastNameStd',
            'middleNameStd',
            'firstNameStd',
            'AgeStd',
            'BirthdayStd',
            'GenderStd',
            'ProvinceStd',
            'CityStd',
            'HouseNoStd',
            'NationalityStd',
            'CollegeDepartmentStd',
            'CourseStd',
            'YearStd',
            'ContactNumberStd',
            'EmailStd',
            'ReligionStd',
            'amountStd',
            'branchIdStd',
            'paymentStatusStd',
            'processedByStd',
        ])

        if (Object.keys(obj).length === 0) {
            return
        }

        this.setState({
            lastName: obj.lastNameStd || '',
            middleName: obj.middleNameStd || '',
            firstName: obj.firstNameStd || '',
            Age: obj.AgeStd || 0,
            Birthday: obj.BirthdayStd || 0,
            Gender: obj.GenderStd || '',
            Province: obj.ProvinceStd || '',
            City: obj.CityStd || '',
            HouseNo: obj.HouseNoStd || '',
            Nationality: obj.NationalityStd || '',
            CollegeDepartment: obj.CollegeDepartmentStd || '',
            Course: obj.CourseStd || '',
            Year: obj.YearStd || '',
            ContactNumber: obj.ContactNumberStd || 0,
            Email: obj.EmailStd || '',
            Religion: obj.ReligionStd || '',
            amount: obj.amountStd || 0,
            branchId: obj.branchIdStd || 1,
            paymentStatus: obj.paymentStatusStd || 'unpaid',
            processedByStd: obj.processedByStd || 1
        })
    }

    onFieldChange = (fieldName) => {
        var isBday = false;
        var ageVal = 0;
        if (fieldName === 'bday') {
            var birthdateElement = document.querySelector('#birthdate');
            if (birthdateElement !== null) {
                var Bdate = birthdateElement.value
                var Bday = +new Date(Bdate);
                ageVal += ~~((Date.now() - Bday) / (31557600000));
                isBday = true;
            }
        }
        return (e) => {
            let sessionField = fieldName + 'Std'
            storeMany({
                [sessionField]: e.target.value
            })
            this.setState({ [fieldName]: e.target.value })
            if (isBday) {
                this.setState({ age: ageVal })
            }
        }
    }

    requestBuilder = () => {
        const {
            lastName,
            middleName,
            firstName,
            bday,
            age,
            gender,
            province,
            city,
            house,
            nationality,
            collegedept,
            course,
            year,
            contact,
            email,
            religion,
            amount
        } = this.state

        return {
            lastName,
            firstName,
            middleName,
            bday,
            age,
            gender,
            province,
            city,
            house,
            nationality,
            collegedept,
            course,
            year,
            contact,
            email,
            religion,
            branchId: parseInt(document.querySelector('#formGridBranch').value),
            paymentStatus: document.querySelector('#formGridStatus').value,
            processedBy: parseInt(retrieve('accountId')),
            amount: parseFloat(amount)
        }
    }
    
    render() {
        const {
            branches,
            accountants,
            lastName,
            middleName,
            firstName,
            bday,
            age,
            gender,
            province,
            city,
            house,
            nationality,
            collegedept,
            course,
            year,
            contact,
            email,
            religion,
            branchId,
            paymentStatus,
            processedBy,
            amount,
            errors
        } = this.state

        const { currentAction } = this.props

        if (branches.length < 1) {
            return <React.Fragment />
        }

        return (
            <div className={`${styles.FormDiv} d-flex justify-content-center px-5 py-5`}>
                <Form onSubmit={this.createUpdateStudentHandler}>
                    <Row className={`mt-5 px-3`}>
                        <h1>Student Form</h1>
                    </Row>
                    {
                        (currentAction === 'update' || currentAction === 'create') &&
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    }
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridLastName">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control type="lastname" placeholder="LastName" onChange={this.onFieldChange('lastName')} value={lastName} readOnly={currentAction === 'view' || currentAction === 'update'} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>FirstName</Form.Label>
                            <Form.Control type="firstname" placeholder="FirstName" onChange={this.onFieldChange('firstName')} value={firstName} readOnly={currentAction === 'view' || currentAction === 'update'} />
                        </Form.Group>

                        <Form.Group as={Col} sm={3} controlId="formGridMiddleName">
                            <Form.Label>MiddleName</Form.Label>
                            <Form.Control type="middlename" placeholder="MiddleName" onChange={this.onFieldChange('middleName')} value={middleName} readOnly={currentAction === 'view' || currentAction === 'update'} />
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridReligion">
                            <Form.Label>Religion</Form.Label>
                            <Form.Control type="religion" placeholder="Religion" onChange={this.onFieldChange('religion')} value={religion} readOnly={currentAction === 'view' || currentAction === 'update'} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" placeholder="Date" id="birthdate" onChange={this.onFieldChange('bday')} value={bday} readOnly={currentAction === 'view' || currentAction === 'update'} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" placeholder="Age" onChange={this.onFieldChange('age')} value={age} readOnly />
                        </Form.Group>

                        <Form.Group as={Col} sm={3} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control type="gender" placeholder="Gender" onChange={this.onFieldChange('gender')} value={gender} readOnly={currentAction === 'view'} />
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridNationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control type="nationality" placeholder="Nationality" onChange={this.onFieldChange('nationality')} value={nationality} readOnly={currentAction === 'view'} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridHouse">
                            <Form.Label>House No.</Form.Label>
                            <Form.Control type="house" placeholder="House" onChange={this.onFieldChange('house')} value={house} readOnly={currentAction === 'view'} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="city" placeholder="City" onChange={this.onFieldChange('city')} value={city} readOnly={currentAction === 'view'} />
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridProvince">
                            <Form.Label>Province</Form.Label>
                            <Form.Control type="province" placeholder="Province" onChange={this.onFieldChange('province')} value={province} readOnly={currentAction === 'view'} />
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridContact">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="contact" placeholder="Contact" onChange={this.onFieldChange('contact')} value={contact} readOnly={currentAction === 'view'} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>College Department</Form.Label>
                            <Form.Control as="select" defaultValue="CollegeDept" onChange={this.onFieldChange('collegedept')} value={collegedept} readOnly={currentAction === 'view'}>
                                <option value="CCS">College of Computer Studies</option>
                                <option value="COA">College of Accountancy</option>
                                <option value="CEA">College of Engineering and Architecture</option>
                                <option value="CED">College of Education</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCourse">
                            <Form.Label>Course</Form.Label>
                            <Form.Control type="course" placeholder="Course" onChange={this.onFieldChange('course')} value={course} readOnly={currentAction === 'view'} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select" defaultValue="Year" onChange={this.onFieldChange('year')} value={year} readOnly={currentAction === 'view'}>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} sm={3} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.onFieldChange('email')} value={email} readOnly={currentAction === 'view'} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridBranch">
                            <Form.Label>Branch</Form.Label>
                            <Form.Control as="select" defaultValue="Branches" onChange={this.onFieldChange('branchId')} value={branchId} readOnly={currentAction === 'view'}>
                                {
                                    branches.map(b => {
                                        return <option key={`branches-${b.id}`} value={b.id}>{b.name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridAmount">
                            <Form.Label>Payment Amount</Form.Label>
                            <Form.Control type="amount" placeholder="₱" onChange={this.onFieldChange('amount')} value={amount} readOnly={currentAction === 'view'} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" defaultValue="Payment Status" onChange={this.onFieldChange('paymentStatus')} value={paymentStatus} readOnly={currentAction === 'view'}>
                                <option value="unpaid">Unpaid</option>
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formErrorArea">
                            <Form.Label className={`${styles.error}`}>{errors}</Form.Label>
                        </Form.Group>
                    </Form.Row>

                </Form>
            </div>
        )
    }
}