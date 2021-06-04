export function roundDecimal(Decimal) {return Math.round(Decimal*100) / 100}

export function withinRange(number, min, max){return (number >= min && number <= max)}

export function notWithinRange (number, min, max){return (number < min || number > max)}

const round = Math.round;
const absolute = Math.abs;

//returns object with Hue, Saturation, Lightness componenets
//convert to numbers before using function
export function HSLToRGB (Hue, Saturation, Lightness) {
  if (isNaN(Hue) || isNaN(Saturation) || isNaN(Lightness)) return 'Invaild'

  const modifier = (Hue<0) ? 360 : -360;
  while (notWithinRange(Hue, 0, 359)){Hue += modifier;}

  if(Saturation < 0) {Saturation = 0}
  if(Saturation > 1) {Saturation = 1}
  
  if(Lightness < 0) {Lightness = 0}
  if(Lightness > 1) {Lightness = 1}

  Hue = Math.round(Hue); //ensures hue is an integer   
  const C = (1 - absolute((2 * Lightness) -1 )) * Saturation; 
  const X = C * (1 - absolute( ((Hue / 60) % 2) - 1)); 
  const m = Lightness - (C / 2);

  let _red, _green, _blue;
  
  if (withinRange(Hue, 0, 59)) {
    _red = C; 
    _green = X; 
    _blue = 0;
  }

  if (withinRange(Hue, 60, 119)) {
    _red = X; 
    _green = C; 
    _blue = 0;
  }

  if (withinRange(Hue, 120, 179)) {
    _red = 0; 
    _green = C; 
    _blue = X;
  }

  if (withinRange(Hue, 180, 239)) {
    _red = 0; 
    _green = X; 
    _blue = C;
  }

  if (withinRange(Hue, 240, 299)) {
    _red = X; 
    _green = 0; 
    _blue = C;
  }

  if (withinRange(Hue, 300, 359)) {
    _red = C; 
    _green = 0; 
    _blue = X;
  }

  return {
    Red: Math.round((_red+m)*255),
    Green: Math.round((_green+m)*255),
    Blue: Math.round((_blue+m)*255)
  }

}

//returns object with Red, Green, Blue componenets
//convert to numbers before using function
export function RGBToHSL(_red, _green, _blue){
  //escape hatch, validate values before proceeding
	if (  notWithinRange(_red, 0, 255) 
      ||notWithinRange(_green, 0, 255) 
      ||notWithinRange(_blue, 0, 255)) 
      return false;

	const Red   = _red   / 255;
  const Green = _green / 255;
  const Blue  = _blue  / 255;
  
  const min = Math.min(Red, Green, Blue);
  const max = Math.max(Red, Green, Blue);
  
  const Max_MINUS_Min = max - min;
  const Max_PLUS_Min  = max + min; 
  
  let Hue = 0;
  let Saturation = Hue;
  let Lightness = Max_PLUS_Min / 2;
  
  if (min !== max) {
  	
    Saturation = (Lightness <= 0.5) 
    		? Max_MINUS_Min / Max_PLUS_Min
      	: Max_MINUS_Min / (2.0 - Max_MINUS_Min);
    
    if      (Red === max)   {Hue = (Green-Blue) / Max_MINUS_Min;}
    else if (Green === max) {Hue = 2.0 + (Blue-Red) / Max_MINUS_Min;}
    else if (Blue === max)  {Hue = 4.0 + (Red-Green) / Max_MINUS_Min;}
   }
     
  Hue = round(Hue*60);
  Saturation = roundDecimal(Saturation);
  Lightness = roundDecimal(Lightness) / 100;
  
	return {Hue,Saturation,Lightness};
}
