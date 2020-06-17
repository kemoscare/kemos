import React, { Component } from 'react'
import {
    InputGroup,
    Checkbox,
    Button,
    HTMLTable,
    Intent,
} from '@blueprintjs/core'

import {
    inputChanged,
    checkboxChanged,
    addFormElement,
    deleteFormElement,
} from '../../actions/form'

const evaluationInitialState = {
    id: 0,
    dayAfter: '',
    delay: '',
    imagery: false,
    consultation: false,
}
export const evaluationsInitialState = [evaluationInitialState]

const addEvaluation = () =>
    addFormElement('evaluations', evaluationInitialState)
const deleteEvaluation = evaluation =>
    deleteFormElement('evaluations', evaluation)

export const EvaluationsForm = ({ evaluations, dispatch }) => (
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
                {evaluations.map(e => (
                    <EvaluationForm evaluation={e} dispatch={dispatch} />
                ))}
            </tbody>
        </HTMLTable>
        <Button onClick={() => dispatch(addEvaluation())}>
            Ajouter une evaluation
        </Button>
    </div>
)

const evaluationInputChanged = (event, evaluation) =>
    inputChanged('evaluations', event, evaluation.id)
const evaluationCheckboxChanged = (event, evaluation) =>
    checkboxChanged('evaluations', event, evaluation.id)

const EvaluationForm = ({ evaluation, dispatch }) => (
    <tr key={evaluation.id}>
        <td>
            <InputGroup
                name="dayAfter"
                placeholder="N cycles"
                value={evaluation.dayAfter}
                onChange={e => dispatch(evaluationInputChanged(e, evaluation))}
            />
        </td>
        <td>
            <InputGroup
                name="delay"
                placeholder="N semaines"
                value={evaluation.delay}
                onChange={e => dispatch(evaluationInputChanged(e, evaluation))}
            />
        </td>
        <td>
            <Checkbox
                name="imagery"
                inline
                checked={evaluation.imagery}
                onChange={e =>
                    dispatch(evaluationCheckboxChanged(e, evaluation))
                }
            >
                Imagerie
            </Checkbox>
            <Checkbox
                name="consultation"
                inline
                checked={evaluation.consultation}
                onChange={e =>
                    dispatch(evaluationCheckboxChanged(e, evaluation))
                }
            >
                Consultation
            </Checkbox>
        </td>
        <td>
            <Button
                icon="minus"
                intent={Intent.DANGER}
                onClick={() => dispatch(deleteEvaluation(evaluation))}
                id={evaluation.id}
            />
        </td>
    </tr>
)
