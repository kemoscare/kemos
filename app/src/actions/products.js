import { addFormElement, inputChanged } from './form'
const api = require('../api-' + process.env.NODE_ENV)
import { makeTokenHeaders } from '../utils'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

export function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

export const RECEIVED_PRODUCTS = 'RECEIVED_PRODUCTS'

export function receivedProducts(products) {
    return {
        type: RECEIVED_PRODUCTS,
        products,
    }
}
