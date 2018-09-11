import React, { Component } from 'react';

class Sidebar extends Component {

    render() {
        const {chemolist} = this.props
        const chemoComponents = chemolist.map((chemo, index) => {
            return <li key={index} onClick={() => this.props.chemoClicked(index)}>{chemo.protocole}</li>
        })
        return (
            <div className="Sidebar">
                <h3 className="header">Chimiothérapies</h3>
                <ul>
                    {chemoComponents}
                </ul>
            </div>
        )
        
    }
}

export default Sidebar;