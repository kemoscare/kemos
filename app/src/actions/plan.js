import { inputChanged, dateChanged } from './form'

export const planInputChanged = (event, fieldId) =>
    inputChanged('plan', event, fieldId)
export const planDateInputChanged = (fieldName, date, fieldId) =>
    dateChanged('plan', fieldName, date, fieldId)
export const datesPlanDateInputChanged = (fieldName, date, fieldId) =>
    dateChanged('datesPlan', fieldName, date, fieldId)
