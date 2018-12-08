import React, { Component } from 'react';
import { Tree, Button, Intent, Classes, InputGroup } from '@blueprintjs/core';
import { hasPermission } from './authentication'
import {mapLabel, forEachNode, search} from './utils'
import content from './panes/selectContent'
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
        this.state = {
            filteredContent: [],
            query: "",
            timeOut: 0
        }
    }


    onNodeClick = (node, mouseEvent) => {
        const { actionFunc, contentTree } = this.props
        let { query, filteredContent } = this.state
        if(query === "") {
            forEachNode(contentTree, (node) => node.isSelected = false)
        } else {
            forEachNode(filteredContent, (node) => {
                node.isSelected = false;
            })
        }

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

    filter = (event) => {

        this.state.query = event.target.value
        if(this.state.timeOut) { clearTimeout(this.timeOut)}
        let tree = search(this.state.query, this.props.contentTree)
        this.state.filteredContent = tree

        this.state.timeOut = setTimeout(() => {
            forEachNode(this.state.filteredContent, (node) => node.isExpanded = true)
            this.setState(this.state)
        }, 500)
        this.setState(this.state)

    }

    render() {

        const { contentTree, reset, shouldSelect, namesLoading } = this.props
        const { filteredContent, query} = this.state

        if(shouldSelect && this.checkId(shouldSelect)) {
            this.selectChemo(contentTree, shouldSelect)
        }

        if(namesLoading) {
            return (
            <div className="Sidebar bp3-dark">
                <div className='Searchbar'>
                    <InputGroup large leftIcon="search" placeholder="Recherche..." />
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
                        <InputGroup large leftIcon="search" placeholder="Recherche..." onChange={this.filter}/>
                    </div>
                    <Tree contents={query === "" ? contentTree : filteredContent} onNodeCollapse={this.onCollapse} onNodeExpand={this.onExpand} onNodeClick={this.onNodeClick} />
                </div>
            )
        }

    }
}
export default Sidebar;