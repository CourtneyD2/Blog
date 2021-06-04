export const MODS = { 
  COOL            : 'COOL',
  WARM            : 'WARM',
  SATURATE        : 'SATURATE',
  DESATURATE      : 'DESATURATE',
  TONE            : 'TONE',
  LIGHTEN         : 'LIGHTEN',
  TINT            : 'TINT',
  DARKEN          : 'DARKEN',
  SHADE           : 'SHADE', 
  COMPLEMENTRY    : 'COMPLEMENTRY',
  GREYSCALE       : 'GREYSCALE',
  ANALAGOUS       : 'ANALAGOUS',
  TRIADIC         : 'TRIADIC',
  SPLIT_COMPLEMENT: 'SPLIT_COMPLEMENT',
  TETRADIC_AL     : 'TETRADIC_AL',
  TETRADIC_AR     : 'TETRADIC_AR',
  SQUARE          : 'SQUARE',
  MONOCHROMATIC   : 'MONOCHROMATIC',
}
const ALL             = Object.values(MODS);
const CHUNK           = 360 / 12;

const notWithinRange = (number, min, max) => number < min || number > max;
const roundDecimal = (Decimal) => Math.round(Decimal*100) / 100
const scaleValue = (value, to, interval) => value + ((to - value) * interval)

const constrainValue = (min, max, value) => {
  if (value < min) return min;
  if (value> max) return max;
  return value;
}

const normailizeHue = (hue) => {
  let  _hue = Math.round(hue);
  const modifier = (_hue < 0) ? 360 : -360;

  while (notWithinRange(_hue, 0, 359)){_hue += modifier;}
  
  return _hue
}

const createItem = (color, mod, factor) => { 
  const sets = [MODS.WARM, MODS.COOL, MODS.SATURATE, MODS.DESATURATE, MODS.TONE, MODS.DARKEN, MODS.SHADE, MODS.LIGHTEN, MODS.TINT]
  const modification = [MODS.COMPLEMENTRY, MODS.GREYSCALE]
  const palettes = [MODS.ANALAGOUS, MODS.TRIADIC, MODS.SPLIT_COMPLEMENT, MODS.TETRADIC_AL, MODS.TETRADIC_AR, MODS.SQUARE, MODS.MONOCHROMATIC]

  if (sets.includes(mod)) return createSet (color, mod, factor)
  if (modification.includes(mod)) return ModifyColor (color, mod, factor)
  if (palettes.includes(mod)) {
    if (mod === MODS.TETRADIC_AL || mod === MODS.TETRADIC_AR) 
      return tetradicColor(color, mod === MODS.TETRADIC_AL ? -1 : 1) 
    if (mod === MODS.ANALAGOUS) return AnalagousColors(color)        
    if (mod === MODS.TRIADIC) return TRIADICCOLOR(color);        
    if (mod === MODS.SPLIT_COMPLEMENT) return split_complement(color)        
    if (mod === MODS.SQUARE) return squareColor(color)        
    if (mod === MODS.MONOCHROMATIC) return monochromatic(color, factor)        
  }
  return color
}  

const ModifyColor = (color, modification, factor) => {
  let Hue  = color.Hue;
  let Saturation = color.Saturation;
  let Lightness = color.Lightness;
  let Alpha = (color.Alpha) ? color.Alpha : 1;

  const HueDecimal = roundDecimal(Hue/360);
  const SaturationDecimal = roundDecimal(Saturation /100);
  const LightnessDecimal = roundDecimal(Lightness /100);
  
  let goto = 0;
  const maxMod = 0.50;
  
  switch(modification.toUpperCase()) {
    case MODS.WARM:
      if (Hue >= 180) goto = HueDecimal + (roundDecimal((1 - HueDecimal)/2))
      else goto = HueDecimal/2;
      Hue = scaleValue(HueDecimal, goto, factor) * 360
      break;
    case MODS.COOL:
      if (Hue>=180) goto = 0.5 + ((HueDecimal-0.5) /2)
      else goto = 0.5 - ((0.5-HueDecimal)/2)
      Hue = scaleValue(HueDecimal, goto, factor) * 360;   
      break;
    case MODS.SATURATE:    //saturates by facotr to smaller of double or 1, keeps color more related
      goto = Math.min(0.95, SaturationDecimal + maxMod) 
      if (Saturation >= 85) { goto = 1}  
      Saturation  = scaleValue(SaturationDecimal, goto, factor) * 100
      break;
    case MODS.TONE:
    case MODS.DESATURATE:  //desaturates by facotr towards 1/2 saturation;keeps color more related
      goto = Math.max(0, SaturationDecimal - maxMod) 
      Saturation  = scaleValue(SaturationDecimal, goto, factor) * 100;
      break;
    case MODS.TINT:
    case MODS.LIGHTEN:     //lightens by factor to smaller of double or 1; keeps color more related
      goto = Math.min(0.95, LightnessDecimal + maxMod) 
      if (Lightness >= 85) { goto = 1} 
      Lightness = scaleValue(LightnessDecimal, goto, factor) * 100
      break;
    case MODS.SHADE:
    case MODS.DARKEN:     //darkens by factor towards 1/2 saturation; keeps color more related
      goto = Math.max(0, LightnessDecimal - maxMod) 
      Lightness = scaleValue(LightnessDecimal, goto, factor) * 100;
      break;
    case MODS.COMPLEMENTRY:
      Hue += 180;
      break;
    case MODS.GREYSCALE:    
      Saturation = 0;  
      break;
    default:break;
  }
  return Color (  Hue, Saturation, Lightness, Alpha )
}

const AnalagousColors = 
  (color) => [
    Color ( color.Hue-CHUNK,color.Saturation, color.Lightness, color.Alpha  ),
    Color ( color.Hue+CHUNK,color.Saturation, color.Lightness, color.Alpha  )
  ]

const TRIADICCOLOR = 
  (color) => [
    Color ( color.Hue+(4*CHUNK),color.Saturation, color.Lightness, color.Alpha  ),
    Color ( color.Hue-(4*CHUNK),color.Saturation, color.Lightness, color.Alpha  ),  
  ]

const split_complement = (color) => [
  ...AnalagousColors(color),
  ModifyColor(color, MODS.COMPLEMENTRY)
]

const tetradicColor = 
    (color, direction = 1) => [
      Color(  color.Hue+(direction*2*CHUNK), color.Saturation, color.Lightness, color.Alpha ),
      Color(  color.Hue+(direction*6*CHUNK), color.Saturation, color.Lightness, color.Alpha ),
      Color(  color.Hue+(direction*8*CHUNK), color.Saturation, color.Lightness, color.Alpha ),
    ]    

const squareColor = 
  (color) => [
    Color(  color.Hue+(3*CHUNK), color.Saturation, color.Lightness, color.Alpha ),
    Color(  color.Hue+(6*CHUNK), color.Saturation, color.Lightness, color.Alpha ),
    Color(  color.Hue+(9*CHUNK), color.Saturation, color.Lightness, color.Alpha )
  ]

const monochromatic = 
  (color, factor = 1) => [ 
    ...createSet(color, MODS.DARKEN, factor).reverse(),
    color,          
    ...createSet(color, MODS.LIGHTEN, factor)
  ] 

const createSet = (color, modification, factor) => {
    let max = Math.floor (1 / factor);       
    let set = [];

    for (let i = 0; i < max; i++){
      set[i] = ModifyColor(color, modification, (i+1)*factor)
    }

    return set;
}

export function Color (Hue, Saturation, Lightness, Alpha) {
  const _hue = normailizeHue(Hue);
  const _saturation = constrainValue(0, 100, Math.round(Saturation));
  const _lightness = constrainValue(0, 100, Math.round(Lightness)); 
  const _alpha = (Alpha) ? constrainValue(0, 1, roundDecimal(Alpha)) : 1;

  return  {   Hue: _hue,
              Saturation: _saturation,
              Lightness: _lightness,
              Alpha: _alpha,
              CSS: `hsla( ${_hue},  ${_saturation}%,  ${_lightness}% , ${_alpha} )` 
          }
}

export function ColorSwatch ( Hue = 0, Saturation = 0, Lightness = 0, Alpha = 1, 
                              variations = 1, options = ALL) {
  let color = Color(Hue, Saturation,Lightness, Alpha);
  color.variations = variations;
  const factor = 1 / variations;

  let swatch = {color}

  options.forEach (
    (option) => 
        swatch[`${option.toLowerCase()}`] = createItem (color, option, factor)
  );

  return swatch;
}
