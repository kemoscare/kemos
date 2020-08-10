export const REQUEST_PRODUCT = 'REQUEST_PRODUCT'

/*
 * Action creator to request all products from the api
 * @return {object} A REQUEST_PRODUCT action with no parameter or id telling
 * the api to return all products.
 */
export function requestAllProducts() {
    return {
        type: REQUEST_PRODUCT,
    }
}

export const RECEIVED_PRODUCT = 'RECEIVED_PRODUCT'

/*
 * `editForm` reducer related actions
 */
