
import content from './panes/selectContent'

export function makeHTTPString(username, password="") {
    return new Headers(
        {
            Authorization: `Basic ${btoa(username + ':' + password)}`
        }
    )
}

export function makeTokenHeaders(token) {
    return new Headers({
        Authorization: `Bearer ${token}`
    })
}

export function mapLabel(node) {
    if(node.category === 'protocol') return;
    if(node.category === 'theme') {
        node.label = content['themes'].find(o => o.value === node.value).label
    } else if(node.category === 'organ') {
        node.label = content['organs'][node.parent].find(o => o.value === node.value).label
    }
}

export function forEachNode(nodes, callback) {
    if (nodes == null) return;
    for (const node of nodes) {
        callback(node);
        forEachNode(node.childNodes, callback);
    }
}
export function forEachNodeReturn(nodes, callback) {
    if (nodes == null) return;
    for (const node of nodes) {
        callback(node);
        return forEachNode(node.childNodes, callback);
    }
}