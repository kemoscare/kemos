import content from './panes/selectContent'

export function makeHTTPString(username, password = '') {
    return new Headers({
        Authorization: `Basic ${btoa(username + ':' + password)}`,
    })
}

export function makeTokenHeaders(token) {
    if (!token) return new Headers({})
    return new Headers({
        Authorization: `Bearer ${token}`,
    })
}

export function mapLabel(node) {
    if (node.category === 'protocol') return node
    if (node.category === 'theme') {
        return {
            ...node,
            label: content['themes'].find(o => o.value === node.value).label,
        }
    } else if (node.category === 'organ') {
        return {
            ...node,
            label: content['organs'][node.parent].find(
                o => o.value === node.value
            ).label,
        }
    }
}

export function forEachNode(nodes, callback) {
    if (nodes == null) return
    for (const node of nodes) {
        callback(node)
        forEachNode(node.childNodes, callback)
    }
}
export function forEachNodeReturn(nodes, callback) {
    if (nodes == null) return
    for (const node of nodes) {
        callback(node)
        return forEachNode(node.childNodes, callback)
    }
}

export function search(query, initialTree) {
    let resultTree = []
    for (let node of initialTree) {
        if (node.category !== 'protocol') {
            let branch = search(query, node.childNodes)
            if (branch.length !== 0) {
                resultTree.push({ ...node, childNodes: branch })
            }
        } else {
            if (node.label.toLowerCase().includes(query.toLowerCase())) {
                resultTree.push(node)
            }
        }
    }
    return resultTree
}
