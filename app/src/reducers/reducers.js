import { sidebar } from './sidebar'
import { editForm, protocol } from './form'
import { panes } from './panes'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    sidebar,
    editForm,
    protocol,
    panes
})
