import { RECEIVED_PROTOCOL } from './../actions/actions'
import { formArrayReducer } from './form'

export const productInitialState = {id: 0, value: ""}
export const productsInitialState = [productInitialState]

export function extractProducts(days) {

    const products = {}
    for(const day of days) {
        products[day.id] = day.products.map((product, index) => { return { value: product, id: index }})
    }
    return products
}

export const products = (state = productsInitialState, action) => {
    const { dayId } = action
    if(dayId === undefined) return state
    switch(action.type) {
        default:
            return {
                ...state,
                [action.dayId]: formArrayReducer(state[dayId], action)
            } 
    }

}
