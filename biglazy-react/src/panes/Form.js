import React, { Component } from 'react'
import { FormGroup, 
         InputGroup, 
         HTMLSelect, 
         Radio, 
         RadioGroup, 
         ControlGroup, 
         Checkbox, 
         HTMLTable, 
         Button,
         Intent,
         Divider,
         Icon} from '@blueprintjs/core'
import selectContent from './selectContent'
import FormEvaluation from './FormComponents/FormEvaluation'
import ProductAdder from './FormComponents/FormProductAdder'
import FormDay from './FormComponents/FormDay'

class Form extends Component {

    constructor() {
        super()
        this.state = {
            components: {
                evaluations: [
                ],
                days: [],
                products: []
            },
            content: {
                hexId: "",
                theme: "urologie",
                organ: "prostate",
                name: "",
                dayOneEquals: null,
                radio_radiochimiottt: "chimiotherapie",
                evaluations: [
                    {dayAfter: null, delay:0, imagery: false, consultation: false}
                ],
                days: [
                    {day: "", products: [""], careMode: "DayCare", careGalenic: "IntraVeinous"}
                ]
            }
        }        
    }


    handleRadioChange = (event) => {
        this.state.content[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleTextInputChange = (event) => {
        this.state.content[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleSelectChange = (event) => {
        this.state.content[event.target.name] = event.target.value
        this.setState(this.state)
    }

    updateDays = (days) => {
        this.state.content.days = days
        // console.log(this.state.content)
    }

    updateEvaluations = (evaluations) => {
        this.state.content.evaluations = evaluations
        // console.log(this.state.content)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        prevState.content = nextProps.selectedProtocol
    }

    render() {

        let { content } = this.state
        console.log("content equals : ")
        console.log(this.state.content)
        return (
            <div className="bp3-ui-text">
                <FormGroup label="Thème" labelFor="select-theme">
                    <HTMLSelect id="theme" name="theme" onChange={this.handleSelectChange} value={content.theme} id="select-theme" options={selectContent.themes} fill={true}/>
                </FormGroup>
                <FormGroup label="Organe" labelFor="select-organ">
                    <HTMLSelect name="organ" id="organ" options={selectContent.organs} value={content.organ} onChange={this.handleSelectChange} fill={true}/>
                </FormGroup>
                <RadioGroup onChange={this.handleRadioChange} name="radio_radiochimiottt" label="Catégorie" inline selectedValue={content.radio_radiochimiottt}>
                    <Radio label="Chimiothérapie" value="Chimiotherapie"/>
                    <Radio label="Radio-Chimiothérapie" value="Radiochimiotherapie" />
                </RadioGroup>
                <ControlGroup>
                    <FormGroup inline label="Protocole de chimiothérapie" labelFor="protocol-name">
                        <InputGroup name="name" onChange={this.handleTextInputChange} placeholder="Nom du protocole" value={content.name}/>
                    </FormGroup>   
                    &nbsp;&nbsp;&nbsp;
                    <FormGroup inline label="J1 = J" labelFor="dayOneEquals" >
                        <InputGroup name="dayOneEquals" onChange={this.handleTextInputChange} intent={Intent.SUCCESS} placeholder="0" id="dayOneEquals" value={content.dayOneEquals}/>
                    </FormGroup>
                </ControlGroup>
                
                <FormEvaluation evaluations={content.evaluations} />
                <Divider />
                <FormDay days={content.days || []} />

            </div>
        )
    }
}

export default Form