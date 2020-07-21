import { RECEIVED_PROTOCOL } from './../actions/actions'
import { RECEIVED_PRODUCTS } from './../actions/products'
import { formArrayReducer } from './form'
import { ADD_FORM_ELEMENT, DELETE_FORM_ELEMENT } from '../actions/form'
import { v4 as uuid } from 'uuid'

export const productInitialState = { id: 0, value: '' }
export const productsInitialState = [productInitialState]
/*
 * A helper function that takes a product from kemos' api and creates a flatten
 * model ordered by dayId, this function is called whenever a new protocol is received
 * through a RECEIVED_PROTOCOL action.
 * @params {array} days The array of days in a protocol
 * @returns {object} The flattened array of products ordered by days
 */
export function extractProducts(days) {
    const products = {}
    for (const day of days) {
        products[day.id] = day.products.map(product => {
            return { value: product, id: uuid() }
        })
    }
    return products
}
/*
 * A reducer that handles the state of products administered with days in the app
 * state.editForm.products = [
 *      dayId: { id: x, value: "product name" }
 *  ]
 * @params {object} state The productsInitialState
 * @params {object} action The action must contain a dayId property
 * @returns {object} The reduced state
 */
export const products = (state = productsInitialState, action) => {
    const { formName } = action
    const { dayId } = action

    switch (action.type) {
        case RECEIVED_PRODUCTS:
            return {
                products: action.products,
            }
        case ADD_FORM_ELEMENT:
            if (formName === 'days') {
                return {
                    ...state,
                    [action.uuid]: productsInitialState,
                }
            }
        case DELETE_FORM_ELEMENT:
            if (formName === 'days') {
                const idToDelete = action.element.id
                const { [idToDelete]: deleted, ...newState } = state
                return newState
            }

        default:
            if (dayId === undefined) return state
            return {
                ...state,
                [action.dayId]: formArrayReducer(state[dayId], action),
            }
    }
}
