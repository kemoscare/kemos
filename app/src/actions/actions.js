import moment from 'moment'
import { formInitialState } from '../panes/Form'

export const RECEIVED_PROTOCOL = 'RECEIVED_PROTOCOL'


export const REQUEST_PROTOCOL = 'REQUEST_PROTOCOL'

export function requestProtocol(protocolId) {
    return {
        type: REQUEST_PROTOCOL,
        route: 'protocols/',
        params: [protocolId]
    }
}

export const SHOW_NEW_PROTOCOL_FORM = 'SHOW_NEW_PROTOCOL_FORM'

export function showNewProtocolForm() {
    return {
        type: SHOW_NEW_PROTOCOL_FORM,
        formData: formInitialState,
    }
}
