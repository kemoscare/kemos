import { RECEIVED_PROTOCOL } from '../actions/actions'
import { calculatePlanning } from '../panes/calculatePlanning'
import { formArrayReducer, field, createNamedWrapperReducer } from './form'
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

const planInitialState = {
    protocol: {},
    md: "",
    diagnosis: "",
    startDate: moment(new Date()),
    dates: [
        { date: {} }
    ]
} 

const planWrapperReducer = (reducer) => createNamedWrapperReducer(reducer, 'plan')
const datesPlanWrapperReducer = (reducer) => createNamedWrapperReducer(reducer, 'datesPlan')

export const plan = (state=planInitialState, action) => {
    switch(action.type) {
        case RECEIVED_PROTOCOL:
            const receivedProtocol = action.formData
            return {
                ...state,
                protocol: receivedProtocol,
                dates: calculatePlanning(receivedProtocol, state.startDate, false)
            }
        default:
            switch(action.formName) {
                case 'plan':
                    const { name } = action.field
                    if(name === 'startDate') {
                        const newState = planWrapperReducer(field)(state, action)
                        return {
                            ...newState,
                            dates: calculatePlanning(state.protocol, newState.startDate, false)
                        }
                    } else {
                        return {
                            ...state,
                            ...planWrapperReducer(field)(state, action)
                        }
                    }
                case 'datesPlan':
                    return {
                        ...state,
                        dates: datesPlanWrapperReducer(formArrayReducer)(state.dates, action)
                    }
                default:
                    return state
            }
    }
}

