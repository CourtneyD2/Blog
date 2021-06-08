import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import {Code} from './src/components/code'
import TransTheme from './src/styles/colors'
import { ThemeProvider } from 'styled-components';
import {CSSNormalization} from './src/styles/normalize'
import {createGlobalStyle} from 'styled-components';
import {Paragraph} from './src/components/primatives'

const components = {
  p : Paragraph,
  pre: ({ children: { props } }) => {
    if (props.mdxType === 'code') {
      return (
       <Code
         codeString={props.children.trim()}
         language={props.className && props.className.replace('language-', '')}
         {...props}
       />
     );
   }
  }
}

const GlobalStyle = createGlobalStyle`
  *{
    --shadow: 0 0 #0000;
    --glow: 0 0 #0000;
    --well: inset 0 0 #0000;
    --ring-color: transparent;
    --ring-offset: 0.25rem;
    --ring-offset-color: tranparent;
    --ring:  0 0 0 calc(3px + var(--ring-offset)) var(--ring-color);
    --inner-ring: 0 0 0 var(--ring-offset) var(--ring-offset-color);
    --full-ring: var(--inner-ring), var(--ring);
    --all-shadows: var(--well), var(--full-ring), var(--shadow), var(--glow);   
    --transition-vslow:   750ms;
    --transition-slow:    500ms;
    --transition-normal:  350ms;
    --transition-fast:    250ms;
    --transition-vfast:   150ms;

  }
  *::selection {
    background: ${props => props.theme.colors.danger[5].CSS};
    color: black;
  }
  a::selection {
      background: ${props => props.theme.colors.info[5].CSS};
  }
  h1::selection {
    text-shadow: 2px 2px ${props => props.theme.colors.info[3].CSS};;
  }
  body, html {
    height: 100vh;
    background-color: ${props => props.theme.colors.neutral[1].CSS};
    color:            ${props => 
                          props.theme.colors.neutral[props.theme.colors.neutral.length-1].CSS};
  }`

export const rootWrapper = ({ element }) => {
return (
  <ThemeProvider theme={TransTheme}>
    <CSSNormalization />
    <GlobalStyle />
    <MDXProvider components={components}>
      {element}
    </MDXProvider>
  </ThemeProvider> 
);
}
