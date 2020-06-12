import React, { Component } from 'react'
import { MultiSelect } from '@blueprintjs/select'
import { MenuItem, TagInput, Intent } from '@blueprintjs/core'
import '@blueprintjs/select/lib/css/blueprint-select.css'

class SimpleMultiSelect extends Component {
    constructor() {
        super()
        this.state = {}
    }

    itemRenderer = (item, { modifiers, handleClick }) => {
        return (
            <MenuItem
                key={item.key}
                icon={item.isSelected ? 'tick' : 'blank'}
                text={item.name.label}
                onClick={handleClick}
                shouldDismissPopover={false}
            />
        )
    }

    itemTagRenderer = item => {
        return item.name
    }

    handleClick = item => {
        item.isSelected = !item.isSelected
        this.props.selectedItemsChanged(
            this.props.items
                .filter(item => item.isSelected)
                .map(item => item.name.value)
        )
        this.setState(this.state)
    }

    render() {
        const { items } = this.props
        if (items) {
            return (
                <MultiSelect
                    items={items}
                    itemRenderer={this.itemRenderer}
                    tagRenderer={this.itemTagRenderer}
                    onItemSelect={this.handleClick}
                    tagInputProps={{
                        tagProps: { intent: Intent.PRIMARY, interactive: true },
                        onRemove: () => console.log('remove'),
                    }}
                />
            )
        } else {
            return 'loading'
        }
    }
}

export default SimpleMultiSelect
