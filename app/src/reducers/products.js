import { RECEIVED_PROTOCOL } from './../actions/actions'
import { formArrayReducer } from './form'
import { ADD_FORM_ELEMENT, DELETE_FORM_ELEMENT } from '../actions/form'
import { v4 as uuid } from 'uuid'

export const productInitialState = {id: 0, value: ""}
export const productsInitialState = [productInitialState]

export function extractProducts(days) {

    const products = {}
    for(const day of days) {
        products[day.id] = day.products.map((product) => { return { value: product, id: uuid() }})
    }
    return products
}
export const products = (state = productsInitialState, action) => {
    const { formName } = action
    const { dayId } = action

    switch(action.type) {
        case ADD_FORM_ELEMENT:
            if(formName === "days") {
                return {
                    ...state,
                    [action.uuid]: productsInitialState
                }
            }
        case DELETE_FORM_ELEMENT:
            if(formName === "days") {
                const idToDelete = action.element.id
                const { [idToDelete]: deleted, ...newState} = state
                return newState
            }

        default:
            if(dayId === undefined) return state
            return {
                ...state,
                [action.dayId]: formArrayReducer(state[dayId], action)
            } 
    }

}
