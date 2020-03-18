import { combineReducers } from 'redux'
import { formInitialState } from '../panes/Form'
import {
    SUBMIT_PROTOCOL,
    ADD_FORM_ELEMENT,
    DELETE_FORM_ELEMENT,
    INPUT_CHANGED, RADIO_CHANGED, SELECT_CHANGED, CHECKBOX_CHANGED, DATE_CHANGED
} from '../actions/form'
import { RECEIVED_PROTOCOL } from '../actions/actions'
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
    if (formName !== reducerName && !isInitializationCall && !isCompatibleAction) return state
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
        switch(action.type) {
            case INPUT_CHANGED:
            case RADIO_CHANGED:
            case SELECT_CHANGED:
                return {
                    ...state,
                    [field.name]: field.value
                }
                break
            case CHECKBOX_CHANGED:
                const value = state[field.name]
                return {
                    ...state,
                    [field.name]: !value
                }
                break
            case DATE_CHANGED:
                return {
                    ...state,
                    [field.name]: field.value
                }
                break
            default:
                return state
                break
        }
    }
/*
 * A reducer that can handle a formReducer array of element with
 * @params {state} The initial array state.
 * @params {function} reducer the reducer to apply to each element of the array
 * @params {object} action The action to pass down to reducers, must contain an `id` key.
 * @returns {object} the newly reduced state
 */
export const formArrayReducer = (state, action) => {
    switch(action.type) {
        case ADD_FORM_ELEMENT:
            // Sets a new Id for the new form object by looking at the id of last object

            const { formState } = action
            const newFormState = {...formState, id: action.uuid}
            return [...state, newFormState]

        case DELETE_FORM_ELEMENT:
            const { element } = action
            const idToDelete = element.id
            return state.filter(
                element => element.id != idToDelete
            )
        case INPUT_CHANGED:
        case RADIO_CHANGED:
        case SELECT_CHANGED:
        case CHECKBOX_CHANGED:
        case DATE_CHANGED:
            const idToChange = action.fieldId
            console.log(state)
            return state.map(e => e.id === idToChange ? field(e, action) : e)
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
export const editForm = (state=formInitialState, action) => {
    switch(action.type) {
        case RECEIVED_PROTOCOL:
            const { formData } = action
            const days = formData.days.map((day, key) => { return { ...day, id: uuid() }})
            return {
                protocol: formData,
                //Creates new arrays with key values inside object.
                evaluations: formData.evaluations.map((evaluation, key) => { return {...evaluation, id: uuid()}}),
                days: days,
                products: extractProducts(days)
            }
            break
        default:
            //needs a compatible action (e.g. has `formName` property)
            if(action.formName === undefined) return state
            switch(action.formName) {
                case 'protocol':
                    return { ...state, protocol: createNamedWrapperReducer(field, 'protocol')(state.protocol, action) }
                case 'evaluations':
                    return { ...state, evaluations: createNamedWrapperReducer(formArrayReducer, 'evaluations')(state.evaluations, action)}
                case 'days':
                    return { 
                        ...state, 
                        days: createNamedWrapperReducer(formArrayReducer, 'days')(state.days, action),
                        products: createNamedWrapperReducer(products, 'products')(state.products, action)
                    }
                case 'products':
                    return { ...state, products: createNamedWrapperReducer(products, 'products')(state.products, action) }
                default:
                    return state
            }
    }
}
