import React, { Component } from 'react';
import {TreeBranch, TreeNode} from './Treenode'
import Searchbar from './Searchbar'
import { Tree, Button, Intent } from '@blueprintjs/core';

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
        this.state = {}
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

    onNodeClick = (node, mouseEvent) => {
        const { actionFunc } = this.props
        this.forEachNode(this.props.contentTree, (node) => node.isSelected = false)

        if(node.category == "protocol") {
            console.log(node.id)
            node.isSelected = true
            this.setState(this.state)
            actionFunc(node.id)
        } else if(node.isExpanded == true) {
            this.onCollapse(node, mouseEvent)
        } else {

            this.onExpand(node, mouseEvent)
        }
    }

    onCollapse = (node, mouseEvent) => {
        node.isExpanded = false
        node.isSelected = false

        this.setState(this.state)
        
    }

    onExpand = (node, mouseEvent) => {
        node.isExpanded = true
        node.isSelected = true
        this.setState(this.state)
    }

    forEachNode(nodes, callback) {
        if (nodes == null) {
            return;
        }

        for (const node of nodes) {
            callback(node);
            this.forEachNode(node.childNodes, callback);
        }
    }


    render() {

        const { contentTree, reset } = this.props
        return (
            <div className="Sidebar bp3-dark">
                <div className='Searchbar'>
                    <Button className="add-button" intent={Intent.SUCCESS} large={true} icon="plus" onClick={() => reset()}>Ajouter</Button>
                </div>
                <Tree contents={contentTree} onNodeCollapse={this.onCollapse} onNodeExpand={this.onExpand} onNodeClick={this.onNodeClick} />
            </div>
        )
    }
}
export default Sidebar;