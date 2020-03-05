import { sidebar } from './sidebar'
import { editForm } from './form'
import { protocol } from './protocol'
import { panes } from './panes'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    sidebar,
    editForm,
    protocol,
    panes,
})
