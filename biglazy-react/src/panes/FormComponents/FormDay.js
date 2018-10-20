import React, { Component } from 'react'
import {Radio, 
        RadioGroup, 
        InputGroup, 
        Button, 
        Intent, 
        HTMLTable, 
        Icon} from "@blueprintjs/core"
import ProductAdder from './FormProductAdder'
import { remove } from 'lodash'

class FormDay extends Component {
    constructor() {
        super()
        this.state = {
            days: []
        }
    }

    handleInputChange = (event, id) => {
        this.props.days[id][event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleRadioChange = (event, id) => {
        const name = event.target.name.split("-")[0] //splits unique name to get proper key to match JSON content
        this.props.days[id][name] = event.target.value
        this.setState(this.state)
    }

    deleteDay = (id) => {
        remove(this.props.days, (_, index) => id === index)
        this.setState(this.state)
    }

    addDay = () => {
        let { days } = this.props
        days.push({day: "", products: [""], careMode: "Admission", careGalenic: "IntraVeinous"})
        this.setState(this.state)
    }

    dayComponent = (day, id) => {
        return (
            <tr key={id}>
                <td><InputGroup name="day" value={day.day} onChange={(event) => this.handleInputChange(event, id)} placeholder="1 - 1,8"/></td>
                <td>
                    <ProductAdder name="products" products={day.products}/>
                </td>
                <td>
                    <RadioGroup name={"careGalenic-"+id} onChange={(event) => this.handleRadioChange(event, id)} selectedValue={day.careGalenic}>
                        <Radio label="P.O" value="PerOs"/>
                        <Radio label="I.V" value="IntraVeinous"/>
                        <Radio label="Diffuseur" value="Distributor"/>
                    </RadioGroup>
                </td>
                <td>
                    <RadioGroup name={"careMode-"+id} onChange={(event) => this.handleRadioChange(event, id)} selectedValue={day.careMode}>
                        <Radio label="HdJ" value="DayCare"/>
                        <Radio label="Hopital" value="Admission"/>
                    </RadioGroup>
                </td>
                <td><Button icon="minus" intent={Intent.DANGER} onClick={() => this.deleteDay(id)} id={id}/></td>

            </tr>

        )
    }

    render() {
        let { days } = this.props

        return (
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
                        {days.map((day, index) => this.dayComponent(day, index))}
                    </tbody>

                </HTMLTable>
                <Button onClick={this.addDay} >Ajouter un jour</Button>
            </div>
        )
    }
}

export default FormDay
