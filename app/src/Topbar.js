import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ProgressBar, Button, Intent, Popover, Menu, Position, MenuItem } from '@blueprintjs/core'
import { hasPermission } from './authentication'
import { logoutUser } from './actions/users'
import { showNewProtocolForm } from './actions/actions'
import Logo from './Logo';
import './Topbar.css'
import { Link } from 'react-router-dom'
/*
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
*/
const Topbar = ({ connected, user, dispatch }) => (
    <div className="Topbar">
        <div className="left"></div>
        <div className="center">
            <Logo />
        </div>
        <div className="right">
            {user.first_name}&nbsp;{user.last_name}
            { hasPermission(['admin', 'add-protocol'], user) && <Button intent={Intent.PRIMARY} minimal large={true} icon="plus" onClick={() => dispatch(showNewProtocolForm())}>Ajouter</Button> } &nbsp;&nbsp;
            <Link to="/logout">logout</Link>&nbsp;&nbsp;
        </div>
    </div>
)

function mapStateToProps(state) {
    const { connected, user } = state.users
    return {
        connected,
        user
    }
}

export default connect(mapStateToProps)(Topbar);
