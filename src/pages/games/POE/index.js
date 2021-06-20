import React        from 'react'
import SEO          from 'react-seo-component' 
import styled       from 'styled-components'
import {  graphql } from 'gatsby'

import {  UseSiteMetadata } from '../../../hooks/use-site-metadata'

import { Header   } from '../../../components/primatives'
import {  Layout  } from '../../../components/Layout'
import PostSections from '../../../components/postSections'
import SectionList  from '../../../components/sectionsList'


const Title = styled(Header)`
  width:          100%;
  text-align:     center;
  font-size:      clamp(3rem, 5vmin , 5rem);
  line-height:    clamp(3rem, 5vmin , 5rem);
  margin-bottom:  5rem;
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

  
  const postItems =  data.POEALPHA.nodes
 

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

      <SectionList postItems = {  postItems } />
    </Layout>
  )
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
  POEALPHA: allMdx(
              sort: {fields: [frontmatter___tag,frontmatter___subtag,frontmatter___extra,frontmatter___title], order: [ASC,ASC,ASC,ASC]}
              filter: {frontmatter: {sub_category: {eq: "POE"}}}
            ) {
              nodes {
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  tag
                  subtag
                  extra
              }
            }
          }
}
`;