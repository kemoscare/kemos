import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tree, Button, Intent, Classes, InputGroup } from '@blueprintjs/core'
import { hasPermission } from './authentication'
import {
    requestTree,
    nodeClicked,
    collapseNode,
    expandNode,
    keyTypedFilterTree,
    selectChemo,
} from './actions/sidebar'
import { requestProtocol } from './actions/actions'
import content from './panes/selectContent'
import SidebarLoading from './SidebarLoading'

import './Sidebar.css'

const api = require('./api-' + process.env.NODE_ENV)

class Sidebar extends Component {
    constructor() {
        super()
        this.shouldRenderLastInserted = true
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(requestTree())
    }

    checkId(id) {
        if (id === this.lastInsertedId) {
            return false
        } else {
            this.lastInsertedId = id
            return true
        }
    }

    render() {
        const {
            query,
            filteredContent,
            contentTree,
            reset,
            shouldSelect,
            isFetching,
            dispatch,
        } = this.props
        /*
        if(shouldSelect && this.checkId(shouldSelect)) {
            this.selectChemo(contentTree, shouldSelect)
        }
*/
        if (isFetching) {
            return <SidebarLoading />
        } else {
            return (
                <div className="Sidebar bp3-dark">
                    <div className="Searchbar">
                        <InputGroup
                            large
                            leftIcon="search"
                            placeholder="Recherche..."
                            onChange={event =>
                                dispatch(keyTypedFilterTree(event.target.value))
                            }
                        />
                    </div>
                    <Tree
                        contents={query === '' ? contentTree : filteredContent}
                        onNodeCollapse={node => dispatch(collapseNode(node))}
                        onNodeExpand={node => dispatch(expandNode(node))}
                        onNodeClick={node =>
                            node.category === 'protocol'
                                ? dispatch(requestProtocol(node.id))
                                : dispatch(nodeClicked(node))
                        }
                    />
                </div>
            )
        }
    }
}

function mapStateToProps(state, ownProps) {
    const { filteredContent, query, contentTree, isFetching } = state.sidebar
    return {
        filteredContent,
        query,
        contentTree,
        isFetching,
    }
}

export default connect(mapStateToProps)(Sidebar)
