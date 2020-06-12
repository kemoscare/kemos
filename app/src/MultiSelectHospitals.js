import React, { Component } from 'react'
import { Select } from '@blueprintjs/select'
import { Menu, MenuItem, Button } from '@blueprintjs/core'
import hospitals from './hospitals'
import '@blueprintjs/select/lib/css/blueprint-select.css'

export class HospitalSelect extends Component {
    constructor() {
        super()
        const hospital_list = hospitals
        this.state = {
            hospital: null,
        }
    }

    itemRenderer = (item, { handleClick, modifiers, query }) => {
        return (
            <MenuItem
                key={item._id}
                onClick={handleClick}
                text={item.rs + item.complrs}
                label={item.departement}
            />
        )
    }

    itemPredicate = (query, item) => {
        return `${item.rs.toLowerCase()} ${item.libdepartement.toLowerCase()}${item.departement.toLowerCase()}`.includes(
            query.toLowerCase()
        )
    }

    itemSelected = item => {
        this.setState({ hospital: item })
        this.props.user.hospital = item
    }

    render() {
        const { hospitals, itemSelected, user } = this.props
        const { hospital } = this.state
        if (hospitals) {
            return (
                <Select
                    items={hospitals}
                    initialContent={<MenuItem disabled text="1200 elements" />}
                    itemRenderer={this.itemRenderer}
                    itemPredicate={this.itemPredicate}
                    onItemSelect={this.itemSelected}
                    noResults={
                        <MenuItem disabled={true} text="Pas de resultat." />
                    }
                >
                    <Button
                        text={
                            hospital
                                ? hospital.rs + hospital.complrs
                                : this.props.hospitals[0].rs
                        }
                        rightIcon="double-caret-vertical"
                    />
                </Select>
            )
        } else {
            return 'Loading'
        }
    }
}
