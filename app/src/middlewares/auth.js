import { USER_LOGGED_OUT, REQUEST_AUTH, RECEIVED_AUTH } from '../actions/users'
import { makeTokenHeaders } from '../utils'

const auth = store => next => action => {
    const [method, resource] = action.type.split('_')
    if (method === 'REQUEST') {
        if (sessionStorage.token) {
            action.headers = new Headers({
                Authorization: `Bearer ${sessionStorage.token}`,
            })
            return next(action)
        }
    } else if (action.type === RECEIVED_AUTH) {
        sessionStorage.token = action.auth.token
    } else if (action.type === USER_LOGGED_OUT) {
        sessionStorage.token = ''
    }
    return next(action)
}

export default auth
