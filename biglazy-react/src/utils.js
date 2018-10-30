

export function makeHTTPString(username, password="") {
    return new Headers(
        {
            Authorization: `Basic ${btoa(username + ':' + password)}`
        }
    )
}

export function makeTokenHeaders(token) {
    return new Headers({
        Authorization: `Bearer ${token}`
    })
}