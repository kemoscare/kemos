import { v4 as uuid } from 'uuid'
import moment from 'moment'

const api = require('../api-'+process.env.NODE_ENV)

export function uniqueName(name, formElement) {
    return name + uniqueString + formElement.id
}

function deUniqueName(uniqueName) {
    return uniqueName.split(uniqueString)[0]
}
export const SUBMIT_PROTOCOL = 'SUBMIT_PROTOCOL'

export function submitProtocol(formEdit) {
    return {
        type: SUBMIT_PROTOCOL,
        formEdit
    }
}

export const INPUT_CHANGED = 'INPUT_CHANGED'

export function inputChanged(formName, event, fieldId = 0) {
    const field = {
        name: deUniqueName(event.target.name),
        value: event.target.value
    }
    return {
        type: INPUT_CHANGED,
        fieldId,
        formName,
        field
    }
}

export const SELECT_CHANGED = 'SELECT_CHANGED'

export function selectChanged(formName, event, fieldId = 0) {
    const field = {
        name: deUniqueName(event.target.name),
        value: event.target.value
    }
    return {
        type: SELECT_CHANGED,
        fieldId,
        formName,
        field
    }
}


export const RADIO_CHANGED = 'RADIO_CHANGED'

export function radioChanged(formName, event, fieldId = 0) {
    const field = {
        name: deUniqueName(event.target.name),
        value: event.target.value
    }
    return {
        type: RADIO_CHANGED,
        fieldId,
        formName,
        field
    }
}

export const CHECKBOX_CHANGED = 'CHECKBOX_CHANGED'

export function checkboxChanged(formName, event, fieldId = 0) {
    const field = {
        name: deUniqueName(event.target.name),
        value: event.target.value
    }
    
    return {
        type: CHECKBOX_CHANGED,
        fieldId,
        formName,
        field
    }
}

export const DATE_CHANGED = 'DATE_CHANGED'

export function dateChanged(formName, fieldName, date, fieldId = 0) {
    const field = {
        name: fieldName,
        value: moment(date)
    }

    return {
        type: DATE_CHANGED,
        fieldId,
        formName,
        field
    }
}

export const ADD_FORM_ELEMENT = 'ADD_FORM_ELEMENT'

export function addFormElement(formName, formState) {
    return {
        uuid: uuid(),
        type: ADD_FORM_ELEMENT,
        formName,
        formState
    }
}
        
export const DELETE_FORM_ELEMENT = 'DELETE_FORM_ELEMENT'

export function deleteFormElement(formName, element) {
    return {
        type: DELETE_FORM_ELEMENT,
        formName,
        element
    }
}

export const REQUEST_EDITFORM_SUBMISSION = 'REQUEST_EDITFORM_SUBMISSION'

export function requestSubmission() {
    return {
        type: REQUEST_EDITFORM_SUBMISSION,
        route: 'protocols/new'
    }
}

export const RECEIVED_EDITFORM_SUBMISSION = 'RECEIVED_EDITFORM_SUBMISSION'

export function receivedSubmission(json) {
    console.log(json)
    return { 
        type: RECEIVED_EDITFORM_SUBMISSION,
        id: json.id
    }
}

export function submitForm() {
    
    return function(dispatch) {
        const action = dispatch(requestSubmission())
        const url = api.server + action.route
        fetch(url, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${action.token}`      
              },
              body: JSON.stringify(action.protocol)
        })
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(json => dispatch(receivedSubmission(json)))
        .catch(error => console.log(error))
    }
}
const uniqueString = "___"
