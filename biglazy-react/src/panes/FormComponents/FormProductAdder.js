import React, { Component } from 'react'
import {
    InputGroup,
    Button,
    ControlGroup,
    FormGroup,
    Intent,
    Divider
} from '@blueprintjs/core'

import { remove } from 'lodash'

class ProductAdder extends Component {

    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    handleInputChange = (event, id) => {
        this.props.products[id] = event.target.value
        this.setState(this.state)
    }

    productElement = (product, id) => (
            <ControlGroup key={id}>
                <InputGroup id={id} placeholder="Produit" value={product} onChange={(event) => this.handleInputChange(event, id)}/>
                <Button icon="minus" intent={Intent.DANGER} onClick={() => this.deleteProduct(id)} id={id} />
                
            </ControlGroup>)

    addProduct = () => {
        this.props.products.push("")
        this.setState(this.state)
    }

    deleteProduct = (id) => {
        remove(this.props.products, (_, index) => index === id)

        this.setState(this.state)
    }

    render() {
        const { products } = this.props
        return (
            <FormGroup>
                {products.map((product, index) => (
                    <div vertical>
                        {this.productElement(product, index)} 
                        <Divider />
                    </div> 
                ))}

                <Button onClick={this.addProduct} icon="plus"/>
            </FormGroup>
        )
    }
}

export default ProductAdder