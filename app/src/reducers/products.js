import { RECEIVED_PROTOCOL } from './../actions/actions'
import { RECEIVED_PRODUCT } from './../actions/products'
import { formArrayReducer } from './form'
import { ADD_FORM_ELEMENT, DELETE_FORM_ELEMENT } from '../actions/form'
import { v4 as uuid } from 'uuid'

const productsInitialState = {
    allProducts: [{ name: '', productId: '' }],
}
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
        case RECEIVED_PRODUCT:
            return {
                ...state,
                allProducts: action.product.map(p => {
                    return { name: p['name'], productId: p['_id'] }
                }),
            }

        default:
            return state
    }
}
