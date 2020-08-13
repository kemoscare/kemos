import { users, initialState as usersInitialState } from './users.js'
import {
    REQUEST_AUTH,
    RECEIVED_AUTH,
    USER_LOGGED_OUT,
    AUTH_FAILED,
} from '../actions/users'

import { WRONG_CREDENTIALS } from '../flashes'

const requestAuthTestAction = {
    type: REQUEST_AUTH,
}

const receivedAuthTestActionCreator = token => {
    return {
        type: RECEIVED_AUTH,
        auth: { token },
    }
}

const authFailedTestAction = {
    type: AUTH_FAILED,
}

describe('User status reducer', () => {
    it('Requested auth', () => {
        const expectedState = { ...usersInitialState, connecting: true }
        expect(users(usersInitialState, requestAuthTestAction)).toEqual(
            expectedState
        )
    })

    it('Received auth', () => {
        const token = 'token-stub'
        const expectedState = {
            ...usersInitialState,
            token,
            connected: true,
            connecting: false,
            flash: '',
        }
        expect(
            users(usersInitialState, receivedAuthTestActionCreator(token))
        ).toEqual(expectedState)
    })

    it('Auth failed', () => {
        const expectedState = {
            ...usersInitialState,
            connected: false,
            connecting: false,
            flash: WRONG_CREDENTIALS,
        }
        expect(users(usersInitialState, authFailedTestAction)).toEqual(
            expectedState
        )
    })

    it('User logged out', () => {
        const expectedState = usersInitialState
        expect(users(usersInitialState, { type: USER_LOGGED_OUT })).toEqual(
            expectedState
        )
    })
})
