import React from 'react'
import { InputGroup, Classes } from '@blueprintjs/core'

export const SidebarLoading = () => (
    <div className="Sidebar bp3-dark">
        <div className="Searchbar">
            <InputGroup large leftIcon="search" placeholder="Recherche..." />
        </div>
        <p className={Classes.SKELETON}>Lorem Ipsum</p>
        <p className={Classes.SKELETON}>Lorem Ipsum</p>
        <p className={Classes.SKELETON}>Lorem Ipsum</p>
        <p className={Classes.SKELETON}>Lorem Ipsum</p>
    </div>
)

export default SidebarLoading
