import React, { Component } from 'react'
import { Form } from 'react-formio'

import formJSON from './form' 
import { Tabs, Tab } from '@blueprintjs/core'
import Preview from './panes/Preview'


// Semantic UI
// class Panes extends Component {
//     render() {

//         const panes = [
//         { menuItem: 'Aperçu', render: () => <Tab.Pane attached={false}>Un Aperçu de la chimio</Tab.Pane>},
//         { menuItem: 'PPS', render: () => <Tab.Pane attached={false}>Ici le PPS</Tab.Pane>},
//         { menuItem: 'Médecin', render: () => <Tab.Pane attached={false}>Ici une vue médecin</Tab.Pane>},
//         { menuItem: 'Infirmerie', render: () => <Tab.Pane attached={false}>Ici une vue pour l'infirmerie</Tab.Pane>},
//         { menuItem: 'Modifier', render: () => <Tab.Pane attached={false}><Form form={formJSON} onSubmit={this.submit} submission={this.props.chemotherapy} /></Tab.Pane> }
        
//         ]
//         return (
//             <Tab menu={{ secondary: true, pointing: true}} panes={panes}/>
//         )
        

//     }
// }

const Patient = () => {
    return "patient"
}

class Panes extends Component {

    // formSubmit = (event, payload) => {
    //     event.preventDefault()
    //     console.log("here)")
    // }

    onSubmitDone = (objectt) => {
        
    }

    render() {
        const { selectedProtocol, submit } = this.props;

        const panes = [
        <Tab id="apercu" title="Aperçu" panel={<Preview protocol={selectedProtocol} />} />,
        <Tab id="patient" title="Patient" panel={<Patient />}/>,
        <Tab id="infirmerie" title="Infirmerie" disabled={true}/>,
        <Tab id="medecin" title="Médecin" disabled={true}/>,
        <Tab id="modifier" title="Modifier" panel={<Form form={formJSON} onSubmit={submit} submission={{data: selectedProtocol}} />}/>
        ]
        return (
            <Tabs id="TabsExample" onChange={this.handleTabChange} large={true} defaultSelectedTabId="modifier">
                {panes}
            </Tabs>
        )
    }
}

export default Panes