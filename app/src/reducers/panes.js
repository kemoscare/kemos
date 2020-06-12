import { TAB_CHANGED } from '../actions/panes'
import { SHOW_NEW_PROTOCOL_FORM, REQUEST_PROTOCOL, RECEIVED_PROTOCOL } from '../actions/actions'


const panesInitialState = {
    selectedTab: "apercu",
    loading: "NON_IDEAL"
}
/*
 * Panes reducer
 * @param {object} state Initial state
 * @param {object} action The action can be TAB_CHANGED, a tab has changed / SHOW_NEW_PROTOCOL_FORM a new protocol is being created
 * @return {object} reduced state
 */
export const panes = (state = panesInitialState, action) => {
    switch(action.type) {
        case REQUEST_PROTOCOL:
            return {
                ...state,
                loading: "LOADING"
            }
        case RECEIVED_PROTOCOL:
            return {
                ...state,
                loading: "LOADED"
            }
        case TAB_CHANGED:
            return {
                ...state,
                selectedTab: action.newTabId
            }
        case SHOW_NEW_PROTOCOL_FORM:
            return {
                ...state,
                selectedTab: "modifier"
            }
        default:
            return state
    }
}
