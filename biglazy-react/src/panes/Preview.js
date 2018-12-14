import React from 'react'
import { Classes,NonIdealState } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'

const Preview = (props) => {
    const { protocol, loading, nonIdeal } = props

    if(loading) {

    } 
    else if(nonIdeal) {
        return (
            <NonIdealState
                icon="search"
                title="Chimiothérapie"
                description="Selectionnez un protocole dans la liste de gauche"
                />
        )
    } else {
        const cellRenderer = (rowIndex) => <Cell>À {protocol.evaluations[rowIndex].dayAfter} semaines</Cell>
        const imagerieCellRenderer = (rowIndex) => <Cell>{protocol.evaluations[rowIndex].imagery ? "Oui" : "Non" }</Cell>
        const consultationCellRenderer = (rowIndex) => <Cell>{protocol.evaluations[rowIndex].consultation ? "Oui" : "Non" }</Cell>
        
        return (
            <div>
                <h4>{protocol.name}</h4>
                <p>J1 = J{protocol.dayOneEquals}</p>
                <h5>Réévaluations</h5>
                <Table enableRowHeader={false} numRows={protocol.evaluations.length} selectionModes={SelectionModes.NONE}>
                    <Column name="Reevaluations" cellRenderer={cellRenderer}/>
                    <Column name="Imagerie" cellRenderer={imagerieCellRenderer}/>
                    <Column name="Consultation" cellRenderer={consultationCellRenderer} />
                </Table>
            </div>
            
        )
            
            
    }
    
}

export default Preview