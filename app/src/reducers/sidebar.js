import { combineReducers } from 'redux'
import { mapLabel } from '../utils.js'
import { KEY_TYPED, RECEIVED_TREE, EXPAND_NODE, COLLAPSE_NODE, NODE_CLICKED, FILTER_TREE, REQUEST_TREE } from '../actions/sidebar'

function forEachNodes(nodes, action) {
   return nodes.map(n => { 
        if(n.childNodes === undefined) { 
            return node(n, action)
        } else {
            return node({
                ...n,
                childNodes: forEachNodes(n.childNodes, action)
            }, action)
        }
   })
}
function filterNodes(nodes, action) {
    let filteredNodes = []
    for(const n of nodes) {
        if(n.childNodes === undefined) {
            const reducedNode = node(n, action)
            if(reducedNode !== undefined) { filteredNodes.push(reducedNode)}
        } else {
            const childNodes = filterNodes(n.childNodes, action)
            if(childNodes.length > 0) {
                filteredNodes.push(
                    node({
                        ...n,
                        childNodes: childNodes
                    }, action)
                )
            }
        }
    }
    return filteredNodes
}
export const sidebar = (state = {
        contentTree: [],
        filteredContent: [],
        isFetching: false,
        query: "",
        timeOut: 0
    }, action) => {
    switch(action.type) {
        case RECEIVED_TREE:
            return {
                ...state,
                isFetching: false,
                contentTree: forEachNodes(action.contentTree, action),
                filteredContent: []
            }
            break
        case REQUEST_TREE:
            return {
                ...state,
                isFetching: true
            }
            break

        case KEY_TYPED:
            return {
                ...state,
                timeOut: true,
                filteredContent: forEachNodes(state.filteredContent, action)
            }
            break
        case FILTER_TREE:
            if(action.query === "") {
                return {...state, timeOut: false, query: "", filteredContent: []}
            } else {
                console.log(state.filteredContent.length === 0)
                return {
                    ...state,
                    timeOut: false,
                    query: action.query,
                    filteredContent: filterNodes(state.contentTree, action)
                }
            } 
            break
        case NODE_CLICKED:
        case EXPAND_NODE:
        case COLLAPSE_NODE:
            if(state.query === "") {
                return {
                    ...state,
                    contentTree: forEachNodes(state.contentTree, action)
                }
            } else {
                return {
                    ...state,
                    filteredContent: forEachNodes(state.filteredContent, action)
                }
            }
            break


        default:
            return state
    }
}

const node = (state = {
        id: "",
        isExpanded: false,
        isSelected: false
    }, action) => {
        switch(action.type) {
            case RECEIVED_TREE:
                /* sanitizes the tree */
                return {
                    ...mapLabel(state),
                    isSelected: false,
                    isExpanded: false,
                }
                break
            case KEY_TYPED:
                return {
                    ...state,
                    isExpanded: false
                }
                break
            case EXPAND_NODE:
                if(state.id === action.node.id) {
                    return {
                        ...state,
                        isExpanded: true,
                        isSelected: false
                    }
                } else {
                    return state
                }
                break
            case COLLAPSE_NODE:
                if(state.id === action.node.id) {
                    return {
                        ...state,
                        isExpanded: false,
                        isSelected: false
                    }
                } else {
                    return state
                }
                break
            case FILTER_TREE:
                if(state.category === "protocol") {
                    if(state.label.toLowerCase().includes(action.query.toLowerCase())) {
                        return state
                    }
                } else {
                    return {
                        ...state,
                        isExpanded: true
                    }
                }
                break
            case NODE_CLICKED:
                if(state.id === action.node.id) {
                    if(state.category === "protocol") {
                        return {
                            ...state,
                            isSelected: true
                        }
                    } else if(state.isExpanded === false) {
                        return {
                            ...state,
                            isSelected: false,
                            isExpanded: true,
                            }
                    } else {
                        return {
                            ...state,
                            isSelected: false,
                            isExpanded: false
                        }
                    }
                } else {
                    return {
                        ...state,
                        isSelected: false
                    }
                }
                break
            default:
                return state
        }
    } 

