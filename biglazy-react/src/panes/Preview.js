import React, { Component } from 'react'
import { Classes,NonIdealState, H5, H3, H2 } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'
import SkeletonProtocol from './SkeletonProtocol';
import { getProducts, getWrappedForProduct } from './protocolUtils'
import './Preview.css'

class Preview extends Component{


    productLine = (protocol, product) => (
        <div className="productLine">
            <strong>{product}</strong><br />{
                getWrappedForProduct(protocol, product).map(wrapped => 
                <span className={wrapped.isDelivered ? "delivered" : "notDelivered"}>
                    J{wrapped.day}
                </span>)
            }
        </div>
    )
    
    dayList = (protocol, products) => (
        <div className="productLines">
            {products.map(product => this.productLine(protocol, product))}
        </div>
        
    )

    getFormattedProducts = (products) => {
        return products.reduce((p1, p2) => p1 + ", " + p2)
    }

    getFormattedCycles = (protocol) => {
        protocol.evaluations.map(e => e.dayAfter).reduce((d1, d2) => d1 + (d2 && (", " + d2)))
    }

    render() {
        const { protocol, loading, nonIdeal } = this.props
        const products = getProducts(protocol)

        if(loading) {
            return SkeletonProtocol
        } 
        else if(nonIdeal) {
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
                    <p>Chimiothérapie comprenant <strong>{this.getFormattedProducts(products)}</strong>. réévaluée tous les <strong>{this.getFormattedCycles(protocol)}</strong> cycles avec ...</p>
                    <br/>
                    <div className="evaluations">
                        <H5>Réévaluations : </H5>
            <div className="evaluationBox">{protocol.evaluations.map(e => <div className="flexLine"><div className="evaluation">{e.dayAfter} cycles</div> <div className="evaluationContent">{e.consultation && <strong>Consultation</strong>}{e.imagery && <span>&nbsp;et <strong>Imagerie</strong></span>}</div></div>)}</div>
                    </div>
                    <br/><br/>
                    <H5>Produits : </H5>
                    {this.dayList(protocol, products)}
                </div>
                
            )
                
                
        }
    }

    
}

export default Preview