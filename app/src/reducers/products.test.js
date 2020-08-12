import { products } from './products'
import { v4 as uuid } from 'uuid'

const productCreator = name => {
    return {
        name,
        _id: uuid(),
    }
}
const mockProducts = [
    productCreator('product1'),
    productCreator('product2'),
    productCreator('product3'),
]

const receivedProductAction = {
    type: 'RECEIVED_PRODUCT',
    product: mockProducts,
}

const expectedResults = {
    allProducts: mockProducts.map(p => {
        return {
            name: p.name,
            productId: p._id,
        }
    }),
}

describe('Product Reducer', () => {
    it('Tests RECEIVED_PRODUCTS', () => {
        expect(products({}, receivedProductAction)).toEqual(expectedResults)
    })
})
