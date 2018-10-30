import React, { Component } from 'react'
import {
    FormGroup, InputGroup, ControlGroup, Button, H4, Callout
} from '@blueprintjs/core';
import './AddUser.css'
import Logo from './Logo';

class Login extends Component {

    constructor() {
        super()
        this.state = { credentials: {}, connecting: false}
    }
    

    handleInputChange = (event) => {
        this.props.credentials[event.target.name] = event.target.value
        this.setState(this.state)
    }

    render() {

        const { connecting, handleLogin, flash} = this.props

        return (
            <div className="monoPageWrapper">
                <div className="addUser">
                    <Logo />
                    {flash && <div><Callout intent={flash.intent} title={flash.title}>{flash.content}</Callout><br /></div>}
                    <H4>Se Connecter</H4>
                    <ControlGroup vertical>
                        <InputGroup name="email" onChange={this.handleInputChange} placeholder="email@chu-bordeaux.fr" />
                        <InputGroup name="password" onChange={this.handleInputChange} placeholder="Mot de passe" type="password" />
                        <Button onClick={handleLogin} text="Se Connecter" rightIcon="log-in" loading={connecting} />
                    </ControlGroup>
                </div>
            </div>

        )
    }
}

export default Login