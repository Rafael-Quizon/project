import React from 'react'
import { Row, Col, Table, Button, Form, Modal } from 'react-bootstrap'
import styles from './course.module.scss'
import { getAllCourses, deleteCourse } from '../../services/courseServices'
import { FaTrash, FaPen, FaFilter, FaSearch, FaPlusSquare } from 'react-icons/fa'
import { retrieve, retrieveMany } from '../../helpers/localStorageHelper'

export default class AdminBody extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courses: [],
            filterByCourse: 0,
            searchBar: '',
            subjectCode: [],
            subjectName: [],
            units: [],
            hour: [],
            subjectCategory: [],
            faculty: [],
            show: false,
            currentDeleteId: 0
        }
    }

    componentDidMount() {
        this.fetchAllCourse();
    }

    fetchAllCourse = async () => {
        let course = await getAllCourses()
        let session = retrieveMany(['subjectCode'])

        if (course.data.length < 1) {
            return
        }
        let data = course.data
        if (session.subjectCode === 'course') {
            data = data.filter(d => d.subjectCode == session.coursesubjectCode)
        }

        this.setState({ courses: data })
    }

    deleteCourse = async () => {
        const { currentDeleteId } = this.state
        await deleteCourse(currentDeleteId)
        this.fetchAllCourse()
    }

    deleteCourseModal = async (id) => {
        this.setState({ show: true, currentDeleteId: id })
    }

    //     currentActionFilterHandler = (action, id) => {
    //         this.props.currentActionHandler(action, id)
    //         this.props.createHandler("Add Course")
    //     }
    //
    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        const {
            filterByCourse,
            subjectCode,
            subjectName,
            units,
            hour,
            subjectCategory,
            faculty,
            show,
            courses
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
                        <Modal.Title>Delete Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this Course?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button variant="danger" onClick={this.deleteCourse}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                <Row className={`mt-5 px-5`}>
                    <h1>Create Course</h1>
                </Row>
                <Row className={`mt-5 px-5`}>
                    {/* <Col sm={9}>
                        <Form onSubmit={this.searchHandler} className={`w-100 d-flex`} autoComplete="off">
                            <input className={`form-control w-100 mr-3`} type="text" name="search-bar" onChange={this.onFieldChange('searchBar')} placeholder={`Search for (etc. Name, Course)`} />
                            <select className={`form-control w-50 mr-3`} onChange={this.onFieldChange('filterByCourse')} value={filterByCourse}>
                                <option value={0}>Filter By Course</option>
                                {
                                    courses.map(b => {
                                        return <option key={`course-${b.id}`} value={b.id}>{b.name}</option>
                                    })
                                }
                            </select>
                            <Button className={`form-control h-100 w-25 mr-3`} type="submit">
                                <FaSearch className={`mr-1`} /> Search
                            </Button>
                        </Form>
                    </Col> */}
                    <Col className={`d-flex justify-content-end align-items-center`} sm={3}>
                        {accountRole === 'accountant' &&
                            <Button className={`d-flex align-items-center btn btn-success`} onClick={() => this.currentActionFilterHandler('create', 0)}>
                                <FaPlusSquare className={`mr-1`} />Add New Course
                            </Button>
                        }
                    </Col>
                </Row>
                <Row className={`mt-2 px-5`}>
                    <div className={`${styles.TableDiv} pl-3 w-100`}>
                        <Table className={`${styles.Table}`}>
                            <thead className={`thead-light`}>
                                <tr>
                                    <th colSpan={2}>Subject Code</th>
                                    <th colSpan={2}>Subject Name</th>
                                    <th>Units</th>
                                    <th>Time</th>
                                    <th>Subject Category</th>
                                    <th>Faculty</th>
                                    <th className={`text-center`}>Delete</th>
                                    <th className={`text-center`}>Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course, index) => {
                                    return (
                                        <tr key={`tr-course-${index}`}>
                                            <td>{course.subjectCode}</td>
                                            <td colSpan={2}>{course.subjectName}</td>
                                            <td colSpan={2}>{course.units}</td>
                                            <td>{course.hour}</td>
                                            <td>{course.subjectCategory}</td>
                                            <td>{course.faculty}</td>
                                            <td align="center">
                                                <FaTrash onClick={() => this.deleteCourseModal(course.id)} className={`${styles.FaIcons} `} />
                                            </td>
                                            <td align="center">
                                                <FaPen onClick={() => this.currentActionFilterHandler('update', course.id)} className={`${styles.FaIcons}`} />
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>
                </Row>
            </div>
        )
    }
}