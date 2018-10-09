import React, { Component } from 'react'
import { Classes } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'

const contentCellRenderer = (rowIndex) => {

}

const Preview = (props) => {
    const { protocol } = props

    if(protocol.protocole != undefined) {
        const cellRenderer = (rowIndex) => <Cell>À {protocol.reevaluations[rowIndex].j} semaines</Cell>
        const imagerieCellRenderer = (rowIndex) => <Cell>{protocol.reevaluations[rowIndex].contenu.imagerie ? "Oui" : "Non" }</Cell>
        const consultationCellRenderer = (rowIndex) => <Cell>{protocol.reevaluations[rowIndex].contenu.consultation ? "Oui" : "Non" }</Cell>
        
        return (
            <div>
                <h4>{protocol.protocole}</h4>
                <p>J1 = J{protocol.dureeCycle}</p>
                <h5>Réévaluations</h5>
                <Table enableRowHeader={false} numRows={protocol.reevaluations.length} selectionModes={SelectionModes.NONE}>
                    <Column name="Reevaluations" cellRenderer={cellRenderer}/>
                    <Column name="Imagerie" cellRenderer={imagerieCellRenderer}/>
                    <Column name="Consultation" cellRenderer={consultationCellRenderer} />
                </Table>
            </div>
            
        )
    } else {
        return <div className={Classes.SKELETON}>Select a class mate</div>
    }
    
}

export default Preview