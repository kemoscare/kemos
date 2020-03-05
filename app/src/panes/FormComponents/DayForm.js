import React, { Component } from 'react'
import {Radio, 
        RadioGroup, 
        InputGroup, 
        Button, 
        Intent, 
        HTMLTable} from "@blueprintjs/core"

import { inputChanged, radioChanged, addFormElement, deleteFormElement, uniqueName } from '../../actions/form'

export const dayInitialState = {id: 0, day: "1-8", careGalenic: "PerOs", careMode: "Admission", products: [] }
export const daysInitialState = [dayInitialState]

const addDay = () => addFormElement('days', dayInitialState)
const deleteDay = (day) => deleteFormElement('days', day)

export const DaysForm = ({ days, dispatch }) => (
            <div>
                <HTMLTable>
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Produits</th>
                            <th>Galénique</th>
                            <th>Mode d'administration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((day) => <DayForm day={day} dispatch={dispatch} /> )}
                    </tbody>

                </HTMLTable>
                <Button onClick={() => dispatch(addFormElement('days', dayInitialState))} >Ajouter un jour</Button>
            </div>
)

const dayInputChanged = (event, day) => inputChanged('days', event, day.id)
const dayRadioChanged = (event, day) => radioChanged('days', event, day.id)

export const DayForm = ({ day, dispatch }) => (
            <tr key={day.id}>
                <td><InputGroup name={uniqueName('day', day)} value={day.day} onChange={(e) => dispatch(dayInputChanged(e, day))} placeholder="1 - 1,8"/></td>
                <td>
    { day.products && <ProductForm dayId={day.id} /> }
                    </td>
                <td>
                    <RadioGroup name={uniqueName('careGalenic', day)} onChange={(e) => dispatch(dayRadioChanged(e, day))} selectedValue={day.careGalenic}>
                        <Radio label="P.O" value="PerOs"/>
                        <Radio label="I.V" value="IntraVeinous"/>
                        <Radio label="Diffuseur" value="Distributor"/>
                    </RadioGroup>
                </td>
                <td>
                    <RadioGroup name={uniqueName('careMode', day)} onChange={(e) => dispatch(dayRadioChanged(e, day))} selectedValue={day.careMode}>
                        <Radio label="HdJ" value="DayCare"/>
                        <Radio label="Hopital" value="Admission"/>
                        <Radio label="Domicile" value="Home" />
                    </RadioGroup>
                </td>
                <td><Button icon="minus" intent={Intent.DANGER} onClick={() => dispatch(deleteDay(day))} id={day.id}/></td>
            </tr>
)
