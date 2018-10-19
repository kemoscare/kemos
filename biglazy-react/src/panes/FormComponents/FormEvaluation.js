import React, {Component} from 'react'
import {
    InputGroup,
    Checkbox,
    Button,
    HTMLTable,
    Intent
} from '@blueprintjs/core'

import {remove} from 'lodash'

class FormEvaluation extends Component {

    constructor() {
        super()
        this.state = {
        }
    }

    handleChangeInput = (event, id) => {
        this.props.evaluations[id][event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleChangeCheckBox = (event, id) => {
        this.props.evaluations[id][event.target.name] = event.target.checked
        this.setState(this.state)
    }

    evaluationComponent = (evaluation, id) => (
        <tr key={id}>
            <td><InputGroup name="dayAfter" placeholder="N cycles" value={evaluation.dayAfter} onChange={(event) => this.handleChangeInput(event, id)}/></td>
            <td><InputGroup name="delay"placeholder="N semaines" value={evaluation.delay} onChange={(event) => this.handleChangeInput(event, id)}/></td>
            <td>
                <Checkbox name="imagery" inline checked={evaluation.imagery} onChange={(event) => this.handleChangeCheckBox(event, id)}>Imagerie</Checkbox>
                <Checkbox name="consultation" inline checked={evaluation.consultation} onChange={(event) => this.handleChangeCheckBox(event, id)} >Consultation</Checkbox>
            </td>
            <td><Button icon="minus" intent={Intent.DANGER} onClick={() => this.deleteEvaluation(id)} id={id}/></td>

        </tr>
    )

    addEvaluation = () => {
        let { evaluations } = this.props
        evaluations.push({dayAfter: "", delay: "", imagery: false, consultation: false})

        this.setState(this.state)
    }

    deleteEvaluation = (id) => {
        remove(this.props.evaluations, (_, index) => index === id)
        this.setState(this.state)
    }

    render() {
        const { evaluations } = this.props

        return (
        <div>
            <HTMLTable>
                    <thead>
                        <tr>
                            <th>Reevaluation à</th>
                            <th>Après</th>
                            <th>Comprenant</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations && evaluations.map((evaluation, index) => this.evaluationComponent(evaluation, index))}
                    </tbody>

                </HTMLTable>
                <Button onClick={this.addEvaluation} >Ajouter une evaluation</Button>
            </div>
        )
    }
}

export default FormEvaluation
