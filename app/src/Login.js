import React, { Component } from 'react'
import {
    FormGroup,
    InputGroup,
    ControlGroup,
    Button,
    H4,
    H3,
    Callout,
    Intent,
} from '@blueprintjs/core'
import './Login.css'
import { loginUser } from './actions/users'
import Logo from './Logo'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            credentials: { email: '', password: '' },
            connecting: false,
        }
    }

    componentDidMount() {
        window._paq.push(['trackPageView'])
    }

    handleInputChange = event => {
        this.state.credentials[event.target.name] = event.target.value
        this.setState(this.state)
    }

    render() {
        const { connecting, flash, dispatch } = this.props
        const { credentials } = this.state
        return (
            <div className="monoPageWrapper">
                <div className="description bp3-text-large">
                    <Logo />
                    <H4>Quoi ?</H4>
                    <p>
                        Kemos rend les consultations en oncologie dans les
                        hopitaux plus efficace tout en améliorant la relation
                        médecin-malade.{' '}
                    </p>
                    <H4>Pour qui ?</H4>
                    <p>
                        Kemos est destiné à tous les professionnels de santé
                        travaillant dans le domaine de l'oncologie, médecin,
                        infirmier·e, secrétaires.
                    </p>
                    <H4>Comment ?</H4>
                    <p>
                        Kemos repose sur une{' '}
                        <strong>base de donnée exhaustive</strong> de protocoles
                        de chimiothérapie utilisés en France.
                    </p>
                </div>
                <div className="login">
                    {flash && (
                        <div>
                            <Callout intent={flash.intent} title={flash.title}>
                                {flash.content}
                            </Callout>
                            <br />
                        </div>
                    )}
                    <H3>Inscription</H3>
                    <Button
                        text="S'inscrire"
                        large
                        fill
                        icon="form"
                        intent={Intent.SUCCESS}
                    />
                    <br />

                    <H4>Se Connecter</H4>
                    <ControlGroup vertical>
                        <InputGroup
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="email@chu-bordeaux.fr"
                        />
                        <InputGroup
                            name="password"
                            onChange={this.handleInputChange}
                            placeholder="Mot de passe"
                            type="password"
                        />
                        <Button
                            onClick={() => dispatch(loginUser(credentials))}
                            text="Se Connecter"
                            rightIcon="log-in"
                            loading={connecting}
                        />
                    </ControlGroup>
                </div>
            </div>
        )
    }
}

export default Login
