import React    from 'react'
import styled   from 'styled-components'

import {  Box, GatsbyStyledLink, Header } from './primatives'


const GameImage = styled.img`object-fit: contain;`

const FeaturedHeader = styled(Header)`
  width:      100%;
  text-align: center;
`
const FeaturedWrapper = styled(Box)`
  padding:          0;
  justify-content:  center;
  margin-bottom:    4rem;
`
const FeaturedLink = styled(GatsbyStyledLink)`width: 25%;`

export const Featured = ( props ) => {
 const {  featured, title } = props
  return (
          <FeaturedWrapper>
            <FeaturedHeader> {  title } </FeaturedHeader>
              { featured.map (  ( item  ) =>  <FeaturedLink
                                                key     = { item.game } 
                                                type    = 'text' 
                                                variant = 'primary' 
                                                to      = { item.game }>     
                                                <GameImage src  = { item.img  } /> 
                                              </FeaturedLink>
                              
              )}
          </FeaturedWrapper>
          )
} 