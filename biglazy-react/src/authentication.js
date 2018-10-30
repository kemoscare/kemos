export function headersWithToken(token) { 
    return new Headers({
        Authorization: `Basic ${btoa(token + ":")}`
    })
}

export function hasRole(role, user) {
    return user.contains(role)
}