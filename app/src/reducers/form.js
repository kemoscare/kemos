import { combineReducers } from 'redux'
import { formInitialState } from '../panes/Form'
import {
    PRODUCT_CHANGED,
    ADD_FORM_ELEMENT,
    DELETE_FORM_ELEMENT,
    INPUT_CHANGED,
    RADIO_CHANGED,
    SELECT_CHANGED,
    CHECKBOX_CHANGED,
    DATE_CHANGED,
    REQUEST_EDITFORM_SUBMISSION,
    RECEIVED_EDITFORM_SUBMISSION,
} from '../actions/form'
import { RECEIVED_PROTOCOL, SHOW_NEW_PROTOCOL_FORM } from '../actions/actions'
import { products, extractProducts } from './products'
import { v4 as uuid } from 'uuid'

/*
 * inpired from https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic/#customizing-behavior-with-higher-order-reducers
 * @params {function} reducerFunction The reducer to adapt according to reducerName
 * @params {string} reducerName The name to reduce
 * @returns {function} The reducer according to the proper reducerName
 */
export function createNamedWrapperReducer(reducerFunction, reducerName) {
    /*
     * The reducer returned by createNamedWrapperReducer(reducerFunction, reducerName)`
     * @params {object} state The initial state, should be a slice of the initial state, and should, by convention
     * be named after the reducerName.
     * @params {action} action The action to reduce, must contain a `formName` property
     * @returns {function} The reducer adapted to the reducerName.
     */
    return (state, action) => {
        const { formName } = action
        const isInitializationCall = state === undefined
        const isCompatibleAction = formName !== undefined
        if (
            formName !== reducerName &&
            !isInitializationCall &&
            !isCompatibleAction
        )
            return state
        return reducerFunction(state, action)
    }
}
/*
 * A reducer that takes as input a form and returns the modified field corresponding to it.
 * @param {object} state The form or subform.
 * @param {action} action The action of type : INPUT_CHANGED / RADIO_CHANGED / SELECT_CHANGED / CHECKBOX_CHANGED.
 * @returns {object} The new state with the field modified accordingly.
 */
export const field = (state, action) => {
    const { field } = action
    switch (action.type) {
        case INPUT_CHANGED:
        case RADIO_CHANGED:
        case SELECT_CHANGED:
            return {
                ...state,
                [field.name]: field.value,
            }
            break
        case CHECKBOX_CHANGED:
            const value = state[field.name]
            return {
                ...state,
                [field.name]: !value,
            }
            break
            return {
                ...state,
                [field.name]: field.value,
            }
            break
        case PRODUCT_CHANGED:
            return {
                ...state,
                value: action.product.value,
            }
        default:
            return state
            break
    }
}
/*
 * A reducer that can handle a formReducer array of element with
 * NEEDS REFACTORING : refactor to return a generic reducer that takes a field/other type of reducer as a parameter
 * @params {state} The initial array state.
 * @params {function} reducer the reducer to apply to each element of the array
 * @params {object} action The action to pass down to reducers, must contain an `id` key.
 * @returns {object} the newly reduced state
 */
export const formArrayReducer = (state, action) => {
    switch (action.type) {
        case ADD_FORM_ELEMENT:
            // Sets a new Id for the new form object by looking at the id of last object

            const { formState } = action
            const newFormState = { ...formState, id: action.uuid }
            if(action.dayId) {
                return {
                    ...state,
                    [action.dayId]: [...state[action.dayId], newFormState]
                }
            } else {
                return [...state, newFormState]
            }

        case DELETE_FORM_ELEMENT:
            const { element } = action
            const idToDelete = element.id
            if(action.dayId) {
                return {
                    ...state,
                    [action.dayId]: state[action.dayId].filter(p => p.id != idToDelete)
                }
            } else {
                return state.filter(element => element.id != idToDelete)
            }
        case INPUT_CHANGED:
        case RADIO_CHANGED:
        case SELECT_CHANGED:
        case CHECKBOX_CHANGED:
        case DATE_CHANGED:
            const idToChange = action.fieldId
            return state.map(e => (e.id === idToChange ? field(e, action) : e))

        case PRODUCT_CHANGED:
            if (!action.dayId) return state
            const { dayId } = action
            const productIdToChange = action.product.id
            return {
                ...state,
                [dayId]: state[dayId].map(p =>
                    p.id === productIdToChange ? field(p, action) : p
                ),
            }

        default:
            return state
    }
}
/*
 * A reducer that handles editing of a form.
 * Actions :
 * @param state {object} The initial state being an empty formData
 * @param action {object} - RECEIVED_PROTOCOL
 *                          Handles populating the form with protocol data including days and evaluations
 *                        - All other actions containing a `formName` proprety will go through either a formArrayReducer or directly a fieldReducer
 */
export const editForm = (state = formInitialState, action) => {
    switch (action.type) {
        case REQUEST_EDITFORM_SUBMISSION:
            return {
                ...state,
                loading: true,
            }

        case RECEIVED_EDITFORM_SUBMISSION:
            return {
                ...state,
                loading: false,
            }
        case SHOW_NEW_PROTOCOL_FORM:
        case RECEIVED_PROTOCOL:
            const { protocol } = action
            const days = protocol.days.map((day, key) => {
                return { ...day, id: uuid() }
            })
            return {
                protocol: protocol,
                //Creates new arrays with key values inside object.
                evaluations: protocol.evaluations.map((evaluation, key) => {
                    return { ...evaluation, id: uuid() }
                }),
                days: days,
                products: extractProducts(days),
            }
            break

        default:
            //needs a compatible action (e.g. has `formName` property)
            if (action.formName === undefined) return state
            switch (action.formName) {
                case 'protocol':
                    return {
                        ...state,
                        protocol: createNamedWrapperReducer(field, 'protocol')(
                            state.protocol,
                            action
                        ),
                    }
                case 'evaluations':
                    return {
                        ...state,
                        evaluations: createNamedWrapperReducer(
                            formArrayReducer,
                            'evaluations'
                        )(state.evaluations, action),
                    }
                case 'days':
                    return {
                        ...state,
                        days: createNamedWrapperReducer(
                            formArrayReducer,
                            'days'
                        )(state.days, action),
                        products: createNamedWrapperReducer(
                            formArrayReducer,
                            'products'
                        )(state.products, action),
                    }
                case 'products':
                    return {
                        ...state,
                        products: createNamedWrapperReducer(
                            formArrayReducer,
                            'products'
                        )(state.products, action),
                    }
                default:
                    return state
            }
    }
}
