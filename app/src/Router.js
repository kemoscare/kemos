import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import App from './App'
import AddUser from './AddUser'
import Login from './Login'
import { DISCONNECTED, WRONG_CREDENTIALS } from './flashes'
import { authUser, logoutUser } from './actions/users'
import { connect } from 'react-redux'

const api = require('./api-' + process.env.NODE_ENV)

const Router = ({
    connected,
    connecting,
    isAuthenticated,
    flash,
    dispatch,
}) => {
    const LoginComponent = (
        <Login dispatch={dispatch} connecting={connecting} flash={flash} />
    )
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() =>
                    isAuthenticated() ? <App /> : <Redirect to="/login" />
                }
            />
            <Route
                path="/login"
                render={() =>
                    !isAuthenticated() ? LoginComponent : <Redirect to="/" />
                }
            />
            <Route path="/logout" render={() => logoutAndRedirect(dispatch)} />
        </Switch>
    )
}

function isAuthenticated() {
    return sessionStorage.token ? true : false
}

function logoutAndRedirect(dispatch) {
    dispatch(logoutUser())
    return <Redirect to="/login" />
}

function mapStateToProps(state) {
    const { connected, connecting, token, flash } = state.users
    return {
        connected,
        connecting,
        isAuthenticated: isAuthenticated,
        flash,
    }
}

export default withRouter(connect(mapStateToProps)(Router))
