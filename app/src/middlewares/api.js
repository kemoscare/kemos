const { server } = require('../api-' + process.env.NODE_ENV)

function makeQuery(route, params) {
    if (params === undefined) return route

    if (params.length === 1 && typeof params[0] !== 'object') {
        return route + params[0]
    }
    //TODO: handle named parameters such as : resource?param1=value1&param2=value2
    //from an array of [{param: value}]
}
/**
 * Generates an action named after the resource parameter as such :
 * `RECEIVED_{resouce}`
 * @param {string} resource The resource name, usually the one responsible for the request
 * @param {Object} payload The payload from the server's response.
 * @example const generatedAction =
 * {
 *     type: 'RECEIVED_USERS'
 *     users: {usersObject}
 * }
 */
function receivedActionCreator(resource, payload) {
    return {
        type: 'RECEIVED_' + resource,
        [resource.toLowerCase()]: payload,
    }
}

/**
 * Handles API requests to `server`, makes the request and returns an action with
 * a `RECEIVED_` prefix and a payload named as the resource requested. Throw an
 * error by dispatching an error action located in the REQUEST_ action.
 * @param {string} action Handle all actions that start with the `REQUEST_` prefix
 */
export const api = store => next => action => {
    let [request, resource] = action.type.split('_')

    if (request !== 'REQUEST') return next(action)
    const { route, headers, error, method, body, params } = action
    let queryNoParams = route ? route : resource.toLowerCase() + 's' + '/'
    const query = makeQuery(queryNoParams, params)

    fetch(server + query, {
        method,
        headers,
        body,
    })
        .then(response => (response.ok ? response.json() : Promise.reject()))
        .then(json => store.dispatch(receivedActionCreator(resource, json)))
        .catch(e => store.dispatch(error))

    return next(action)
}
