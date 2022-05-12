const messageBuilder = (status, errors, data) => {
    return {
        status: status,
        errors: errors,
        data: data
    }
}

module.exports = {
    messageBuilder,
    MSG_SUCCESS: 'success',
    MSG_ERROR: 'error',
    MSG_FAILED: 'failed'
}