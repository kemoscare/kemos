import React, { Component } from 'react'
import {
    FormGroup,
    InputGroup,
    HTMLSelect,
    Radio,
    RadioGroup,
    ControlGroup,
    Button,
    Intent,
    Divider,
    Classes,
    Checkbox,
} from '@blueprintjs/core'
import selectContent from './../selectContent'
import { EvaluationsForm } from './EvaluationForm'
import { DaysForm } from './DayForm'
import {
    submitForm,
    selectChanged,
    inputChanged,
    radioChanged,
} from '../../actions/form'

export const protocolInitialState = {
    theme: 'general',
    organ: '',
    category: 'Chimiotherapie',
    clinicalTrial: false,
    dayOneEquals: 0,
}

export const AddProtocolForm = ({
    protocol,
    evaluations,
    days,
    dispatch,
    loading,
}) => (
    <div className="bp3-ui-text">
        <FormGroup label="Thème" labelFor="select-theme">
            <HTMLSelect
                name="theme"
                onChange={e => dispatch(selectChanged('protocol', e))}
                value={protocol.theme}
                id="select-theme"
                options={selectContent.themes}
                fill={true}
            />
        </FormGroup>
        <FormGroup label="Organe" labelFor="select-organ">
            <HTMLSelect
                name="organ"
                id="organ"
                options={selectContent.organs[protocol.theme]}
                value={protocol.organ}
                onChange={e => dispatch(selectChanged('protocol', e))}
                fill={true}
            />
        </FormGroup>
        <RadioGroup
            onChange={e => dispatch(radioChanged('protocol', e))}
            name="radio_radiochimiottt"
            label="Catégorie"
            inline
            selectedValue={protocol.radio_radiochimiottt}
        >
            <Radio label="Chimiothérapie" value="Chimiotherapie" />
            <Radio label="Radio-Chimiothérapie" value="Radiochimiotherapie" />
            <Checkbox inline id="clinicalTrial" name="clinicalTrial">
                Essai thérapeutique
            </Checkbox>
        </RadioGroup>
        <ControlGroup>
            <FormGroup
                inline
                label="Protocole de chimiothérapie"
                labelFor="protocol-name"
            >
                <InputGroup
                    name="name"
                    onChange={e => dispatch(inputChanged('protocol', e))}
                    placeholder="Nom du protocole"
                    value={protocol.name}
                />
            </FormGroup>
            &nbsp;&nbsp;&nbsp;
            <FormGroup inline label="J1 = J" labelFor="dayOneEquals">
                <InputGroup
                    name="dayOneEquals"
                    onChange={e => dispatch(inputChanged('protocol', e))}
                    intent={Intent.SUCCESS}
                    placeholder="0"
                    id="dayOneEquals"
                    value={protocol.dayOneEquals}
                />
            </FormGroup>
        </ControlGroup>

        <EvaluationsForm evaluations={evaluations} dispatch={dispatch} />
        <Divider />
        <DaysForm days={days} dispatch={dispatch} />
        <Divider />
        <Button
            intent={Intent.PRIMARY}
            onClick={() => dispatch(submitForm(protocol))}
            loading={loading}
        >
            Ajouter / Modifier
        </Button>
    </div>
)

export default AddProtocolForm
