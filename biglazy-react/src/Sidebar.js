import React, { Component } from 'react';

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
        this.state = {themes: []}
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

        const { chemotherapies } = this.props
        const items = chemotherapies.map((item, index) => {
            return <li key={index}><a onClick={() =>this.props.itemClicked(index)}>{item.protocole}</a></li>
        })
        return (
        <div className="Sidebar">
            <h3 className="header">Chimiothérapies</h3>
            <ul>
                {items}
                <button onClick={() => this.props.resetForm()}>Ajouter +</button>

            </ul>
            
        </div>

        )
    }
}
export default Sidebar;