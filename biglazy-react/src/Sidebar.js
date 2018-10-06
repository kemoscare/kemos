import React, { Component } from 'react';
import {TreeBranch, TreeNode} from './Treenode'
import Searchbar from './Searchbar'

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

    // fetchThemes() {
    //     fetch("http://localhost:8080/biglazy/themes")
    //       .then(response => response.json())
    //       .then(data => this.setState({ themes: response}))
    //       .then(data => console.log(themes))
    //   }

    render() {
        const { themeResponse, actionFunc, addChemo } = this.props
        if(themeResponse) {
            const { linksTo, linksFrom, resources, resourceType, isFinal } = themeResponse
            return (
                <div className="Sidebar">
                    <Searchbar />
                    {/* <button onClick={() => addChemo()}>Ajouter +</button> */}
                    <TreeBranch linksFrom={linksFrom} linksTo={linksTo} resources={resources} resourceType={resourceType} actionFunc={actionFunc} isFinal={isFinal} />
                </div>
            )
        } else {
            return (
            <div className="Sidebar">
            <Searchbar />
            </div>
            )
        }

    }
}
export default Sidebar;