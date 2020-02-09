import React, { Component } from 'react'
import {
    InputGroup,
    Button,
    ControlGroup,
    FormGroup,
    Intent,
    Divider
} from '@blueprintjs/core'

const ProductForm = (props, dispatch) => (
            <FormGroup>
                {
                    props.products.map((product) => (
                        <div vertical>
                            <Product product={product} dispatch={dispatch}/> 
                            <Divider />
                        </div> 
                    ))
                }

                <Button onClick={this.addProduct} icon="plus"/>
            </FormGroup>
)

const Product = (product, dispatch) => (
            <ControlGroup key={product.id}>
                <InputGroup id={product.id} placeholder="Produit" value={product} onChange={(e) => dispatch(inputChanged(e, product)}/>
                <Button icon="minus" intent={Intent.DANGER} onClick={() => dispatch(productDeleted(product)} id={product.id} />
            </ControlGroup>
)
