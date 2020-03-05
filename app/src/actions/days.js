import { addFormElement, deleteFormElement, inputChagned, radioChanged } from './form'

export const dayInitialState = {id: 0, day: "1-8", products: [], careGalenic: "PerOs", careMode: "Admission"}
export const daysInitialState = [dayInitialState]

export const addDay = () => addFormElement('days', dayInitialState)
export const deleteDay = (day) => deleteFormElement('days', day)

export const dayInputChanged = (event, day) => inputChanged('days', event, day.id)
export const dayRadioChanged = (event, day) => radioChanged('days', event, day.id)
