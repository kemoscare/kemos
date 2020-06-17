export const REQUEST_TREE = 'REQUEST_TREE'

export function requestTree(url) {
    return {
        type: REQUEST_TREE,
        url,
    }
}

export const RECEIVED_TREE = 'RECEIVED_TREE'

export function receivedTree(json) {
    return {
        type: RECEIVED_TREE,
        contentTree: json,
    }
}

export const EXPAND_NODE = 'EXPAND_NODE'

export function expandNode(node) {
    return {
        type: EXPAND_NODE,
        node,
    }
}

export const COLLAPSE_NODE = 'COLLAPSE_NODE'

export function collapseNode(node) {
    return {
        type: COLLAPSE_NODE,
        node,
    }
}

export const NODE_CLICKED = 'NODE_CLICKED'

export function nodeClicked(node) {
    return {
        type: NODE_CLICKED,
        node,
    }
}

export const FILTER_TREE = 'FILTER_TREE'

export function filterTree(query) {
    return {
        type: FILTER_TREE,
        query,
    }
}

export const KEY_TYPED = 'KEY_TYPED'

export function keyTyped(query) {
    return {
        type: KEY_TYPED,
        query,
    }
}

let timeout = ''
export function keyTypedFilterTree(query) {
    return function (dispatch) {
        dispatch(keyTyped(query))
        clearTimeout(timeout)
        timeout = setTimeout(() => dispatch(filterTree(query)), 500)
        return timeout
    }
}
import { makeTokenHeaders } from '../utils'

export function fetchTree(url) {
    return function (dispatch) {
        dispatch(requestTree(url))
        return fetch(url, {
            headers: makeTokenHeaders(sessionStorage.token),
        })
            .then(
                response => response.json(),
                error => console.log(error)
            )
            .then(json => dispatch(receivedTree(json)))
    }
}

export function selectChemo(node, selectFunc) {
    return function (dispatch) {
        if (node.category === 'protocol') {
            selectFunc(node.id)
        }
        dispatch(nodeClicked(node))
    }
}
