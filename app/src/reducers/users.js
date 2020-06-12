import { REQUEST_LOGIN, RECEIVED_LOGIN, USER_LOGGED_OUT, LOGIN_FAILED } from '../actions/users'
import { WRONG_CREDENTIALS } from '../flashes'

const initialState = {
    credentials: {},
    token: "",
    connecting: false,
    connected: false,
    user: {
        first_name: "",
        last_name: ""
    },
    flash: {} 
}

export const users = (state=initialState, action) => {

    switch(action.type) {
        case REQUEST_LOGIN:
            return { ...state, connecting: true }
        case RECEIVED_LOGIN:
            //side effect tolerated here, as it is admitted that it is the only way
            //to access `sessionStorage.token` throughout the app
            sessionStorage.token = action.token
            return { ...state, token: action.token, connected: true, connecting: false, flash: "" }
        case LOGIN_FAILED:
            return {
                ...state,
                connected: false,
                connecting: false,
                flash: WRONG_CREDENTIALS
            }
        case USER_LOGGED_OUT:
            //same as RECEIVED_LOGIN here
            sessionStorage.token = ""
            return initialState
        default:
            return state
    }
}

