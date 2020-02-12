import React from 'react'
import Form from './panes/Form'
import { changeTab } from './actions/panes'
import { connect } from 'react-redux'
import { Tabs, Tab } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import './Tabs.css'

const Patient = () => (<p> Patient </p>)
const PPS = () => (<p>PPS </p>)
const Preview = () => (<p>Apercu</p>)

const Panes = ({ selectedTab, dispatch }) => (

        <div className="tabs-box">
            <Tabs className="form-component" id="TabsExample" onChange={(tabId) => dispatch(changeTab(tabId))} large={true} selectedTabId={selectedTab}>
                <Tab id="apercu" title="Protocole" panel={<Preview />} />
                <Tab id="pps" title="PPS" panel={<PPS />} />
                <Tab id="patient" title="Patient" panel={<Patient />} />
                <Tab id="modifier" title="Modifier" panel={<Form /> } />
            </Tabs>
        </div>
    )

function mapStateToProps(state, ownProps) {
    const { selectedTab } = state
    console.log(selectedTab)
    return { selectedTab }
}

Panes.propTypes = {
    selectedTab: PropTypes.string,
    dispatch: PropTypes.function
}

export default connect(mapStateToProps)(Panes)
