import React, { Component } from 'react'

import { Tabs, Tab } from '@blueprintjs/core'
import Preview from './panes/Preview'
import FormIOForm from './panes/FormIOForm'

const Patient = () => {
    return "patient"
}

class Panes extends Component {

    // formSubmit = (event, payload) => {
    //     event.preventDefault()
    //     console.log("here)")
    // }

    render() {
        const { selectedProtocol, submit, loading, newChemo } = this.props;

        const panes = [
        <Tab id="apercu" title="Aperçu" disabled={newChemo} panel={newChemo ? "" : <Preview protocol={selectedProtocol} loading={loading} />} />,
        <Tab id="patient" title="Patient" disabled={newChemo} panel={newChemo ? "" : <Patient />} loading={loading}/>,
        <Tab id="infirmerie" title="Infirmerie" disabled={true} loading={loading}/>,
        <Tab id="medecin" title="Médecin" disabled={true} loading={loading}/>,
        <Tab id="modifier" title="Modifier" panel={<FormIOForm onSubmit={submit} submission={selectedProtocol} loading={loading}/>}/>
        ]
        return (
            <Tabs id="TabsExample" onChange={this.handleTabChange} large={true} defaultSelectedTabId="modifier">
                {panes}
            </Tabs>
        )
    }
}

export default Panes