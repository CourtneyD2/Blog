import React  from 'react'
import theme  from 'prism-react-renderer/themes/okaidia'
import styled from 'styled-components'

import Highlight, { defaultProps } from 'prism-react-renderer'
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live'

import {  copyToClipboard } from '../utils/copy-to-clipboard';
import {  Button          } from './primatives' 

/*
  A compenent for helping format and display code blocks
  this does incorporate react live just for those times in
  which we want to post editable and testable segments.
  The main purpose is for displaying code and allowing people
  to easily copy said code if they wish.
  To acomplish this I use prism-react-renderer, 
  main theme: okaidia
*/

const Pre = styled.pre`
  width: 100%;
  position: relative;
  text-align: left;
  margin: 1rem auto;
  padding: 0.5rem;
  overflow-x: auto;
  border-radius: 1rem;

  & .token-line {
    line-height: 1.3rem;
    height: 1.3rem;
  }
  font-family: 'Courier New', Courier, monospace;
`;

const LineNo = styled.span`
  display: inline-block;
  margin-left: 0.25rem;
  width: 2em;
  user-select: none;
  opacity: 0.3;

`;

const CopyCode = styled(Button)`
  position: absolute;
  top: 0;
  right: 0rem;
  border: 0;
  border-radius: 1rem;
  margin: 0.25rem;
  color: black;
  &:hover {
    opacity: 1;
  }
`;

export const Code = ({ codeString, language, ...props }) => {
   const handleClick = () => {copyToClipboard(codeString);};
     
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={theme}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}>
      {({
        className,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <Pre className={className} style={style}>
          <CopyCode 
            variant='info' 
            type='button' 
            onClick={handleClick}
          >
            Copy
          </CopyCode>
          
          <div style={{height: '2rem'}} />

          {tokens.map((line, i) => (
            <div 
              {...getLineProps({ line, key: i })}
            >
              <LineNo>
                {i + 1}
              </LineNo>

              {line.map((token, key) => (
                <span 
                  {...getTokenProps({ token, key })} 
                />
                
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};