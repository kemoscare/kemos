import React, { Component } from 'react'

import { Tabs, Tab } from '@blueprintjs/core'
import Preview from './panes/Preview'
import Form from './panes/Form'
import PPS from './panes/PPS'

const Patient = () => {
    return "patient"
}

class Panes extends Component {

    render() {
        const { formContent, submit, chemoLoading, sendingChemoLoading, newChemo } = this.props;
        return (
            <Tabs id="TabsExample" onChange={this.handleTabChange} large={true} defaultSelectedTabId="pps">
                <Tab id="apercu" title="Aperçu" disabled={newChemo} loading={chemoLoading} panel={newChemo ? "" : <Preview protocol={formContent} loading={chemoLoading} />} />
                <Tab id="pps" title="PPS" disabled={newChemo} loading={chemoLoading} panel={newChemo ? "" : <PPS protocol={formContent} chemoLoading={chemoLoading}/>} />
                <Tab id="patient" title="Patient" disabled={newChemo} panel={newChemo ? "" : <Patient />} loading={chemoLoading}/>
                <Tab id="infirmerie" title="Infirmerie" disabled={true} loading={chemoLoading}/>
                <Tab id="medecin" title="Médecin" disabled={true} loading={chemoLoading}/>
                <Tab id="modifier" title="Modifier" panel={<Form formContent={formContent} chemoLoading={chemoLoading} sendingChemoLoading={sendingChemoLoading} onSubmit={submit}/>}/>
            </Tabs>
        )
    }
}

export default Panes