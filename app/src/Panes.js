import React from 'react'
import Form from './panes/Form'
import { changeTab } from './actions/panes'
import { connect } from 'react-redux'
import { Tabs, Tab } from '@blueprintjs/core'
import Preview from './panes/Preview'
import PropTypes from 'prop-types'
import Plan from './panes/Plan'
import './Tabs.css'

const Patient = () => (<p> Patient </p>)

const Panes = ({ selectedTab, loading, dispatch }) => (

        <div className="tabs-box">
            <Tabs className="form-component" id="TabsExample" onChange={(tabId) => dispatch(changeTab(tabId))} large={true} selectedTabId={selectedTab}>
                <Tab id="apercu" title="Protocole" panel={<Preview loading={loading}/>} />
                <Tab id="plan" title="PPS" panel={<Plan loading={loading}/>} />
                <Tab id="patient" title="Patient" panel={<Patient />} />
                <Tab id="modifier" title="Modifier" panel={<Form /> } />
            </Tabs>
        </div>
    )

function mapStateToProps(state, ownProps) {
    const { selectedTab, loading } = state.panes
    return { selectedTab, loading }
}

Panes.propTypes = {
    selectedTab: PropTypes.string,
    loading: PropTypes.boolean,
    dispatch: PropTypes.function
}

export default connect(mapStateToProps)(Panes)
