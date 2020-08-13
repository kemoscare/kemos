import date from './date'
import auth from './auth'
import { USER_LOGGED_OUT, RECEIVED_AUTH } from '../actions/users'

function create(middleware) {
    const store = {
        dispatch: jest.fn(() => ({})),
        getState: jest.fn(),
    }

    const next = jest.fn()

    const invoke = action => middleware(store)(next)(action)
    return { store, next, invoke }
}

describe('Test Middlewares', () => {
    it('Tests `date` adding a dispatchedAt property', () => {
        const { store, next, invoke } = create(date)
        const anyAction = { type: 'ANY_ACTION' }
        expect(anyAction).not.toHaveProperty('dispatchedAt')
        invoke(anyAction)
        expect(anyAction).toHaveProperty('dispatchedAt')
    })

    it('Tests `auth` creating new Header with bearer for action', () => {
        sessionStorage.token = '29e0iwjskjflsdkj'
        const { store, next, invoke } = create(auth)
        const requestAction = { type: 'REQUEST_RESOURCE' }
        expect(requestAction).not.toHaveProperty('headers')
        invoke(requestAction)
        expect(requestAction).toHaveProperty(
            'headers',
            new Headers({ Authorization: `Bearer ${sessionStorage.token}` })
        )
    })

    it('Tests `auth` updating the action when receiving an auth token', () => {
        const { store, next, invoke } = create(auth)
        sessionStorage.token = ''
        const sessionStorageStub = 'sessionStorage stub'
        const authReceivedAction = {
            type: RECEIVED_AUTH,
            auth: { token: sessionStorageStub },
        }
        expect(sessionStorage.token).toEqual('')
        invoke(authReceivedAction)
        expect(sessionStorage.token).toEqual(sessionStorageStub)
    })

    it('Tests `auth` emptying sessionStorage.token when user logs out', () => {
        const { store, next, invoke } = create(auth)
        sessionStorage.token = 'sessionStorageStub'
        const userLoggedOutAction = {
            type: USER_LOGGED_OUT,
        }
        expect(sessionStorage.token).toEqual('sessionStorageStub')
        invoke(userLoggedOutAction)
        expect(sessionStorage.token).toEqual('')
    })
})
