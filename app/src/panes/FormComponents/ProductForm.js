import React, { Component } from 'react'
import {
    InputGroup,
    Button,
    ControlGroup,
    FormGroup,
    Intent,
    Divider,
} from '@blueprintjs/core'
import { connect } from 'react-redux'
import {
    inputChanged,
    addFormElement,
    deleteFormElement,
    uniqueName,
} from '../../actions/form'

const ProductForm = ({
    products,
    addProduct,
    deleteProduct,
    productInputChanged,
}) => (
    <FormGroup>
        {products.map(product => (
            <div>
                <Product
                    product={product}
                    productInputChanged={productInputChanged}
                    deleteProduct={deleteProduct}
                />
                <Divider />
            </div>
        ))}

        <Button onClick={addProduct} icon="plus" />
    </FormGroup>
)

const Product = ({ product, productInputChanged, deleteProduct }) => (
    <ControlGroup key={product.id}>
        <InputGroup
            name={uniqueName('value', 0)}
            id={product.id}
            placeholder="Produit"
            value={product.value.name}
            onChange={event => productInputChanged(event, product.id)}
        />
        <Button
            icon="minus"
            intent={Intent.DANGER}
            onClick={() => deleteProduct(product)}
            id={product.id}
        />
    </ControlGroup>
)

function mapStateToProps(state, ownProps) {
    const { products } = state.editForm
    console.log(products)
    return {
        products: products[ownProps.dayId],
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const { dayId } = ownProps
    return {
        addProduct: () =>
            dispatch({
                ...addFormElement('products', { name: '', id: '' }),
                dayId,
            }),
        deleteProduct: product =>
            dispatch({ ...deleteFormElement('products', product), dayId }),
        productInputChanged: (evenct, fieldId) =>
            dispatch({ ...inputChanged('products', event, fieldId), dayId }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
