import React from 'react'
import { Preview } from './panes/Preview'
import { PPS } from './panes/PPS'
import { Form } from './panes/Form'

export const Panes = ({dispatch}) => (

        <div className="tabs-box">
            <Tabs className="form-component" id="TabsExample" onChange={(tabId, prev) => dispatch(tabIdSelected(tabId))} large={true} selectedTabId={selectedTabId}>
                <Tab id="apercu" title="Protocole" panel={<Preview protocol={formContent} loading={chemoLoading} nonIdeal={nonIdeal} />} />
                <Tab id="pps" title="PPS" panel={<PPS protocol={formContent} />} />
                <Tab id="patient" title="Patient" panel={<Patient />} />
                <Tab id="modifier" title="Modifier" panel={<Form /> }/>}/>
            </Tabs>
        </div>
    )

