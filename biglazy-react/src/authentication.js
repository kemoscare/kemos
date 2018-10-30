export function hasPermission(permission, user) {
    if(!user || ('rights' in user) == false) return false
    return user.rights.includes(permission)
}