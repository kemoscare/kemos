export const RECEIVED_PROTOCOL = 'RECEIVED_PROTOCOL'

export function receivedProtocol(data) {
    return {
        type: RECEIVED_PROTOCOL,
        formData: data
    }
}
