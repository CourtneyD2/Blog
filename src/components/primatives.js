import { Link } from "gatsby";
import styled , { css } from 'styled-components';
import {HSLToRGB} from '../utils/colorTypeConverter'
export const makeFlex = css`
  display: flex;
  justify-content:center;
  align-items:    center;
  flex-direction: row;
  flex-wrap:      wrap;
`
const prepareButton = css`
  min-width:  64px;
  min height: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  outline: none;
  border: none;
  transition: transform 150ms ease, box-shadow: 150ms ease ;

  &:focus, &:hover {
    --shadow: 0 0 0.75rem -0.01rem rgba(0,0,0,0.5);
    --ring-color: transparent;
    --ring-offset-color: transparent; 
    transform: scale(1.02);
    box-shadow: var(--all-shadows);
  }

  &:active {
    --shadow: 0 0 0.25rem 0 rgba(0,0,0,0.5);
    transform: scale(1);
    box-shadow: var(--all-shadows);
  }

  &:focus-visible {
    --ring-color: ${props => props.bg_color[5].CSS};
    --ring-offset-color: ${props => props.theme.colors.main_bg.CSS}; 
    box-shadow: var(--all-shadows);
  }
`
export const textFlow = css`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`
const outlineButton = css`
  border: 2px solid ${props => props.bg_color[5].CSS} ; 
  background-color: ${props => props.theme.colors.main_bg.CSS};  
  color:            ${props => props.bg_color[5].CSS};  
  
  &:focus, &:hover {
   color:  ${props => props.fg_color}
  }
`
const buttonButton = css`
  background-color: ${props => props.bg_color[5].CSS};
  color:            ${props => props.fg_color};
  
  &:focus, &:hover {
    background-color: ${props => (props.bg_color[6].CSS)};
    color:  ${props => getcontrastcolor(props.bg_color[6])}
  }
`
const textButton = css`
  background-color: transparent; 
  color:            ${props => props.bg_color[5].CSS};

  &:focus, &:hover {
    background-color: ${props => (props.bg_color[6].CSS)};
    color:  ${props => getcontrastcolor(props.bg_color[6])}
  }
`
export const Header = styled.h1`
  ${props=>textFlow}
  margin: 0 auto;
  margin-bottom: 1rem;
  font-size: clamp(1.5rem, 3vmin , 3rem);
  line-height: clamp(1.5rem, 3vmin , 3rem);
`
export const Paragraph = styled.p`
  ${props=>textFlow}
  margin: 0 ;
  font-size: clamp(1rem, 1.5vmin , 1.25rem);
  line-height: clamp(1rem, 2vmin ,1.25rem);
`
export const Box= styled.div`
  width:          100%;
  padding:        ${props => props.theme.spacing.base}rem;
  margin:         0 auto;
  ${props => makeFlex}
`
export const Button = styled.button.attrs(props => ({
  bg_color  : props.variant 
                ? props.theme.colors[props.variant] 
                : props.theme.colors.neutral,
  bg_len    : props.variant 
              && props.theme.colors[props.variant].length,
  fg_color  : props.color 
                ? props.theme.colors[props.color] 
                : getForground(props.variant,props.theme, props.type)
                 
}))`
${props => prepareButton}
${props => props.type === 'outline' && outlineButton}
${props => props.type === 'text' && textButton}
${props => props.type === 'button' && buttonButton}
`
export const GatsbyButton = styled(Link).attrs(props => ({
  bg_color  : props.variant 
                ? props.theme.colors[props.variant] 
                : props.theme.colors.neutral,
  bg_len    : props.variant 
              && props.theme.colors[props.variant].length,
  fg_color  : props.color 
                ? props.theme.colors[props.color] 
                : getForground(props.variant,props.theme, props.type)
                 
}))`
text-decoration: none;
${props => prepareButton}
${props => props.type === 'outline' && outlineButton}
${props => props.type === 'text' && textButton}
${props => props.type === 'button' && buttonButton}

&:hover, &:focus {
  text-decoration: underline;
}

`
export const Line = styled.hr`
  width: 100%;
  ${props => props.variant && `border-color: ${props.theme.colors[props.variant][5].CSS}`}
`
export const ExternalLink = styled.a`
  color: ${props => props.theme.colors[props.variant][5].CSS};

  &:link {
    color: ${props => props.theme.colors[props.variant][5].CSS};
  }
  &:visited {
     color: ${props => props.theme.colors[props.variant][4].CSS};
  }
  &:hover {
    color: ${props => props.theme.colors[props.variant][6].CSS};
  }
  &:active {
    color: ${props => props.theme.colors[props.variant][2].CSS};
  }
`
export const GatsbyStyledLink = styled(Link)`
  color: ${props => props.theme.colors[props.variant][5].CSS};

  &:link {
    color: ${props => props.theme.colors[props.variant][5].CSS};
  }
  &:visited {
     color: ${props => props.theme.colors[props.variant][4].CSS};
  }
  &:hover {
    color: ${props => props.theme.colors[props.variant][6].CSS};
  }
  &:active {
    color: ${props => props.theme.colors[props.variant][2].CSS};
  }
`

const getForground = (v, t, type) => {
  if (v) return getcontrastcolor(t.colors[v][5])
  
  if (type === 'outline' || type ==='text') return getcontrastcolor(t.colors.main_bg)
  
  return getcontrastcolor(t.colors.neutral[5])
}

const adjustGamma =(p) => {
    if (p <= 0.03928) {
        return p / 12.92;
    } else {
        return Math.pow( ( p + 0.055 ) / 1.055, 2.4 );
    }
}

function contrastRatio(a,b) {
    const ratio = (a + 0.05) / (b + 0.05);
    return ratio >= 1 ? ratio : 1 / ratio;
}

function getcontrastcolor(c){
  const rgb= HSLToRGB(c.Hue, c.Saturation/100, c.Lightness/100);
  const r = adjustGamma( rgb.Red / 255 );
  const g = adjustGamma( rgb.Green / 255 );
  const b = adjustGamma( rgb.Blue / 255 );
  const rl = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const black = contrastRatio(rl, 0);
  const white = contrastRatio(1, rl);
  if (black>white) {return 'black'}
  return 'white'
}