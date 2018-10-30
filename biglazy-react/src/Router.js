import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import AddUser from './AddUser'
import Login from './Login'
import {DISCONNECTED, WRONG_CREDENTIALS} from './flashes'
const api = require('./api-' + process.env.NODE_ENV)

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
        fetch(api.server + 'users/login', {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(credentials)
        })
        .then(response => {
                    if(response.ok){
                        console.log(response.headers.get('set-cookie'))
                        response.json()
                    } else {
                        Promise.reject(response)
                    }
                }
            )
        .then(data => {
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
        return this.state.connected
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