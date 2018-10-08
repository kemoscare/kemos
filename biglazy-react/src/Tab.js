import React, { Component } from 'react'
import { Form } from 'react-formio'

import { Tab } from 'semantic-ui-react'
import formJSON from './form' 

class Panes extends Component {
    render() {

        const panes = [
        { menuItem: 'Aperçu', render: () => <Tab.Pane attached={false}>Un Aperçu de la chimio</Tab.Pane>},
        { menuItem: 'PPS', render: () => <Tab.Pane attached={false}>Ici le PPS</Tab.Pane>},
        { menuItem: 'Médecin', render: () => <Tab.Pane attached={false}>Ici une vue médecin</Tab.Pane>},
        { menuItem: 'Infirmerie', render: () => <Tab.Pane attached={false}>Ici une vue pour l'infirmerie</Tab.Pane>},
        { menuItem: 'Modifier', render: () => <Tab.Pane attached={false}><Form form={formJSON} onSubmit={this.submit} submission={this.props.chemotherapy} /></Tab.Pane> }
        
        ]
        return (
            <Tab menu={{ secondary: true, pointing: true}} panes={panes}/>
        )
        

    }
}

export default Panes