import { makeTokenHeaders } from '../utils'
const api = require('../api-' + process.env.NODE_ENV)

export const REQUEST_USER = 'REQUEST_USER'

export function requestUser() {
    return {
        type: REQUEST_USER,
        route: 'users/',
    }
}

export const RECEIVED_AUTH = 'RECEIVED_AUTH'

export const REQUEST_AUTH = 'REQUEST_AUTH'

export const AUTH_FAILED = 'AUTH_FAILED'

export function authFailed() {
    return {
        type: AUTH_FAILED,
    }
}
/**
 * Action creator to request a login (intercepted by the `api` middleware).
 * @param {Object} credentials A JSON object containing an `email` and a `password` from a form
 */

export function requestAuth(credentials) {
    return {
        type: REQUEST_AUTH,
        route: 'users/token',
        method: 'POST',
        error: AUTH_FAILED,
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Basic ${btoa(
                credentials.email + ':' + credentials.password
            )}`,
        }),
        body: JSON.stringify(credentials),
    }
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export function logoutUser() {
    return {
        type: USER_LOGGED_OUT,
    }
}
