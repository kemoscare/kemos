import React, { Component } from 'react';
import {TreeBranch, TreeNode} from './Treenode'
import Searchbar from './Searchbar'
import { Tree } from '@blueprintjs/core';

// const ApiListComponent = (category, items, itemClicked) => {
//     const apiItems = items.map((item, index) => {
//         (
//             <li key={index} onClick={() => itemClicked({category: category, item: item}) }>{item._id}
//             { if(items[item]) { }
//                 <ApiListComponent items = {items[item]} itemClicked={itemClicked}/>
//             { } }
//             </li>
//         )
//     })
//     return (
//         <ul className="themes">
//             {themeItems}
//             <ApiListComponent items={items[item]} itemClicked={itemClicked} category={category}/>
//         </ul>
//     )
// }

class Sidebar extends Component {

    constructor() {
        super()
        this.state = {
            contentTree: []
        }
    }

    // themeClicked = (theme) => {
    //     this.fetchOrgans(theme)
    // }

    // fetchOrgans(theme) {
    //     fetch("http://localhost:8080/biglazy/organ?theme="+theme)
    //         .then(response => response.json())
    //         .then(response => this.setState({themes: themes[theme] = response}))
    //         .then(response => console.log(response))
    // }

    componentDidMount() {
        this.fetchNames()
    }

    workTree(tree) {

    }

    fetchNames() {
        fetch("http://localhost:3001/protocols/names/")
            .then(response => response.json())
            .then(json => this.setState({contentTree: json}))
            .then(json => console.log(json))
    }

    onNodeClick = (node, mouseEvent) => {
        const { actionFunc } = this.props
        if(node.category == "protocol") {
            console.log(node.id)
            actionFunc(node.id)
        } else if(node.isExpanded == true) {
            this.onCollapse(node, mouseEvent)
        } else {
            this.onExpand(node, mouseEvent)
        }
    }

    onCollapse = (node, mouseEvent) => {
        node.isExpanded = false
        this.setState(this.state)
        
    }

    onExpand = (node, mouseEvent) => {
        node.isExpanded = true
        this.setState(this.state)
    }


    render() {

        const { contentTree } = this.state
        return (
            <div className="Sidebar bp3-dark">
                <Tree contents={contentTree} onNodeCollapse={this.onCollapse} onNodeExpand={this.onExpand} onNodeClick={this.onNodeClick} />
            </div>
        )
    }
}
export default Sidebar;