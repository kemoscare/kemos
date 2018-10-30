import React, { Component } from 'react'
import {
    FormGroup, InputGroup, Button, Intent, HTMLSelect, H4
} from '@blueprintjs/core';
import MultiSelect from './MultiSelect'
import './AddUser.css'
import subscribe from './roles'
import themes from './panes/selectContent'
import {makeTokenHeaders} from './utils'
import { DISCONNECTED } from './flashes';
import Logo from './Logo';
const api = require('./api-' + process.env.NODE_ENV)



class AddUser extends Component {

    constructor() {
        super()

        this.DEFAULT = {
            role: "Interne"
        }

        this.state = {
            rights: subscribe.rights.map((right, index) => { return {name: right, isSelected: false, key: index}}),
            accessibleThemes: themes.themes.map((theme, index) => { return {name: {label: theme.value, value: theme.value}, isSelected: false, key: index}}),
            user: this.DEFAULT,
            loading: false
        }
        this.setState(this.state)
    }

    DEFAULT = {
        role: "Interne"
    }

    handleInputChange = (event) => {
        this.state.user[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleSubmit = (event) => {
        let { user } = this.state
        console.log(sessionStorage.token)
        this.setState({loading: true})
        fetch(api.server + 'users/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${btoa(sessionStorage.token)}`
            },
            body: JSON.stringify(this.state.user)
          }).then(response => response.ok ? response.json() : Promise.reject(response))
            .then(json => {
              const f = () => { 
                this.setState({loading: false})
                console.log(json)
              }
              setTimeout(f, 1000)
          })
          .catch(response => this.props.handleDisconnection(DISCONNECTED))
    }
    

    render() {
        const { user } = this.state
        return (
            <div className="monoPageWrapper">
                <div className="addUser">
                    <Logo />
                    <H4>Ajouter un utilisateur</H4>
                    <FormGroup label="E-mail" label-for="email">
                        <InputGroup id="email" name="email" placeholder="email@chu-bordeaux.fr" onChange={this.handleInputChange} value={user.email}/>
                    </FormGroup>
                    <FormGroup label="Prenom" label-for="first_name">
                        <InputGroup id="first_name" name="first_name" placeholder="Jean" onChange={this.handleInputChange} value={user.firstname} />
                    </FormGroup>
                    <FormGroup label="Nom" label-for="last_name">
                        <InputGroup id="last_name" name="last_name" placeholder="Dupond" onChange={this.handleInputChange} value={user.surname} />
                    </FormGroup>
                    <FormGroup label="Qualité" label-for="role">
                        <HTMLSelect id="role" name="role" options={subscribe.roles.map(role => role.label)} onChange={this.handleInputChange} value={user.role.label} />
                    </FormGroup>
                    <FormGroup label="Droits" label-for="rights">
                        <MultiSelect name="rights" items={this.state.rights} selectedItemsChanged={(items) => user.rights = items} />
                    </FormGroup>
                    <FormGroup label="Thèmes accessibles" label-for="accessible-themes">
                        <MultiSelect name="accessible-themes" items={this.state.accessibleThemes} selectedItemsChanged={(items) => user.themes = items} />
                    </FormGroup>
                    <Button onClick={this.handleSubmit} 
                            intent={Intent.PRIMARY} 
                            loading={this.state.loading} 
                            text="Ajouter un utilsateur" />

                </div>
            </div>

        )
    }
}

export default AddUser