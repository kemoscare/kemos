/*
 * AppReducer is the main reducer for the responding to :
 * - login actions
 * - back and forth actions with backend such as recording new protocols or else
 *   @param {object} state The initial state (see further)
 *   @param {object} action The action to respond to
 *   @returns {object} Reduced state
 */
const initialState = {}

export const app = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PROTOCOL:
            return state
        case RECEIVED_PROTOCOL:
            return state
        default:
            return state
    }
}
