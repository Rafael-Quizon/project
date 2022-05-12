import React from 'react'
import styles from './createCourse.module.scss'

import { Form, Button, Col, Row } from 'react-bootstrap'
import { createCourse, getAllCourses, updateCourse } from '../../services/courseServices'
import { removeMany, storeMany, retrieveMany } from '../../helpers/localStorageHelper'

export default class CreateCourse extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            subjectCode: '',
            subjectName: '',
            units: 0,
            hour: '',
            subjectCategory: '',
            faculty: 0,
            errors: ''
        }
    }

    createUpdateCourseHandler = async (e) => {
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
            response = await updateCourse(request)
        } else {
            response = await createCourse(request)
        }

        if (response.status === 'failed') {
            this.setState({ errors: response.errors })
        } else if (response.status === 'success') {
            this.props.currentViewHandler('Manage Course')
        }
    }

    fetchCourse= async (currentActionId) => {
        let response = await getAllCourses(currentActionId)
        let data = response.data

        if(data === undefined) {
            return
        }

        storeMany({
            subjectCode: data.subjectCode,
            subjectName: data.subjectName,
            units: data.units,
            hour: data.hour,
            subjectCategory: data.subjectCategory,
            faculty: data.faculty
        })
        
        this.setState({
            subjectCode: data.subjectCode,
            subjectName: data.subjectName,
            units: data.units,
            hour: data.hour,
            subjectCategory: data.subjectCategory,
            faculty: data.faculty
        })
    }

    setSessionToState = () => {
        let obj = retrieveMany([
            'subjectCode',
            'subjectName',
            'units',
            'hour',
            'subjectCategory',
            'faculty'
        ])

        if (Object.keys(obj).length === 0) {
            return
        }

        this.setState({
            subjectCode: obj.subjectCode || '',
            subjectName: obj.subjectName || '',
            units: obj.units || '',
            hour: obj.hour || '',
            subjectCategory: obj.subjectCategory || 0,
            faculty: obj.faculty || 1
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
            subjectCode,
            subjectName,
            units,
            hour,
            subjectCategory,
            faculty
        } = this.state

        return {
            subjectCode,
            subjectName,
            units,
            hour,
            subjectCategory,
            faculty
        }
    }

    render() {
        const {
            subjectCode,
            subjectName,
            units,
            hour,
            subjectCategory,
            faculty,
            errors
        } = this.state

        const { currentAction } = this.props

        return (
            <div className={`${styles.FormDiv} d-flex justify-content-center px-5 py-5`}>
                <Form onSubmit={this.createUpdateCoursetHandler}>
                    <Row className={`mt-5 px-3`}>
                        <h1 className={`text-capitalize`}>{currentAction} Course</h1>
                    </Row>
                    <Form.Row className={`mt-3`}>
                        <Form.Group as={Col} controlId="formGridSubjectCode">
                            <Form.Label>Subject Code</Form.Label>
                            <Form.Control type="text" placeholder="Subject Code" onChange={this.onFieldChange('subjectCode')} value={subjectCode} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSubjectName">
                            <Form.Label>Subject Name</Form.Label>
                            <Form.Control type="text" placeholder="Subject Name" onChange={this.onFieldChange('subjectName')} value={subjectName} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridUnits">
                            <Form.Label>Units</Form.Label>
                            <Form.Control type="text" placeholder="Units" onChange={this.onFieldChange('units')} value={units} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridFirstHour">
                            <Form.Label>Hour</Form.Label>
                            <Form.Control type="hour" placeholder="Time" onChange={this.onFieldChange('hour')} value={hour} />
                        </Form.Group>

                        <Form.Group as={Col} sm={3} controlId="formGridSubject Category">
                            <Form.Label>Subject Category</Form.Label>
                            <Form.Control type="text" placeholder="Subject Category" onChange={this.onFieldChange('subjectCategory')} value={subjectCategory} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} sm={3} controlId="formGridSubjectFaculty">
                            <Form.Label>Faculty</Form.Label>
                            <Form.Control type="text" placeholder="Faculty" onChange={this.onFieldChange('faculty')} value={faculty} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formErrorArea">
                            <Form.Label className={`${styles.error}`}>{errors}</Form.Label>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Add Course
                    </Button>
                </Form>
            </div>
        )
    }
}