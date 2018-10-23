import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App'
import AddUser from './AddUser'
import Login from './Login'

class Router extends Component {
    
    render() {
        return (
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <Route path="/users/add" component={AddUser} />
            </Switch>
        )
    }
}

export default Router