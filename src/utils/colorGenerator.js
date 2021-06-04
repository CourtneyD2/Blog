/*
  Creates a pallete swatch for a single HSL color
  outputs as CSS color strings
*/

import {roundDecimal, notWithinRange, constrainValue, scaleValue} from './helper'

const round           = Math.round;

const TRANSPARENTIZE  = 'TRANSPARENTIZE'
const COOL            = 'COOL'
const WARM            = 'WARM'
const SATURATE        = 'SATURATE'
const DESATURATE      = 'DESATURATE'
const LIGHTEN         = 'LIGHTEN'
const DARKEN          = 'DARKEN'
const COMPLEMENTRY    = 'COMPLEMENTRY'
const GREYSCALE       = 'GREYSCALE'

/*converts HSL string to numbers and returns array
 @parms {string} HSL sting in form hsl(H,S%,L%)
 @returns {objecy} HSL object with Hue, Saturation, Lightness and Aplha for use with other functions in this module
*/
export function HSL_StringToObject (HSL) {
	//confirm valid HSL string value
  let regex = /^hsl\s*\([0-9]+,\s*[0-9]+%,\s*[0-9]+%\s*\)\s*$/i;
  if (!regex.test(HSL)) return 'invalid string'
  let regexFormat = /[hsl()\s%]/gi;
  //remove unneeded characters
  HSL = HSL.replace(regexFormat, '');

  let HSLValues = HSL.split(',') 
  HSLValues.forEach( Value => {
    Value= parseInt(Value)
  });
  let _HSL = {Hue: HSLValues[0], Saturation: HSLValues[1], Lightness: HSLValues[2]};
  _HSL = normalizeHSL(_HSL) 
  return _HSL;
}

const validHSL = (HSL) => {
  if (!HSL.hasOwnProperty('Hue')||!HSL.hasOwnProperty('Saturation')||!HSL.hasOwnProperty('Lightness')) {
    console.error ('Missing Property, Should Have Keys Hue, Saturation and Lightness')  
    return ;
  }
  if (isNaN(HSL.Hue) || isNaN(HSL.Saturation) || isNaN(HSL.Lightness)) {
    console.error ('Should only have numbers in Hue, Saturation and Lightness')
    console.log (HSL)  
    return ;
  }
  return true 
}

const normalizeHSL = (HSL) => {
  let  _hue = round(HSL.Hue);
  const modifier = (_hue < 0) ? 360 : -360;
  while (notWithinRange(_hue, 0, 359)){_hue += modifier;}

  const Hue = _hue; //ensures hue is between 0 and 359
  const Saturation = constrainValue(0, 100, round(HSL.Saturation));
  const Lightness = constrainValue(0, 100, round(HSL.Lightness)); 
  const Alpha = (HSL.Alpha) ? constrainValue(0, 1, roundDecimal(HSL.Alpha)) : 1;
  return {Hue, Saturation, Lightness, Alpha} 
}

export function HSL_Color (HSL) {
  if ( !validHSL(HSL)) return ;      
  const {Hue, Saturation, Lightness, Alpha} = normalizeHSL (HSL);

  const 
    color = 
      { Hue: Hue,
        Saturation: Saturation,
        Lightness: Lightness,
        Alpha: Alpha,
        _CSS: (Alpha < 1) 
          ? `hsla(${Hue},${Saturation}%,${Lightness}%, ${Alpha})` 
          : `hsl(${Hue},${Saturation}%,${Lightness}%)`
      }

  return color;
}

/* Creates a color Swatch with many variations
 @params {object} in form of {Hue: X, Saturation: X, Lightness: X}
    where saturation and lightness are in form 0 to 100
 @params {number} variations, amount of variations you wish to create for each option
 @params {Boolean} CSSOnly, Sets whehter or not to return CSS only version or full objects
 @returns {object} containining color variations based on color given
*/
export function HSL_ColorSwatch(HSL, CSSOnly = false, IncludeHalfValues = false) {  
  const base = HSL_Color(HSL);

  const swatch = {
    HSL:  { Hue: base.Hue, 
            Saturation: base.Saturation, 
            Lightness: base.Lightness, 
            Alpha: base.Alpha}, //so can modify on fly if needed
    base: base._CSS,

    transparentized:  HSL_CreateSet(base, TRANSPARENTIZE, CSSOnly, IncludeHalfValues),
    warmed:           HSL_CreateSet(base, WARM,           CSSOnly, IncludeHalfValues),
    cooled:           HSL_CreateSet(base, COOL,           CSSOnly, IncludeHalfValues), 
    saturated:        HSL_CreateSet(base, SATURATE,       CSSOnly, IncludeHalfValues),
    desaturated:      HSL_CreateSet(base, DESATURATE,     CSSOnly, IncludeHalfValues), 
    lightened:        HSL_CreateSet(base, LIGHTEN,        CSSOnly, IncludeHalfValues),     
    darkened:         HSL_CreateSet(base, DARKEN,         CSSOnly, IncludeHalfValues),

    complementry:     HSL_Modify_Color(base, COMPLEMENTRY)._CSS, 
    greyscale:        HSL_Modify_Color(base, GREYSCALE)._CSS,
  }; 

  return swatch;
}

export function HSL_Color_Palette (HSLList, CSSOnly =false, IncludeHalfValues = false) {
  let Palette = {}
  for (const key in HSLList) {
    if (HSLList.hasOwnProperty.call(HSLList, key)) {
      var item = HSLList[key]
      Palette[key] = HSL_ColorSwatch(item, CSSOnly, IncludeHalfValues);      
    }
  }
  return Palette;
}

/*Creates a set of a particular transformation and returns
  an object with the CSS strings for the transformation is CSS only is true
  otherwise will returh an object of HSL color objects
  @params {Object} Color is the HSL color to modify
  @params {int} how many of a particular set do you want
  @params {modification} a function for the type of modification
  @returns {object} containing either color objets or is CSSonly selected just CSS Strings
*/
export function HSL_CreateSet (HSL, modification, CSSOnly, IncludeHalfValues ) {
  let newSet = {}  
  for (let count = 1; count <= 9; count++){
    let type = `_${count*10}`
    let modifier = (count*0.1).toFixed(2);
    let color = HSL_Modify_Color(HSL, modification, modifier);
    newSet[type] = 
      (CSSOnly) 
        ? color._CSS
        : color
        
    if (IncludeHalfValues) {
      let type = `_${(count+0.5)*10}`
      let modifier = ((count+0.5)*0.1).toFixed(2);
      let color = HSL_Modify_Color(HSL, modification, modifier);
      newSet[type] = 
        (CSSOnly) 
          ? color._CSS
          : color    
    }
  }  
  return newSet;
}

/*
  Takes an HSL color object and modifies it as specified by modfication parameter
  @params {object} HSL, a color object containing at least Hue, Saturation, Lightness
  @params {string} modification, the type of color modifcation being done
  @params {float} factor, a number between 0 and 1 for the specficed modification
  @returns {object} HSL color object
*/
export function HSL_Modify_Color (HSL, modification, factor){
  if ( !validHSL(HSL)) return ;      
  const _HSL = normalizeHSL (HSL);
  factor = roundDecimal(constrainValue(0, 1, factor));

  let Hue  = _HSL.Hue;
  let Saturation = _HSL.Saturation;
  let Lightness = _HSL.Lightness;
  let Alpha = (_HSL.Alpha) ? HSL.Alpha : 1;
  
  let HueDecimal = roundDecimal(Hue/360);
  let SaturationDecimal = roundDecimal(Saturation /100);
  let LightnessDecimal = roundDecimal(Lightness /100);    

  switch(modification.toUpperCase()) {
  case TRANSPARENTIZE:
    Alpha = Alpha*factor;
    break;
  case WARM:
    Hue = (Hue > 180) 
      ? scaleValue(HueDecimal, 1, factor) * 360
      : scaleValue(HueDecimal, 0, factor) * 360;
    break;
  case COOL:
    Hue = scaleValue(HueDecimal, 0.5, factor) * 360; 
    break;  
  case SATURATE:      
    Saturation =  scaleValue(SaturationDecimal, 1, factor) * 100;
    break;
  case DESATURATE:
    Saturation = scaleValue(SaturationDecimal, 0, factor) * 100;
    break;
  case LIGHTEN:
    Lightness = scaleValue(LightnessDecimal, 1, factor) * 100;
    break;
  case DARKEN:
    Lightness = scaleValue(LightnessDecimal, 0, factor) * 100;
    break;
  case COMPLEMENTRY:
    Hue += 180;
    break;
  case GREYSCALE:    
    Lightness = 0;  
    break;
  default:
    break;    
  }
  return HSL_Color ({Hue, Saturation, Lightness, Alpha});
}


