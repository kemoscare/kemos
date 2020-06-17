import {
    addFormElement,
    deleteFormElement,
    inputChanged,
    radioChanged,
} from './form'
import { dayInitialState } from '../reducers/days'

export const addDay = () => addFormElement('days', dayInitialState)
export const deleteDay = day => deleteFormElement('days', day)

export const dayInputChanged = (event, day) =>
    inputChanged('days', event, day.id)
export const dayRadioChanged = (event, day) =>
    radioChanged('days', event, day.id)
