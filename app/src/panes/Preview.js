import React, { Component } from 'react'
import { Classes, NonIdealState, H5, H3, H2 } from '@blueprintjs/core'
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'
import { ProtocolLoading } from './Loading'
import {
    getProducts,
    getWrappedForProduct,
    getFormattedProducts,
    getFormattedCycles,
} from './protocolUtils'
import { connect } from 'react-redux'
/* import { createSelector } from 'reselect' */
import './Preview.css'

export const ProductLine = (protocol, product) => (
    <div className="productLine">
        <strong>{product.name}</strong>
        <br />
        {getWrappedForProduct(protocol, product).map(wrapped => (
            <span
                className={wrapped.isDelivered ? 'delivered' : 'notDelivered'}
            >
                J{wrapped.day}
            </span>
        ))}
    </div>
)

const dayList = (protocol, products) => (
    <div className="productLines">
        {products.map(product => ProductLine(protocol, product))}
    </div>
)

export const Preview = ({ protocol, products, loading }) => {
    if (loading === 'LOADING') return ProtocolLoading
    else if (loading === 'NON_IDEAL') {
        return (
            <NonIdealState
                className="nonIdealState"
                icon="search"
                title="Chimiothérapie"
                description="Selectionnez un protocole dans la liste de gauche"
            />
        )
    } else {
        return (
            <div className="Preview">
                <div className="firstLine">
                    <H2 className="protocolName">{protocol.name}</H2>
                    <div className="dayOneEquals">
                        J1 = J{protocol.dayOneEquals}
                    </div>
                </div>
                <br />
                <p>
                    Chimiothérapie comprenant <strong>{}</strong>. réévaluée
                    tous les <strong>{getFormattedCycles(protocol)}</strong>{' '}
                    cycles avec ...
                </p>
                <br />
                <div className="evaluations">
                    <H5>Réévaluations : </H5>
                    <div className="evaluationBox" key={protocol.dayOneEquals}>
                        {protocol.evaluations.map(e => (
                            <div className="flexLine" key={e.day}>
                                <div className="evaluation">
                                    {e.dayAfter} cycles
                                </div>
                                <div className="evaluationContent">
                                    {e.consultation && (
                                        <strong>Consultation</strong>
                                    )}
                                    {e.imagery && (
                                        <span>
                                            &nbsp;et <strong>Imagerie</strong>
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                    <H5>Produits : </H5>
                    {dayList(protocol, products)}
                </div>
            </div>
        )
    }
}
/*
 * When Reselect will be needed
 *
 * const getProtocol = state => state.protocol
 * const getProductsForProtocol = createSelector([getProtocol], getProducts)
 */

function mapStateToProps(state, ownProps) {
    const { loading } = state.panes
    if (loading !== 'LOADED') return { loading } // early exit

    return {
        loading: state.panes.loading,
        protocol: state.protocol,
        products: getProducts(state.protocol),
    }
}

export default connect(mapStateToProps)(Preview)
