import API from '../utils/api'

export const loginService = async (req) => {
    return await API.post('/accounts/login',  req )
        .then(res => res.data)
}

export const getAllAccountant = async () => {
    return await API.get('/accounts')
        .then(res => res.data)
}

export const deleteAccountant = async (id) => {
    return await API.delete(`/accounts/${id}`)
        .then(res => res.data)
}

export const createAccountant = async (req) => {
    return await API.post('/accounts/create', req)
        .then(res => res.data)
}

export const getAccountant = async (id) => {
    return await API.get(`/accounts/${id}`)
        .then(res => res.data)
}

export const updateAccountant = async (req) => {
    return await API.post('/accounts/update', req)
        .then(res => res.data)
}

export const searchAccountant = async (req) => {
    return await API.post('/accounts/search', req)
        .then(res => res.data)
}