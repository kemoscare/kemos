import { sidebar } from './sidebar'
import { editForm, protocol } from './form'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
    sidebar,
    editForm,
    protocol
})
