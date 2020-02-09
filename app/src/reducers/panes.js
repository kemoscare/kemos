import { TAB_CHANGED } from '../actions/panes'

const panesInitialState = {
    tabId = "apercu"
}

export const panes = (state = panesInitialState, action) => {
    switch(action.type) {
        case TAB_CHANGED:
            return {
                ...state,
                tabId: action.newTabId
            }
        case ADD_NEW_PROTOCOL:
            retrun {
                ...state,
                tabId: "modifier"
        default:
            return state
    }
}
