import React, { Component } from 'react'
import { Classes } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'

const Preview = (props) => {
    const { protocol, loading } = props

    if(!loading) {
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
    } else {
        return (
            // MOCK
            <div>
                <h4 className={Classes.SKELETON}>XXXXXXX</h4>
                <p className={Classes.SKELETON}>J1 = JX</p>
                <h5 className={Classes.SKELETON}>Réévaluations</h5>
                <Table enableRowHeader={false} numRows={5} selectionModes={SelectionModes.NONE} className={Classes.SKELETON}>
                    <Column name="Reevaluations"/>
                    <Column name="Imagerie" />
                    <Column name="Consultation" />
                </Table>
            </div>
            
            )
    }
    
}

export default Preview