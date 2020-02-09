import React, { Component } from 'react'
import { FormGroup, 
         InputGroup, 
         HTMLSelect, 
         Radio, 
         RadioGroup, 
         ControlGroup, 
         Button,
         Intent,
         Divider,
         Classes,
         Checkbox
        } from '@blueprintjs/core'
import selectContent from './selectContent'
import DayForm from './FormComponents/DayForm'
import FormLoading from './FormLoading'
import AddProtocolForm, { protocolInitialState } from './FormComponents/AddProtocolForm'
import { daysInitialState } from './FormComponents/DayForm'
import { evaluationsInitialState } from './FormComponents/EvaluationForm'
import { connect } from 'react-redux'

console.log(evaluationsInitialState)
export const formInitialState = {
    loading: false,
    protocol: protocolInitialState,
    evaluations: evaluationsInitialState,
    days: daysInitialState
}


class Form extends Component {
    render() {
        const { protocol, evaluations, days, dispatch, loading } = this.props
        return (
            <AddProtocolForm protocol={protocol} days={days} evaluations={evaluations} dispatch={dispatch} loading={loading} />
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { protocol, evaluations, days, loading } = state.editForm
    return {
        protocol,
        evaluations,
        days,
        loading
    }
}

export default connect(mapStateToProps)(Form)



