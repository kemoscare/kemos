import React, { Component } from 'react'
import {
    FormGroup, InputGroup, Button, Intent, HTMLSelect, H4
} from '@blueprintjs/core';
import MultiSelect from './MultiSelect'
import './AddUser.css'
import subscribe from './roles'
import themes from './panes/selectContent'
const api = require('./api-' + process.env.NODE_ENV)



class AddUser extends Component {

    constructor() {
        super()

        this.DEFAULT = {
            role: "Interne"
        }

        this.state = {
            rights: subscribe.rights.map((right, index) => { return {name: right, isSelected: false, key: index}}),
            accessibleThemes: themes.themes.map((theme, index) => { return {name: theme.value, isSelected: false, key: index}}),
            user: this.DEFAULT,
            loading: false
        }
        this.setState(this.state)
    }

    DEFAULT = {
        role: "Interne"
    }

    handleInputChange = (event) => {
        this.state[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleSubmit = (event) => {
        let { user } = this.state
        this.setState({loading: true})
        fetch(api.server + 'users/add', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.user)
          }).then(response => response.json())
            .then(json => {
              const f = () => { 
                this.setState({loading: false})
                
              }
              setTimeout(f, 1000)
          })
    }
    

    render() {
        const { user } = this.state
        return (
            <div className="monoPageWrapper">
                <div className="addUser">
                    <div className="center-title"><span className="KEMOS">KEMOS</span><span className="CARE">CARE</span></div>
                    <H4>Ajouter un utilisateur</H4>
                    <FormGroup label="E-mail" label-for="email">
                        <InputGroup id="email" name="email" placeholder="email@chu-bordeaux.fr" onChange={this.handleInputChange} value={user.email}/>
                    </FormGroup>
                    <FormGroup label="Prenom" label-for="email">
                        <InputGroup id="firstname" name="firstname" placeholder="Jean" onChange={this.handleInputChange} value={user.firstname} />
                    </FormGroup>
                    <FormGroup label="Nom" label-for="email">
                        <InputGroup id="surname" name="surname" placeholder="Dupond" onChange={this.handleInputChange} value={user.surname} />
                    </FormGroup>
                    <FormGroup label="Qualité" label-for="role">
                        <HTMLSelect id="role" name="role" options={subscribe.roles} onChange={this.handleInputChange} value={user.role} />
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