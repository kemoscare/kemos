import React, { Component } from 'react'
import { Classes } from '@blueprintjs/core'
import { Form } from 'react-formio'
import formJSON from './form.json'

const FormIOForm = (props) => {
    const { onSubmit, submission, loading } = props
    if(!loading) {
        return (
            <Form form={formJSON} onSubmit={onSubmit} submission={{data: submission}} />
        )
    } else {
        return (
            <div className={Classes.SKELETON}>
                <Form className={Classes.SKELETON} form={formJSON} onSubmit={onSubmit} submission={{data: submission}} />
            </div>
        )
    }
    
}

export default FormIOForm