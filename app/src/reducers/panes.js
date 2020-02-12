import { TAB_CHANGED } from '../actions/panes'
import { SHOW_NEW_PROTOCOL_FORM } from '../actions/actions'

const panesInitialState = {
    selectedTab: "apercu"
}

export const panes = (state = panesInitialState, action) => {
    switch(action.type) {
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
