import API from '../utils/api'

export const getAllStudentCourses = async () => {
    return await API.get('/studentCourses')
        .then(res => res.data)
}

export const createStudentCourse = async (obj) => {
    console.log('test', obj)
    return await API.post('/studentCourses/create', obj)
        .then(res => res.data)
}

export const updateStudentCourse = async (obj) => {
    return await API.post('/studentCourses/update', obj)
        .then(res => res.data)
}

export const deleteStudentCourse = async (id) => {
    return await API.delete(`/studentCourses/${id}`)
        .then(res => res.data)
}