import React, { Component } from 'react'

import { Tabs, Tab } from '@blueprintjs/core'
import Preview from './panes/Preview'
import Form from './panes/Form'
import PPS from './panes/PPS'
import { hasPermission } from './authentication'
import './Tabs.css'

const Patient = () => {
    return 'patient'
}

class Panes extends Component {
    constructor() {
        super()
        this.state = {
            selectedTabId: 'apercu',
        }
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.newChemo == true &&
            this.props.newChemo != prevProps.newChemo
        ) {
            this.setState({ selectedTabId: 'modifier' })
        }
    }

    handleTabChange = tabName => {
        this.setState({ selectedTabId: tabName })
    }

    render() {
        let {
            formContent,
            submit,
            chemoLoading,
            sendingChemoLoading,
            newChemo,
            pps,
            nonIdeal,
        } = this.props
        const { selectedTabId } = this.state
        return (
            <div className="tabs-box">
                <Tabs
                    className="form-component"
                    id="TabsExample"
                    onChange={this.handleTabChange}
                    large={true}
                    selectedTabId={selectedTabId}
                >
                    <Tab
                        id="apercu"
                        title="Protocole"
                        disabled={newChemo}
                        loading={chemoLoading}
                        panel={
                            newChemo ? (
                                ''
                            ) : (
                                <Preview
                                    protocol={formContent}
                                    loading={chemoLoading}
                                    nonIdeal={nonIdeal}
                                />
                            )
                        }
                    />
                    <Tab
                        id="pps"
                        title="PPS"
                        disabled={newChemo}
                        loading={chemoLoading}
                        panel={
                            newChemo ? (
                                ''
                            ) : (
                                <PPS
                                    protocol={formContent}
                                    chemoLoading={chemoLoading}
                                    pps={pps}
                                    nonIdeal={nonIdeal}
                                />
                            )
                        }
                    />
                    <Tab
                        id="patient"
                        title="Patient"
                        disabled={newChemo}
                        panel={newChemo ? '' : <Patient />}
                        loading={chemoLoading}
                        nonIdeal={nonIdeal}
                    />
                    {hasPermission(
                        ['admin', 'add-protocol'],
                        this.props.user
                    ) && (
                        <Tab
                            id="modifier"
                            title="Modifier"
                            panel={
                                <Form
                                    formContent={formContent}
                                    chemoLoading={chemoLoading}
                                    sendingChemoLoading={sendingChemoLoading}
                                    onSubmit={submit}
                                />
                            }
                        />
                    )}
                </Tabs>
            </div>
        )
    }
}

export default Panes
