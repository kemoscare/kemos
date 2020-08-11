import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { getProducts } from './protocolUtils'

import { Preview } from './Preview'
import { iteratee } from 'lodash'
import mockProtocol from '../test/protocol.json'

describe('Preview Component', () => {
    it('Loads and displays Preview', () => {
        const { container, asFragment } = render(
            <Preview
                protocol={mockProtocol}
                products={getProducts(mockProtocol)}
                loading={false}
            />
        )
        console.log(container)
        console.log(asFragment)
    })
})
