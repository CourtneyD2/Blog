
import {ColorSwatch, MODS} from '../utils/colorSwatch'

const variations = 5;
const options = [MODS.MONOCHROMATIC]

export const Colors = {
  Primary:    ColorSwatch(274,  57,   58,   1, variations, options), //hsl(274, 57%, 58%)
  Warning:    ColorSwatch(57,   100,  59,   1, variations, options), //hsl(57, 100%, 59%)
  Success:    ColorSwatch(95,   62,   31,   1, variations, options), //hsl(95, 62%, 31%)
  Danger:     ColorSwatch(348,  83,   81,   1, variations, options), //hsl(348, 83%, 81%)
  Info:       ColorSwatch(197,  97,   66,   1, variations, options), //hsl(197, 97%, 66%)
  Neutral:    ColorSwatch(0,    0,    50,   1, variations, options), //hsl(0, 0%, 40%)
  Dark:       ColorSwatch(0,    0,    10,   1, variations, options), //hsl(0, 0%, 40%)
  Light:      ColorSwatch(0,    0,    90,   1, variations, options), //hsl(0, 0%, 40%)
}

const font = `system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
		'Apple Color Emoji', 'Segoe UI Emoji'`
const mono = `ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace`

const craftMedia = () => {
  let m = {}
  for (const prop in screenSizes) {
    m[prop] = `@media only screen and (min-width: ${screenSizes[prop]}em)`
  }
  return m
}

const screenSizes = {
    xs:   20,
    sm:   36,
    md:   47.25,
    lg:   62,
    xl:   75,
    hg:   90,
}

const media =  craftMedia();

const boxShadows = {
  xs: `0 0 0.25rem 0 hsla(0,0%,0%,0.7)`,
  sm: `0 0 0.5rem 0 hsla(0,0%,0%,0.7)`,
  md: `box-shadow: 0 0 1rem 0.25 hsla(0,0%,0%,0.7)`,
  lg: `0 0 2rem 0.125rem hsla(0,0%,0%,0.7)`,
  xl: `0 0 3rem 0.25rem hsla(0,0%,0%,0.7)`
}

const column = {
  '1'   :   8.3333333333,
  '2'   :  16.6666666667,
  '3'   :  25,
  '4'   :  33.3333333333,
  '5'   :  41.6666666667,
  '6'   :  50,
  '7'   :  58.3333333333,
  '8'   :  66.6666666667,
  '9'   :  75,
  '10'  :  83.3333333333,
  '11'  :  91.6666666667,
  '12'  :  100,
  '1/4' :  25,
  '2/4' :  50, 
  '3/4' :  75, 
  '1/3' :  33.3333333333,
  '2/3' :  66.6666666667,
  '1/2' :  50,
  'full':  100,
};

const borderRadius = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '4rem',
  pill: '50rem',
  circle: '50%'
}

const spacing = {
  base:       1,
  heading:    0.5,
  auto:       'auto',
  center:     '0 auto',  
}

const fontSize = {
  base:   1, 
  xs:     0.75,
  sm:     0.875,
  lg:     1.25,
  xl:     1.5,
  h1:     2.5,
  h2:     2, 
  h3:     1.75, 
  h4:     1.5, 
  h5:     1.25,
  h6:     1,
  d1:     5, 
  d2:     4.5,
  d3:     4,
  d4:     3.5,
  d5:     3,
  d6:     2.5,
  lead:   1.25, 
  sub:    0.75,
  sup:    0.75, 
  bq:     1.25, 
  bqfoot: 0.875, 
  legend: 1.5, 
}

const fontWeight = {
  lighter:  150, 
  light:    300, 
  normal:   400, 
  bold:     700, 
  bolder:   900,

  display:  300, 
  lead:     300, 
  heading:  500, 
}


const lineHeight = {
  base:   1.5,
  xs:     1,  
  sm:     1.25,
  md:     1.75, 
  lg:     2,
  xl:     2.5,
  heading:1.2,
}

const zIndex = {
  dropDown:   1000, 
  sticky:     1020, 
  fixed:      1030,
  modal_back: 1040,
  offCanvas:  1050, 
  modal:      1060,
  tooltip:    1070,
}
const TransTheme = {
  colors: {
    primary: Colors.Primary.monochromatic,
    warning: Colors.Warning.monochromatic, 
    danger: Colors.Danger.monochromatic, 
    success: Colors.Success.monochromatic, 
    info: Colors.Info.monochromatic, 
    neutral: Colors.Neutral.monochromatic,
    main_bg: Colors.Neutral.monochromatic[2],
    main_fg: Colors.Neutral.monochromatic[9],    
  } ,
  font_sans_serif: font,
  font_monospace: mono,
  screenSizes, 
  media,
  spacing,
  fontSize, 
  fontWeight, 
  lineHeight, 
  zIndex,
  boxShadows,
  borderRadius,
  column
}


export default TransTheme;