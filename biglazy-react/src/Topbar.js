import React, { Component } from 'react'
import { ProgressBar, Button, Intent, Popover, Menu, Position, MenuItem } from '@blueprintjs/core'
import {hasPermission } from './authentication'
import Logo from './Logo';
import './Topbar.css'

class Topbar extends Component {
    render() {

        if(this.props.user) {
            return (
                <div className="Topbar">
                    <div className="left">
                    </div>
                    <div className="center">
                        <Logo />
                    </div>
                    <div className="right">
                        {this.props.user.first_name} {this.props.user.last_name}&nbsp;&nbsp;
                        { hasPermission(['admin', 'add-protocol'], this.props.user) && <Button intent={Intent.PRIMARY} minimal large={true} icon="plus" onClick={this.props.reset}>Ajouter</Button>}&nbsp;&nbsp;
                        { hasPermission('admin', this.props.user) && (<Popover content={<Menu>
                                                                                            <MenuItem icon="plus" text="Ajouter un utilisateur" href="/users/add"/>
                                                                                        </Menu>} position={Position.RIGHT_TOP}>
                                                                            <Button icon="cog" minimal />
                                                                        </Popover>)}&nbsp;&nbsp;
                        { <Button onClick={this.props.logout} minimal large icon="power" />}&nbsp;&nbsp;
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
