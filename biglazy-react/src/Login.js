import React, { Component } from 'react'
import {
    FormGroup, InputGroup, ControlGroup, Button, H4
} from '@blueprintjs/core';
import './AddUser.css'

class Login extends Component {
    

    render() {
        return (
            <div className="monoPageWrapper">
                <div className="addUser">
                    <div className="center-title"><span className="KEMOS">KEMOS</span><span className="CARE">CARE</span></div>
                    <H4>Se Connecter</H4>
                    <ControlGroup vertical>
                        <InputGroup placeholder="email@chu-bordeaux.fr" />
                        <InputGroup placeholder="Mot de passe" type="password" />
                        <Button text="Se Connecter" rightIcon="log-in" />
                    </ControlGroup>
                </div>
            </div>

        )
    }
}

export default Login