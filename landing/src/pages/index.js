import React from "react"
import { Link } from "gatsby"
import Button from '../components/Button'
import styled from '@emotion/styled'
import Layout from "../components/layout"
import SEO from "../components/seo"


const Grid = styled.div`
   display: grid;
   grid-template-columns: 50% 50%;
   `

const Right = styled.div`
    grid-column: 2;
    background-color: blue;
    margin: 5em;
    `

const Left = styled.div`
    grid-column: 1;
    background-color: pink;
    margin: 5em;
    `

const H3 = styled.h3`
    text-align: center;
    `

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Grid>
        <Left>
            <H3>Organisation</H3>
            <p>KEMOS simplifie l'organisation des hôpitaux de jours en proposants divers outils informatisés pour simplifier la prise en charge et le suivi des patients. Nous proposons des solutions intégrées qui respectent les compatibilités existantes avec les standards du marché.</p>
            
            <Button href="#" backgroundColor=''>Connexion</Button>
        </Left>
        <Right>
            Ici git l'image du PPS ou un meilleur logo/ icone
        </Right>
    </Grid>    
  </Layout>
)

export default IndexPage
