import React                  from "react";
import styled                 from 'styled-components';
import {  ThemeProvider     } from 'styled-components';
import {  Layout            } from "../../components/Layout";
import {  CSSNormalization  } from '../../styles/normalize'
import {  Colors            } from '../../styles/colors'
import {  HSLToRGB          } from '../../utils/colorTypeConverter'

const SquareColor = styled.div`
  width:      20%;
  height:     5rem;
  background: ${props => props.bg || 'white'};
`
const SquareWrapper = styled.div`
  width:          100%;
  display:        flex;
  flex-direction: row;
`
const TypeBox = styled.div`
  width:          100%;
  margin-bottom:  0.5rem;
`

const ColorWraper = styled.div`
  width:          100%;
  margin-bottom:  2rem;

`
const SectionWraper = styled.div`
  width:          100%;
  display:        flex;
  flex-direction: column;
`
const adjustGamma =(p) => {
    if (  p <= 0.03928  ) { return p / 12.92  } 
    else                  { return Math.pow( ( p + 0.055 ) / 1.055, 2.4 ) }
}

function contrastRatio(a,b) {
    const   ratio = (  a + 0.05  ) / (  b + 0.05  )
    return  ratio >= 1 ? ratio : 1 / ratio
}

function getcontrastcolor(c){
  const rgb   = HSLToRGB( c.Hue, c.Saturation/100, c.Lightness/100  );
  const r     = adjustGamma( rgb.Red / 255 )
  const g     = adjustGamma( rgb.Green / 255 )
  const b     = adjustGamma( rgb.Blue / 255 )
  const rl    = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const black = contrastRatio(  rl, 0 )
  const white = contrastRatio(  1, rl )

  if (  black > white ) { return 'black'  }
  return 'white'
}

export default function ColorsIndexPage() {
  const colorArray = Object.entries(Colors)
  
  return (
    <ThemeProvider theme={Colors}>
    <CSSNormalization />
    <Layout>
      
      <SectionWraper>
        {
          colorArray.map((color, index) => {
            const colorTypes = Object.entries(color[1])            

            return (
              <>
              <ColorWraper key={index}>
                <h1>
                  {color[0]}
                </h1>
                   {colorTypes.map ((type, idx) => {
                     let block;
                     if (Array.isArray(type[1])){
                       block = (<SquareWrapper>
                                  {type[1].map ((c, id)=> {
                                    const contrast = getcontrastcolor(c)
                                    return (<SquareColor bg={c.CSS} key={id} style={{color: contrast}}>
                                              {c.CSS}
                                            </SquareColor>)  
                                  })
                                  }
                               </SquareWrapper>) 
                     } else {
                       const contrast = getcontrastcolor(type[1])
                       block = <SquareWrapper><SquareColor bg={type[1].CSS} style={{color: contrast}}>{type[1].CSS}</SquareColor></SquareWrapper>
                     }
                     return (<TypeBox key={idx}>
                              <h4>{type[0]}</h4>
                              {block}
                            </TypeBox>)
                   })} 
              </ColorWraper>
              <hr />
              </>
            )
          }
          
          )  
        }
      </SectionWraper>
    </Layout>
    </ThemeProvider>

  )

}