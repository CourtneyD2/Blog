import React from 'react'
import SEO from 'react-seo-component'; 

import {  graphql, Link } from "gatsby";

import {  UseSiteMetadata } from '../../../hooks/use-site-metadata'

import {  Layout  } from "../../../components/Layout";
import PostSections from '../../../components/postSections'
import { Header, Box, GatsbyButton } from '../../../components/primatives';
import styled from 'styled-components';

const Title = styled(Header)`
  width: 100%;
  text-align: center;
  font-size: clamp(3rem, 5vmin , 5rem);
  line-height: clamp(3rem, 5vmin , 5rem);
  margin-bottom: 5rem;
`
const ListSectionUL = styled.ul`
  list-style-type: none;
  font-size: clamp(1rem, 3vmin , 3rem);
  line-height: clamp(1.25rem, 3vmin , 3rem);
  padding: 0;
  margin: 0;
  & li {
    margin: 1rem;
  }
`
const SubSectionUL = styled.ul`
  list-style-type: none;
  font-size: clamp(1rem, 3vmin , 3rem);
  line-height: clamp(1.25rem, 3vmin , 3rem);


  & li {
    padding: 0;
    margin: 0;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const ListContainer = styled(Box)`
  justify-content: flex-start;  
  padding: 0;
`

export default function POEIndexPage({ data }) {
  const { description     ,   
          title           ,  
          image           ,  
          siteUrl         ,
          siteLanguage    ,   
          siteLocale      ,  
          twitterUsername ,
        } = UseSiteMetadata()

  
  const postItems =  data.allMdx.nodes
  let listSections = {}
  postItems.forEach(item => {
    listSections[item.frontmatter.tag] || (listSections[item.frontmatter.tag] = {})
    listSections[item.frontmatter.tag][item.frontmatter.subtag] 
      ? listSections[item.frontmatter.tag][item.frontmatter.subtag].push(item)      
      : listSections[item.frontmatter.tag][item.frontmatter.subtag] = [item]
  });
  const tags = Object.keys(listSections)
  let displayList = <ListSectionUL>
                      {tags.map((tag, idx) => {
                        let subTags = Object.keys(listSections[tag])
                        return (<li key = { idx }> {tag}
                                  {subTags.map((subtag, id) => {
                                    return (<SubSectionUL key={id}> {subtag}
                                    {  
                                    listSections[tag][subtag].map((item, index) => {
                                      return (<li key={index}>
                                                <GatsbyButton 
                                                  to={item.fields.slug}
                                                  type='text'
                                                  variant ='info'
                                                  >
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

  return (
    <Layout>
      {/* eslint-disable-next-line*/}
      <SEO
        title           = { title                     }
        description     = { description || `nothin’`  }
        image           = { `${siteUrl}${image}`      }
        pathname        = { siteUrl                   }
        siteLanguage    = { siteLanguage              }
        siteLocale      = { siteLocale                }
        twitterUsername = { twitterUsername           }
      />
      <Title>Path of Exile</Title>
      <Header>Posts</Header>

      <PostSections data={data} />
      <ListContainer>
        {displayList}
      </ListContainer>
    </Layout>
  );
}
export const query = graphql`
query getPOEBlogPosts {
  allMdx(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {sub_category: {eq: "POE"}}}
  ) {
    nodes {
      id
      excerpt(pruneLength: 140)
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY-MM-Do")
        title
        tag
        subtag
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(
              width: 200
              height: 300
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
}
`;