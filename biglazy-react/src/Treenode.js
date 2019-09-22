import React, { Component } from 'react'
import 'polyfill-array-includes'
const api = require('./api-' + process.env.NODE_ENV)

export class TreeNode extends Component {

    constructor() {
        super()
        this.state = { unfold: false }
    }

    nodeClicked = () => {

        const {nodeName, linksTo, linksFrom, resourceType} = this.props
        const url = api.server+linksTo+'s?'+resourceType + '=' + nodeName
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.resources.map(e => e._id).includes(null)) {
                    fetch(api.server + 'protocols?theme=' + nodeName)
                        .then(response => response.json())
                        .then(missing => this.setState({
                            treeBranch: data,
                            missing: missing,
                            unfold: true
                        }))
                } else {
                    this.setState({ treeBranch: data, unfold: true })
                }
            })
    }

    onClick = (nodeName) => {
        if(!this.state.unfold) {
            this.nodeClicked(nodeName)
        } else {
            this.setState({unfold: false})
        }
    }
    
    render(){
        const { nodeName, actionFunc, resourceType } = this.props
        const { unfold } = this.state
        if(unfold) {
            return (
                <div>
                <li className={resourceType} onClick={() => this.onClick()}>{nodeName}</li>
                <TreeBranch resourceType={this.state.treeBranch.resourceType}
                            linksTo={this.state.treeBranch.linksTo}
                            linksFrom={this.state.treeBranch.linksFrom}
                            resources={this.state.treeBranch.resources}
                            isFinal={this.state.treeBranch.isFinal}
                            actionFunc={actionFunc}
                            missing={this.state.missing}/>
                </div>
            )
        } else {
            return (
                <li className={resourceType} onClick={() => this.onClick()}>{nodeName}</li>
            )
        }
    }
}

export class TreeBranch extends Component {
    constructor() {
        super()
        this.state = {}

    }

    componentDidMount() {
        const { resourceType, resources } = this.props
        if(resources.includes(null)) {
            this.fetchMissing(resourceType)
        }
    }

    render() {
        const { resourceType, linksTo, linksFrom, resources, isFinal, actionFunc, missing } = this.props
        let missingNodes = []
        if(missing) {
            missingNodes = missing.resources.map(node => <li key={node.hexId} className={linksTo} onClick={() => actionFunc(node.hexId)}>{node.name}</li>)
        }
        const treeNodes = resources.map((node) => {
            if(isFinal) {
                return (<li key={node.hexId} className={resourceType} onClick={() => actionFunc(node.hexId)}>{node.name}</li>)
            } else {
                if(node._id) {
                    return (<TreeNode key={node.hexId} nodeName={node._id} 
                        resourceType={resourceType} 
                        linksTo={linksTo}
                        linksFrom={linksFrom}
                        actionFunc={actionFunc} />)
                }
            }     
        })
        return (
            <ul>
                {missingNodes}
                {treeNodes}
            </ul>
        )
    }
}
