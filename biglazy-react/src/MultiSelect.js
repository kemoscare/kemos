import React, { Component } from 'react'
import { MultiSelect } from '@blueprintjs/select'
import { MenuItem, TagInput } from '@blueprintjs/core'
import '@blueprintjs/select/lib/css/blueprint-select.css'
import { __values } from 'tslib';


class SimpleMultiSelect extends Component {
    constructor() {
        super()
        this.state = {}
    }

    itemRenderer = (item, {modifiers, handleClick}) => {
        return (
            <MenuItem key={item.key}
                      icon={item.isSelected ? "tick" : "blank"}
                      text={item.name}
                      onClick={handleClick}
                      shouldDismissPopover={false} />

        )
    }

    itemTagRenderer = (item) => {
        return <TagInput inputValue={item.name} />
    }

    handleClick = (item) => {
        item.isSelected = !item.isSelected
        this.setState(this.state)
    }

    render() {
        const {items} = this.props
        if(items) {
            return(
                <MultiSelect items={items}
                             itemRenderer={this.itemRenderer}
                             tagRenderer={this.itemTagRenderer}
                             onItemSelect={this.handleClick}
                              />
            )
        } else {
            return "loading"
        }


    }
}

export default SimpleMultiSelect