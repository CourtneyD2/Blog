import React, { useState  } from 'react'
import styled               from 'styled-components';

import {  FontAwesomeIcon                       }  from '@fortawesome/react-fontawesome'
import {  faCaretSquareLeft, faCaretSquareRight }  from '@fortawesome/free-solid-svg-icons'

import {  Box, Button  }  from '../components/primatives'
import  Post              from '../components/post'

const IndexWrapper = styled(Box)`
  padding:      0;
  align-items:  stretch;
`

const createSections = (  allPosts, maxPostsPer, maxSections  ) => {
  let sections = []
  for ( let i = 1; i  <=  maxSections; i++  ) {    
    const set = allPosts.filter (
      ( node, index ) =>  (  index < i * maxPostsPer 
                          && index >= (  i - 1  ) * maxPostsPer) 
    ) 
    sections.push(set)    
  }

    sections.forEach ((section,idx) => {
    sections[idx] = section.map ( post => <Post  
                                              key         = { post.id          }    
                                              id          = { post.id          } 
                                              excerpt     = { post.excerpt     } 
                                              frontmatter = { post.frontmatter } 
                                              fields      = { post.fields      } />
    )
  })

  return sections
}

export default function PostSections({ data }) {

  const maxPostsPerPage   = 5
  const maxSections       = Math.ceil(  data.allMdx.nodes.length / maxPostsPerPage  )
  const sections          = createSections (data.allMdx.nodes, maxPostsPerPage, maxSections)
  const [ currentSection, 
          changSection  ] =  useState(1);  

  const updateSection = (e) => {
    const direction = e.target.value
    
    if (  direction === 'forward' ) {
      let newSection = currentSection + 1
      if (newSection > maxSections) newSection = maxSections
      changSection((prev) => newSection)
    }
    else if ( direction === 'back'  ) {
      let newSection = currentSection - 1
      if (  newSection < 1  ) newSection = 1
      changSection((prev) => newSection)
    }
  }

  return (
    <IndexWrapper>    
        {sections[currentSection-1]}
        <Box>
        <Button style ={{fontSize:'1.5rem'}}
          onClick = { updateSection } 
          value   = 'back'
          type    = 'text'
          styleType = 'text'
          variant = 'info'>
            <FontAwesomeIcon 
              style = { { pointerEvents: 'none' } }
              icon  = { faCaretSquareLeft } 
            /> back
        </Button>
        <span style={{margin: '1rem', fontSize:'1.5rem'}}>{`${currentSection} / ${maxSections}`}</span>
        <Button style ={{fontSize:'1.5rem'}}
          onClick   = {  updateSection  } 
          value     = 'forward'
          type      = 'text'
          styleType = 'text'
          variant   = 'info'>
            next <FontAwesomeIcon 
              style = {  {  pointerEvents: 'none'  }  }
              icon  = {  faCaretSquareRight  } 
            /> 
        </Button>
        </Box>
      </IndexWrapper>
  );
}
