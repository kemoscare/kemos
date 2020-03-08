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
import { daysInitialState } from '../reducers/days'
import { evaluationsInitialState } from './FormComponents/EvaluationForm'
import { connect } from 'react-redux'

export const formInitialState = {
    loading: false,
    protocol: protocolInitialState,
    evaluations: evaluationsInitialState,
    days: daysInitialState,
    products: {}
}

class Form extends Component {
    render() {
        const { protocol, evaluations, days, dispatch, loading } = this.props
        return (
            <AddProtocolForm { ...this.props}/>
        )
    }
}
function productsInDays(products, days) {
    return days.map(day => { return { ...day, products: products[day.id]}})
}

function mapStateToProps(state, ownProps) {
    const { protocol, evaluations, days, loading, products } = state.editForm
    const restoredDays = productsInDays(products, days)

    return {
        protocol,
        evaluations,
        days: restoredDays,
        loading
    }
}

export default connect(mapStateToProps)(Form)



