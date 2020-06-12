import React, { Component } from 'react'
import {
    FormGroup,
    InputGroup,
    Button,
    Intent,
    HTMLSelect,
    H4,
    Callout,
} from '@blueprintjs/core'
import MultiSelect from './MultiSelect'
import './AddUser.css'
import subscribe from './roles'
import themes from './panes/selectContent'
import { makeTokenHeaders } from './utils'
import {
    DISCONNECTED,
    USER_ALREADY_EXISTS,
    USER_CREATED_SUCCESSFULLY,
    INTERNAL_ERROR,
} from './flashes'
import Logo from './Logo'
import { HospitalSelect } from './MultiSelectHospitals'
const api = require('./api-' + process.env.NODE_ENV)

class AddUser extends Component {
    constructor() {
        super()

        this.DEFAULT_USER = {
            email: '',
            first_name: '',
            last_name: '',
            role: 'Interne',
            themes: [
                'urologie',
                'general',
                'immunotherapie',
                'neurologie',
                'gynecologie',
                'orl',
                'poumon',
                'systeme digestif',
                'sein',
            ],
            rights: ['use-app'],
        }

        this.state = {
            rights: subscribe.rights.map((right, index) => {
                return { name: right, isSelected: false, key: index }
            }),
            accessibleThemes: themes.themes.map((theme, index) => {
                return {
                    name: { label: theme.value, value: theme.value },
                    isSelected: false,
                    key: index,
                }
            }),
            user: this.DEFAULT_USER,
            loading: false,
        }
    }

    handleInputChange = event => {
        console.log(this.state)
        this.state.user[event.target.name] = event.target.value
        this.setState(this.state)
    }

    componentDidMount() {
        fetch(api.server + 'hospitals/')
            .then(response =>
                response.ok ? response.json() : Promise.reject(response)
            )
            .then(data => this.setState({ hospitalList: data }))
    }

    handleSubmit = event => {
        let { user } = this.state
        console.log(sessionStorage.token)
        this.setState({ loading: true })
        fetch(api.server + 'users/add', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.token}`,
            },
            body: JSON.stringify(this.state.user),
        })
            .then(response =>
                response.ok ? response.json() : Promise.reject(response)
            )
            .then(json => {
                const f = () => {
                    this.setState({
                        flash: USER_CREATED_SUCCESSFULLY,
                        loading: false,
                    })
                    console.log(json)
                }
                setTimeout(f, 0)
            })
            .catch(response => {
                if (response.status === 409) {
                    this.setState({
                        flash: USER_ALREADY_EXISTS,
                        user: this.DEFAULT_USER,
                        loading: false,
                    })
                } else if (response.status === 403 || response.status === 401) {
                    this.props.handleDisconnection(DISCONNECTED)
                } else {
                    this.setState({
                        flash: INTERNAL_ERROR,
                        user: this.DEFAULT_USER,
                        loading: false,
                    })
                }
            })
    }

    render() {
        const { user, flash } = this.state
        return (
            <div className="monoPageWrapper">
                <div className="addUser">
                    <Logo />
                    {flash && (
                        <div>
                            <Callout intent={flash.intent} title={flash.title}>
                                {flash.content}
                            </Callout>
                            <br />
                        </div>
                    )}
                    <H4>Ajouter un utilisateur</H4>
                    <FormGroup label="E-mail" label-for="email">
                        <InputGroup
                            id="email"
                            name="email"
                            placeholder="email@chu-bordeaux.fr"
                            onChange={this.handleInputChange}
                            value={user.email}
                        />
                    </FormGroup>
                    <FormGroup label="Prenom" label-for="first_name">
                        <InputGroup
                            id="first_name"
                            name="first_name"
                            placeholder="Jean"
                            onChange={this.handleInputChange}
                            value={user.firstname}
                        />
                    </FormGroup>
                    <FormGroup label="Nom" label-for="last_name">
                        <InputGroup
                            id="last_name"
                            name="last_name"
                            placeholder="Dupond"
                            onChange={this.handleInputChange}
                            value={user.surname}
                        />
                    </FormGroup>
                    <FormGroup label="Hôpital actuel">
                        <HospitalSelect
                            hospitals={this.state.hospitalList}
                            user={this.state.user}
                        />
                    </FormGroup>
                    <FormGroup label="Qualité" label-for="role">
                        <HTMLSelect
                            id="role"
                            name="role"
                            options={subscribe.roles.map(role => role.label)}
                            onChange={this.handleInputChange}
                            value={user.role.label}
                        />
                    </FormGroup>
                    <FormGroup label="Droits" label-for="rights">
                        <MultiSelect
                            name="rights"
                            items={this.state.rights}
                            selectedItemsChanged={items =>
                                (user.rights = items)
                            }
                        />
                    </FormGroup>
                    <FormGroup
                        label="Thèmes accessibles"
                        label-for="accessible-themes"
                    >
                        <MultiSelect
                            name="accessible-themes"
                            items={this.state.accessibleThemes}
                            selectedItemsChanged={items =>
                                (user.themes = items)
                            }
                        />
                    </FormGroup>
                    <Button
                        onClick={this.handleSubmit}
                        intent={Intent.PRIMARY}
                        loading={this.state.loading}
                        text="Ajouter un utilsateur"
                    />
                </div>
            </div>
        )
    }
}

export default AddUser
