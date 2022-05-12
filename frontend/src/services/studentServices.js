import API from '../utils/api'

export const getStatisticsData = async () => {
    return await API.get('/students/statistics/count')
        .then(res => res.data)
}

export const getAllStudents = async () => {
    return await API.get('/students')
        .then(res => res.data)
}

export const createStudent = async (obj) => {
    console.log('test', obj)
    return await API.post('/students/create', obj)
        .then(res => res.data)
}

export const updateStudent = async (obj) => {
    return await API.post('/students/update', obj)
        .then(res => res.data)
}

export const getStudent = async (id) => {
    return await API.get(`/students/${id}`)
        .then(res => res.data)
}

export const searchStudent = async (obj) => {
    return await API.post('/students/search', obj)
        .then(res => res.data)
}

export const deleteStudent = async (id) => {
    return await API.delete(`/students/${id}`)
        .then(res => res.data)
}