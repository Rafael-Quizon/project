import API from '../utils/api'

export const getAllBranch = async () => {
    return await API.get('/branches')
        .then(res => res.data)
}