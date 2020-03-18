import React, { Component } from 'react'
import { Classes,NonIdealState, H5, H3, H2 } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'
import SkeletonProtocol from './SkeletonProtocol';
import { getProducts, getWrappedForProduct, getFormattedProducts, getFormattedCycles } from './protocolUtils'
import { connect } from 'react-redux'
import './Preview.css'

const ProductLine = (protocol, product) => (
        <div className="productLine">
            <strong>{product}</strong><br />{
                getWrappedForProduct(protocol, product).map(wrapped => 
                <span className={wrapped.isDelivered ? "delivered" : "notDelivered"}>
                    J{wrapped.day}
                </span>)
            }
        </div>
    )

const dayList = (protocol, products) => (
        <div className="productLines">
            {products.map(product => ProductLine(protocol, product))}
        </div>
    )

    
const Preview = ({ protocol, loading }) => {
        if(loading === "LOADING") return SkeletonProtocol
        else if(loading === "NON_IDEAL") {
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
                        <div className="dayOneEquals">J1 = J{protocol.dayOneEquals}</div>
                    </div>
                    <br/>
                    <p>Chimiothérapie comprenant <strong>{}</strong>. réévaluée tous les <strong>{getFormattedCycles(protocol)}</strong> cycles avec ...</p>
                    <br/>
                    <div className="evaluations">
                        <H5>Réévaluations : </H5>
            <div className="evaluationBox">
                {protocol.evaluations.map(e => (
                    <div className="flexLine">
                        <div className="evaluation">{e.dayAfter} cycles</div> 
                        <div className="evaluationContent">
                            {e.consultation && <strong>Consultation</strong>}
                            {e.imagery && <span>&nbsp;et <strong>Imagerie</strong></span>}
                        </div>
                    </div>
                ))}
                    <br/>
                    <br/>
                    <H5>Produits : </H5>
                    dayList(protocol, products)
                </div>
            </div>
                </div>
            )
    }
}

function mapStateToProps(state, ownProps) {
    return { protocol: state.protocol }
}

export default connect(mapStateToProps)(Preview)
