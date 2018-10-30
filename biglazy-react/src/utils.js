

export function makeHTTPString(username, password="") {
    return new Headers(
        {
            Authorization: `Basic ${btoa(username + ':' + password)}`
        }
    )
}