import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import logo from './logo.svg'
import '../../utils/hover.css'

const Header = styled.div`
   margin:0;
   width: 100%;
   height: 160px;
    `
const Logo = styled.img`
    padding: 30px;
    width: 400px;
    float: left;
    `
const Links = styled.ul`
    margin: 0;
    padding: 0;
    display: inline;
    list-style-type: none;
    `
const Li = styled.li`
    text-decoration: none;
    display: inline-block;
    float: right;
    `

const link = css`
    display: block;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
    color: rbg(65, 65, 93);
    margin: 35px;
    padding: 3px;
    &:hover {
        box-shadow: inset 0 -3px 0 0 #FE6361; 
    }
    `

const Button = styled.a`
    display: block;
    text-transform: uppercase;
    color: white;
    font-size: 14pt;
    margin: 25px;
    padding: 10px 25px 10px 25px;
    border-radius: 15px;
    background-color: #B4D0FD;
    box-shadow: 0px 0px 25px #BCBCBC;
    text-decoration: none;
    `
    
const Topbar = () => (
    <Header>
        <Logo src={logo} alt="logo" />
        <Links>
            <Li><Button href="#">Connexion</Button></Li>
            <Li><Link className=".underline-from-left" css={link} to="/project">Projet</Link></Li>
            <Li><Link css={link} to="/team">Équipe</Link></Li>
        </Links>
            
    </Header>
)

export default Topbar
