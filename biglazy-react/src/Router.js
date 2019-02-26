import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import AddUser from './AddUser'
import Login from './Login'
import {DISCONNECTED, WRONG_CREDENTIALS} from './flashes'
import ReactGA from 'react-ga';

const api = require('./api-' + process.env.NODE_ENV)

class Router extends Component {

    constructor() {
        super()
        ReactGA.initialize('UA-131354895-1');
        ReactGA.pageview(window.location.pathname + window.location.search);
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

    handleDisconnection = (flash) => {
        delete sessionStorage["token"]
        this.setState({
            connected: false,
            flash: flash
        })
    }

    isAuthenticated = () => {
        return sessionStorage.token
        // return true
    }
    
    render() {
        const LoginComponent = <Login credentials={this.state.credentials} handleLogin={this.handleLogin} connecting={this.state.connecting} flash={this.state.flash} />
        const AddUserComponent = <AddUser handleDisconnection={this.handleDisconnection} />
        return (
            <Switch>
                <Route exact path="/" render={() => this.isAuthenticated() ? <App {...this.state} handleDisconnection={this.handleDisconnection}/> : <Redirect to='/login' />} />
                <Route path="/login" render={(props) => !this.isAuthenticated() ? LoginComponent : <Redirect to="/" />} />
                <Route path="/users/add" render={ () => this.isAuthenticated() ? AddUserComponent : <Redirect to="/login" /> }/>
            </Switch>
        )
    }
}

export default Router