import React, { Component, useState } from 'react'
import {
    InputGroup,
    Button,
    ControlGroup,
    FormGroup,
    Intent,
    Divider,
    MenuItem
} from '@blueprintjs/core'
import { Suggest } from '@blueprintjs/select'
import { connect } from 'react-redux'
import {
    inputChanged,
    addFormElement,
    deleteFormElement,
    uniqueName,
} from '../../actions/form'

function highlightText(text, query) {
    let lastIndex = 0;
    const words = query
        .split(/\s+/)
        .filter(word => word.length > 0)
        .map(escapeRegExpChars);
    if (words.length === 0) {
        return [text];
    }
    const regexp = new RegExp(words.join("|"), "gi");
    const tokens = [];
    while (true) {
        const match = regexp.exec(text);
        if (!match) {
            break;
        }
        const length = match[0].length;
        const before = text.slice(lastIndex, regexp.lastIndex - length);
        if (before.length > 0) {
            tokens.push(before);
        }
        lastIndex = regexp.lastIndex;
        tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
    }
    const rest = text.slice(lastIndex);
    if (rest.length > 0) {
        tokens.push(rest);
    }
    return tokens;
}

function escapeRegExpChars(text) {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

const SuggestProductRenderer = (item, { modifiers, handleClick, query}) => (
    <MenuItem active={modifiers.active}
              disabled={modifiers.disabled}
              label={item.name}
              key={item.productId}
              onClick={handleClick}
              text={highlightText(text, query)}
              />
)

const SuggestProduct = ({ products }) => (
    <Suggest items={products}
             inputValueRenderer={(p) => p.name}
             itemRenderer={SuggestProductRenderer}
            /> 
)

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

const Product = ({ product, productInputChanged, deleteProduct }) => {

    let [query, setQuery] = useState("")
    
    return (
        <ControlGroup key={product.id}>
            <InputGroup
                name={uniqueName('value', 0)}
                id={product.id}
                placeholder="Produit"
                value={product.value.name}
                onChange={event => productInputChanged(event, product.id)}
            />
           <SuggestProduct
                name={uniqueName('value', 0)}
                id={product.id}
                />
            <Button
                icon="minus"
                intent={Intent.DANGER}
                onClick={() => deleteProduct(product)}
                id={product.id}
            />
        </ControlGroup>
    )
}

function mapStateToProps(state, ownProps) {
    const { products } = state.editForm
    const allProducts = state.products

    return {
        products: products[ownProps.dayId],
        allProducts
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
