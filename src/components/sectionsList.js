import React from 'react'

import styled from 'styled-components';

import { Box, GatsbyButton } from '../components/primatives'

const ListSectionUL = styled.ul`
  list-style-type: none;
  font-size: clamp(1rem, 3vmin , 3rem);
  line-height: clamp(1.25rem, 3vmin , 3rem);
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    ${props => props.theme.media.sm}{
      margin: 2rem;
    }
  }
`
const SubSectionUL = styled.ul`
  list-style-type: none;
  font-size: clamp(1rem, 3vmin , 3rem);
  line-height: clamp(1.25rem, 3vmin , 3rem);
  margin: 0;
  padding-left: 1rem;

  & li {    
    padding-left: 1rem;
    margin: 0;
    ${props => props.theme.media.sm}{
      margin-left: 2rem;
      margin-top: 0.25rem;
      margin-bottom: 1rem;
    }
  }
`

const ListContainer = styled(Box)`
  justify-content:  flex-start;  
  padding:          0;
`


export default function SectionList({ postItems }) {
  let listSections = {}
  postItems.forEach(item => {
    listSections[item.frontmatter.tag] || (listSections[item.frontmatter.tag] = {})
    listSections[item.frontmatter.tag][item.frontmatter.subtag] 
      ? listSections[item.frontmatter.tag][item.frontmatter.subtag].push(item)      
      : listSections[item.frontmatter.tag][item.frontmatter.subtag] = [item]
  });
  const tags = Object.keys(listSections)
  return ( <ListContainer> 
              <ListSectionUL>
                { tags.map((tag, idx) => {
                    let subTags = Object.keys(listSections[tag])
                    return (  
                      <li key = { idx }> {tag}
                        { subTags.map((subtag, id) => {
                            return (
                              <SubSectionUL key={id}> {subtag}
                                { listSections[tag][subtag].map((item, index) => {
                                    return (
                                      <li key={index}><span> {item.frontmatter.extra} </span> 
                                        <GatsbyButton paintDrip direction='down' hex='#55CDFC' duration={0.65}
                                          to={item.fields.slug}
                                          styleType='text'
                                          variant ='info'>
                                            {item.frontmatter.title}
                                          </GatsbyButton>
                                      </li>)
                                    })
                                }
                              </SubSectionUL>)
                          })}
                      </li>)
                    })}
              </ListSectionUL>
            </ListContainer>
          )

}