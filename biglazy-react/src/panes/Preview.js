import React, { Component } from 'react'
import { Classes,NonIdealState, H5, H3 } from '@blueprintjs/core';
import { Cell, Table, Column, SelectionModes } from '@blueprintjs/table'
import SkeletonProtocol from './SkeletonProtocol';
import { getProducts, getWrappedForProduct } from './protocolUtils'
import './Preview.css'

class Preview extends Component{


    productLine = (protocol, product) => (
        <div className="productLine">
            <strong>{product} : </strong><br />{
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
        protocol.evaluations.map(e => e.dayAfter).reduce((d1, d2) => d1 + (d2 && ", " + d2))
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
                        <H3 className="protocolName">{protocol.name}</H3>
                        <div className="dayOneEquals">J0 = J{protocol.dayOneEquals}</div>
                    </div>
                    <p>Chimiothérapie comprenant <strong>{this.getFormattedProducts(products)}</strong>. réévaluée tous les N cycles avec ...</p>
                    {this.dayList(protocol, products)}
                </div>
                
            )
                
                
        }
    }

    
}

export default Preview