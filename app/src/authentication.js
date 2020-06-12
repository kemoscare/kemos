import _ from 'lodash'

export function hasPermission(rights, user) {
    // TODO: REMOVE when users reducer is done.
    return true
    if(!user || ('rights' in user) == false) return false
    return _.intersection(rights, user.rights).length > 0
}
