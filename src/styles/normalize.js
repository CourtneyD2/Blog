/*! Based on normalize.css v3.0.2 | MIT License | git.io/normalize 
* COnverted to sytled compoents global for use in react projects
*/
import {  createGlobalStyle  } from 'styled-components';

export const CSSNormalization = createGlobalStyle`

*, *::before, *::after {
	box-sizing: 				border-box;
  background-repeat: 	no-repeat;
}

::before,
::after {
  text-decoration: 	inherit;
  vertical-align: 	inherit;
}

:root {
	-moz-tab-size: 	2;
	tab-size: 			2;
	line-height: 		1.15; 	
  cursor: 				default;
  word-break: 		break-all;
	font-size: 			100%;
	-webkit-text-size-adjust: 100%;
}

body {
	margin: 	0;
  padding: 	0;
	font-family:
		system-ui,
		-apple-system, 
		'Segoe UI',
		Roboto,
		Helvetica,
		Arial,
		sans-serif,
		'Apple Color Emoji',
		'Segoe UI Emoji';
}

hr {
	height: 0;
	color: 	inherit; 
}

nav ol, nav ul {
  list-style: none;
  padding: 		0;
}

audio, canvas, iframe, img, svg, video {  vertical-align: middle;  }

iframe,
img,
input,
select,
textarea {
  height: 		auto;
  max-width: 	100%;
}

abbr[title] {  text-decoration: underline dotted;  }

svg:not([fill]) {  fill: currentColor;  }

b, strong {	font-weight: bolder;  }

code, kbd, samp, pre {
	font-family:
		ui-monospace,
		SFMono-Regular,
		Consolas,
		'Liberation Mono',
		Menlo,
		monospace; 
	font-size: 1em;
}

small {  font-size: 80%;  }

sub,
sup {
	font-size: 			75%;
	line-height: 		0;
	position: 			relative;
	vertical-align: baseline;
}

sub {  bottom: -0.25em;  }

sup {  top: -0.5em;  }

table {
	text-indent: 		0; 
	border-color: 	inherit;
  border-collapse:collapse;
}

a, area, button, input, label, select, summary, textarea, [tabindex] {
  -ms-touch-action: manipulation;
  touch-action: 		manipulation;
}

button,
input,
optgroup,
select,
textarea {
	font-family: 		inherit; 
	font-size: 			100%; 
  letter-spacing: inherit;
	line-height: 		1.15; 
	margin: 				0; 
  color: 					inherit;
  padding: 				0.25em 0.375em;
  border: 				1px solid WindowFrame;
}

[type="color"],
[type="range"] {
  border-width: 0;
  padding: 			0;
}

select {
  -moz-appearance: 		none;
  -webkit-appearance: none;
  background: 				no-repeat right center / 1em;
  border-radius: 			0;
  padding-right: 			1em;
}

select:not([multiple]):not([size]) {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4'%3E%3Cpath d='M4 0h6L7 4'/%3E%3C/svg%3E");
}

::-ms-expand {	display: none;	}

:-ms-input-placeholder {  color: rgba(0, 0, 0, 0.54);	 }

textarea {	resize: vertical; }

button,
select { 	text-transform: none;  }


button,
[type='button'],
[type='reset'],
[type='submit'] {  -webkit-appearance: button;  }

::-moz-focus-inner {
	border-style: none;
	padding: 			0;
}

:-moz-focusring {	outline: 1px dotted ButtonText;	}

:-moz-ui-invalid {	box-shadow: none;}

legend {	padding: 0;	}

progress {	vertical-align: baseline;}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {	height: auto;	}

[type='search'] {
	-webkit-appearance: textfield; /* 1 */
	outline-offset: 		-2px; /* 2 */
}

::-webkit-search-decoration {	-webkit-appearance: none;	}

::-webkit-file-upload-button {
	-webkit-appearance: button; /* 1 */
	font: 							inherit; /* 2 */
}

summary {	display: list-item;	}

[aria-busy="true"] {	cursor: progress;	}

[aria-controls] {	cursor: pointer;	}

[aria-disabled="true"], [disabled] {	cursor: default;	}

[aria-hidden="false"][hidden] {	display: initial;	}

[aria-hidden="false"][hidden]:not(:focus) {
  clip: 		rect(0, 0, 0, 0);
  position: absolute;
}
 
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-delay: 						-1ms !important;
    animation-duration: 				1ms !important;
    animation-iteration-count: 	1 !important;
    background-attachment: 			initial !important;
    scroll-behavior: 						auto !important;
    transition-delay: 					0s !important;
    transition-duration: 				0s !important;
  }
}
`
