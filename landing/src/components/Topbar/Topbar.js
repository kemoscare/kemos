import React from 'react'
import Button from '../Button'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import logo from './logo.svg'
import '../../utils/hover.css'

const Header = styled.div`
   margin:0;
   width: 100%;
   height: 120px;
    `
const Logo = styled.img`
    margin: 30px 0 0 30px;
    width: 280px;
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
    font-size: 15px;
    text-transform: uppercase;
    text-decoration: none;
    color: rbg(65, 65, 93);
    margin: 35px 20px 30px 20px;
    padding: 3px;
    &:hover {
        box-shadow: inset 0 -3px 0 0 #FE6361; 
    }
    `

const Topbar = () => (
    <Header>
        <Logo src={logo} alt="logo" />
        <Links>
            <Li><Button href="#" backgroundColor='#B4D0FD'>Connexion</Button></Li>
            <Li><Link className=".underline-from-left" css={link} to="/project">Projet</Link></Li>
            <Li><Link css={link} to="/team">Équipe</Link></Li>
        </Links>
            
    </Header>
)

export default Topbar
