import React  from 'react'
import styled from 'styled-components'

import {  UseSiteMetadata } from '../hooks/use-site-metadata'
import {  Header          } from './header'
import {  Box             } from './primatives'

const Outer = styled(Box)`
  padding: 0;

  ${props => props.theme.media.md}{
    padding: ${props => props.theme.spacing.base*2.5}rem;
  }
`

const LayoutBox= styled(Box)`  
  min-width:        ${props => props.theme.screenSizes.xs}em;  
  background-color: ${props => props.theme.colors.neutral[2].CSS};

  ${props => props.theme.media.md}{
    width:          ${props => props.theme.column['11']}%;
    border-radius:  ${props => props.theme.borderRadius.md}; 
    box-shadow:     ${props => props.theme.boxShadows.lg};
  }
  ${props => props.theme.media.lg}{
    width:          ${props => props.theme.column['10']}%;
  }
`

const Main = styled(Box)`
  flex-direction: column-reverse;
  flex-wrap:      nowrap;
  align-items:    stretch;
  
  ${props => props.theme.media.md}{}
`
const PostSection = styled(Box)`  
  border-radius: ${props => props.theme.borderRadius.md};

  ${props => props.theme.media.md}{
    margin-right: ${props => props.theme.spacing.base*0.5}rem;

  }

`
const SideBar = styled(Box)`
  border-radius:  ${props => props.theme.borderRadius.md};
  box-shadow:     ${props => props.theme.boxShadows.xs};
  padding:        0;
  margin-top:     1rem;
`
const Footer = styled(Box)`justify-content: center;`

export const Layout = (  {  children }  ) => {
  const { title, description } = UseSiteMetadata();
  return (
    <Outer>
    <LayoutBox>
      <Header 
        siteTitle       = {  title       } 
        siteDescription = {  description } />
      <Main as  = 'main'>
        <PostSection as = 'section'>{  children  }</PostSection>
        <SideBar as = 'section'></SideBar>
      </Main>
      <Footer as = 'footer'>  Copyright 2014  </Footer>
    </LayoutBox>  
    </Outer>
  );
};