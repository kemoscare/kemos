import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

const StyledButton = styled.a`
    display: block;
    text-transform: uppercase;
    color: white;
    font-size: 15px;
    margin: 25px;
    padding: 10px 25px 10px 25px;
    border-radius: 12px;
    background-color: #B4D0FD;
    box-shadow: 0px 0px 25px #BCBCBC;
    text-decoration: none;
    `

const Button = ({ href, backgroundColor, children }) => (
    <StyledButton href={href} css={css`backgroundColor: ${backgroundColor}`}>{ children }</StyledButton>
)

export default Button
    
