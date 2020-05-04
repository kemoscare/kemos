import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import logo from './logo.svg'

const Header = styled.div`
   padding:20px;
   margin:0;
   width: 100%;
   height: 160px;
    `
const Logo = styled.img`
    width: 360px;
    `
const Links = styled.ul`
    display: inline;
    `
const Li = styled.li`
    color: blue;
    `
    
const Topbar = () => (
    <Header>
        <Logo src={logo} alt="logo" />
        <Links>
            <Li><Link to="/project">Projet</Link></Li>
        </Links>
            
    </Header>
)

export default Topbar
