import React              from 'react'
import styled             from 'styled-components'
import error              from '../images/error.png'
import {  Box, Header  }  from '../components/primatives'

const ErrorContainer = styled(Box)`
  height:           100vh;  
  flex-direction:   column;
  justify-content:  center;
  background:       url(${error}) no-repeat center left/contain; 
`
const ErrorHeader = styled(Header)`
  width:        100%;
  text-align:   center;  
  font-size:    clamp(2rem, 8vmin , 8rem);
  line-height:  clamp(2rem, 8vmin , 8rem);
  margin-top:   35%;
`
export default function NotFound() {
  return (
    <ErrorContainer>
      <ErrorHeader >
        Page not found!
        <span 
          role      = "img" 
          aria-label= "crying face">
          😢
        </span>
      </ErrorHeader>
    </ErrorContainer>
  )
}