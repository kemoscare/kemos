import {
    REQUEST_AUTH,
    RECEIVED_AUTH,
    USER_LOGGED_OUT,
    AUTH_FAILED,
} from '../actions/users'
import { WRONG_CREDENTIALS } from '../flashes'

export const initialState = {
    credentials: {},
    token: '',
    connecting: false,
    connected: false,
    user: {
        first_name: '',
        last_name: '',
    },
    flash: {},
}

export const users = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_AUTH:
            return { ...state, connecting: true }
        case RECEIVED_AUTH:
            return {
                ...state,
                token: action.auth.token,
                connected: true,
                connecting: false,
                flash: '',
            }
        case AUTH_FAILED:
            return {
                ...state,
                connected: false,
                connecting: false,
                flash: WRONG_CREDENTIALS,
            }
        case USER_LOGGED_OUT:
            return initialState
        default:
            return state
    }
}
