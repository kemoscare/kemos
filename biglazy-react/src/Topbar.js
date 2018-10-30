import React, { Component } from 'react'
import { Navbar, Alignment, ProgressBar, Button } from '@blueprintjs/core'
import Logo from './Logo';
import './Topbar.css'

class Topbar extends Component {
    render() {

        if(this.props.user) {
            console.log(this.props.user)
            return (
                <div className="Topbar">
                    <div className="left">
                    </div>
                    <div className="center">
                        <Logo />
                    </div>
                    <div className="right">
                        {this.props.user.firstname} {this.props.user.surname}
                        <Button minimal large icon="cog" />
                    </div>
                </div>
            )

        } else {
            return (
                <div className="Topbar">
                    <div className="left">
                    </div>
                    <div className="center">
                        <Logo />
                    </div>
                    <div className="right">
                        <ProgressBar animate/>
                    </div>
                </div>
            )
        }    
    }
}

export default Topbar;