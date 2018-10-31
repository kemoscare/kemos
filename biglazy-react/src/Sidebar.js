import React, { Component } from 'react';
import { Tree, Button, Intent, Classes, InputGroup } from '@blueprintjs/core';
import { hasPermission } from './authentication'
import './Sidebar.css'

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
        this.shouldRenderLastInserted = true
        this.state = {}
    }


    onNodeClick = (node, mouseEvent) => {
        const { actionFunc } = this.props
        this.forEachNode(this.props.contentTree, (node) => node.isSelected = false)

        if(node.category === "protocol") {
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

    selectChemo(nodes, id) {
        if(nodes == null) return
        for(const node of nodes) {
            if(node.id === id) {
                node.isSelected = true
                return true
            }
            if(this.selectChemo(node.childNodes, id) == true) {
                node.isExpanded = true
                return true
            }
        }
    }

    checkId(id) {
        if(id === this.lastInsertedId) { 
            return false 
        } else { 
            this.lastInsertedId = id
            return true
        }
    }


    render() {

        const { contentTree, reset, shouldSelect, namesLoading } = this.props
        if(shouldSelect && this.checkId(shouldSelect)) {
            this.selectChemo(contentTree, shouldSelect)
        }

        if(namesLoading) {
            return (
            <div className="Sidebar bp3-dark">
                <div className='Searchbar'>
                { hasPermission('admin', this.props.user) && <Button className="add-button" intent={Intent.SUCCESS} large={true} icon="plus" onClick={() => reset()}>Ajouter</Button> }
                </div>
                <p className={Classes.SKELETON}>Lorem Ipsum</p>
                <p className={Classes.SKELETON}>Lorem Ipsum</p>
                <p className={Classes.SKELETON}>Lorem Ipsum</p>
                <p className={Classes.SKELETON}>Lorem Ipsum</p>
            </div>
            )
        } else {
            return (
                <div className="Sidebar bp3-dark">
                    <div className='Searchbar'>
                        <InputGroup large leftIcon="search" placeholder="Recherche..." />
                    </div>
                    <Tree contents={contentTree} onNodeCollapse={this.onCollapse} onNodeExpand={this.onExpand} onNodeClick={this.onNodeClick} />
                </div>
            )
        }

    }
}
export default Sidebar;