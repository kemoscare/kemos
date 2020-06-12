import { makeTokenHeaders } from '../utils'
const api = require('../api-' + process.env.NODE_ENV)

export const REQUEST_USER = "REQUEST_USER";

export function requestUser() {
  return {
    type: REQUEST_USER,
    route: "users/",
  };
}

export const RECEIVED_USER = "RECEIVED_USER";

export function receivedUser(json) {
  return {
    type: RECEIVED_USER,
    user: json,
  };
}

export function fetchUser() {
  return function (dispatch, getState) {
    const action = requestUser();
    dispatch(action);
    const url = api.server + action.route;
    const { users: { token }} = getState();
    console.log(getState())
    fetch(url, {
      headers: makeTokenHeaders(token),
    })
      .then(
        (response) => response.json(),
        (error) => console.log(error)
      )
      .then((json) => dispatch(receivedUser(json)));
  };
}


export const REQUEST_LOGIN = "REQUEST_LOGIN";

export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    route: "users/token",
  };
}

export const LOGIN_FAILED = "LOGIN_FAILED"

export function loginFailed() {
    return {
        type: LOGIN_FAILED
    }
}

export const RECEIVED_LOGIN = "RECEIVED_LOGIN";

export function receivedLogin(json) {
  return {
    type: RECEIVED_LOGIN,
    token: json.token,
  };
}

export function loginUser(credentials) {
  return function (dispatch) {
    const action = requestLogin();
    dispatch(action);
    const url = api.server + action.route;
      console.log(credentials)
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          credentials.email + ":" + credentials.password
        )}`,
      }),
      body: JSON.stringify(credentials),
    })
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((json) => dispatch(receivedLogin(json)))
      .catch((error) => dispatch(loginFailed()))
  };
}

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export function logoutUser() {
  return {
    type: USER_LOGGED_OUT,
  };
}
