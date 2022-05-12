exports.store = (key, value) => {
    sessionStorage.setItem(key, value)
}

exports.retrieve = (key) => {
    return sessionStorage.getItem(key)
}

exports.remove = (key) => {
    sessionStorage.removeItem(key)
}

exports.destroy = () => {
    sessionStorage.clear()
}

exports.removeMany = (keys) => {
    keys.map(k => {
        sessionStorage.removeItem(k)
    })
}

exports.storeMany = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        sessionStorage.setItem(key, value)
    }
}

exports.retrieveMany = (keys) => {
    let result = {}
    keys.map(k => {
        let val = sessionStorage.getItem(k)
        if(sessionStorage.getItem(k)) {
            result[k] = val
        }
    })

    return result
}