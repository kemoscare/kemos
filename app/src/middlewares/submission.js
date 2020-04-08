import { actionPurpose } from './utils'

/* Middleware meant to reshape state for form submission to the server */
export const submission = store => next => action => {
    //the action should be a REQUEST to EDITFORM
    const purpose = actionPurpose(action)
    if(purpose[0] !== "REQUEST" && purpose[1] !== "EDITFORM") return next(action)
    const state = store.getState()
    const { editForm } = state

    let protocol = editForm.protocol
    protocol.evaluations = editForm.evaluations
    protocol.days = editForm.days.map(day => { return { ...day, products: editForm.products[day.id].map(p => p.value), id: null}})
    action.protocol = protocol
    return next(action)
}
