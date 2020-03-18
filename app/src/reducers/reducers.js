import { sidebar } from './sidebar'
import { editForm } from './form'
import { protocol } from './protocol'
import { panes } from './panes'
import { plan } from './plan'
import { combineReducers } from 'redux'


export const rootReducer = combineReducers({
    sidebar,
    editForm,
    protocol,
    panes,
    plan
})
