import { RECEIVED_PROTOCOL, SUBMIT_PROTOCOL } from '../actions/actions'

/*
 * A reducer that handles data from the view, and shares it with the edit reducer for editing the form.
 * @param {object} state The initial state being completed viewForm
 * @param {object} action The action
 * @returns the new state containing view and edit,
 */
export const protocol = (state = {}, action) => {
    switch(action.type) {
        case RECEIVED_PROTOCOL:
            return {
                ...action.formData
            }
        default:
            return state
    }
}


