import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import App from './App'
import AddUser from './AddUser'
import Login from './Login'
import { DISCONNECTED, WRONG_CREDENTIALS } from './flashes'
import { loginUser, logoutUser } from './actions/users'
import { connect } from 'react-redux'

const api = require('./api-' + process.env.NODE_ENV)
/*
class Router extends Component {

    constructor() {
        super()
        this.state = {
            connected: false,
            credentials: {},
            connecting: false
        }
    }

    handleLogin = () => {
        const { credentials } = this.state
        this.setState({connecting: true})
        fetch(api.server + 'users/token', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(credentials.email + ':' + credentials.password)}`
            }),
            body: JSON.stringify(credentials)
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            sessionStorage.token = data['token']
            this.setState({connecting: false, connected: true})
            
        })
        .catch(error => {
            console.log(error)
            this.setState({
                    connecting: false, 
                    connected: false,
                    flash: WRONG_CREDENTIALS 
                })
        })
        
    }


    render() {
        const props
        const LoginComponent = <Login credentials={this.state.credentials} handleLogin={this.handleLogin} connecting={this.state.connecting} flash={this.state.flash} />
        return (
            <Switch>
                <Route exact path="/" render={() => this.isAuthenticated() ? <App {...this.state} handleDisconnection={this.handleDisconnection}/> : <Redirect to='/login' />} />
                <Route path="/login" render={(props) => !this.isAuthenticated() ? LoginComponent : <Redirect to="/" />} />
            </Switch>
        )
    }
}
*/
const Router = ({ connected, connecting, isAuthenticated, flash, dispatch }) => {


    const LoginComponent = (<Login dispatch={dispatch} connecting={connecting} flash={flash} />)
    console.log(isAuthenticated())
    return (
        <Switch>
            <Route exact path="/" render={() => isAuthenticated() ? <App /> : <Redirect to='/login' />} />
            <Route path="/login" render={() => !isAuthenticated() ? LoginComponent : <Redirect to="/" />} />
            <Route path="/logout" render={() => logoutAndRedirect(dispatch)} />
        </Switch>
    )
}

function isAuthenticated() {
    return sessionStorage.token
}

function logoutAndRedirect(dispatch) {
    dispatch(logoutUser())
    return <Redirect to="/login" />
}


function mapStateToProps(state) {
    const { connected, connecting, token, flash} = state.users
    return {
        connected,
        connecting,
        isAuthenticated: isAuthenticated,
        flash
    }
}

export default withRouter(connect(mapStateToProps)(Router))
