import API from '../utils/api'

export const getAllCourses = async () => {
    return await API.get('/courses')
        .then(res => res.data)
}

export const createCourse = async (obj) => {
    console.log('test', obj)
    return await API.post('/courses/create', obj)
        .then(res => res.data)
}

export const updateCourse = async (obj) => {
    return await API.post('/courses/update', obj)
        .then(res => res.data)
}

export const deleteCourse = async (id) => {
    return await API.delete(`/courses/${id}`)
        .then(res => res.data)
}