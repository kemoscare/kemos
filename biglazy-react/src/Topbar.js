import React, { Component } from 'react'
import { Navbar, Alignment, ProgressBar, Button } from '@blueprintjs/core'
import {hasPermission } from './authentication'
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
                        {this.props.user.first_name} {this.props.user.last_name}
                        { hasPermission('admin', this.props.user) && <Button minimal large icon="cog" />}
                        { <Button onClick={this.props.logout} minimal large icon="power" />}
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