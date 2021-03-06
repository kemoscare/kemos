import React, { Component } from 'react'
import AddProtocolForm, {
    protocolInitialState,
} from './FormComponents/AddProtocolForm'
import { daysInitialState } from '../reducers/days'
import { evaluationsInitialState } from './FormComponents/EvaluationForm'
import { connect } from 'react-redux'

export const formInitialState = {
    loading: false,
    protocol: protocolInitialState,
    evaluations: evaluationsInitialState,
    days: daysInitialState,
    products: {},
}

class Form extends Component {
    render() {
        return <AddProtocolForm {...this.props} />
    }
}
function productsInDays(products, days) {
    return days.map(day => {
        return { ...day, products: products[day.id] }
    })
}

function mapStateToProps(state, ownProps) {
    const { protocol, evaluations, days, loading, products } = state.editForm
    //products are reinstated to days from redux store
    const restoredDays = productsInDays(products, days)

    return {
        protocol,
        evaluations,
        days: restoredDays,
        loading,
    }
}

export default connect(mapStateToProps)(Form)
