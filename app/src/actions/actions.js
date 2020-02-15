export const RECEIVED_PROTOCOL = 'RECEIVED_PROTOCOL'

export function receivedProtocol(data) {
    return {
        type: RECEIVED_PROTOCOL,
        formData: data
    }
}

export const REQUEST_PROTOCOL = 'REQUEST_PROTOCOL'

export function requestProtocol() {
    return {
        type: REQUEST_PROTOCOL
    }
}

export const SHOW_NEW_PROTOCOL_FORM = 'SHOW_NEW_PROTOCOL_FORM'

export function showNewProtocolForm() {
    return { 
        type: SHOW_NEW_PROTOCOL_FORM
    }
}
