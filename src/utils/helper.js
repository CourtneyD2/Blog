export function roundDecimal(Decimal) {return Math.round(Decimal*100) / 100}

export function withinRange(number, min, max){return (number >= min && number <= max)}

export function notWithinRange (number, min, max){return (number < min || number > max)}

export function constrainValue (min, max, value){
  if (value < min) return min;
  if (value> max) return max;
  return value;
} 

export function scaleValue(value, to, interval) {return (value + ((to - value) * interval));}