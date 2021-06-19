import React        from 'react'
import SEO          from 'react-seo-component' 
import {  graphql } from 'gatsby'

import {  UseSiteMetadata } from '../../hooks/use-site-metadata'
import {  Header          } from '../../components/primatives'
import {  Layout          } from '../../components/Layout'
import {  Featured        } from '../../components/featured'
import PostSections         from '../../components/postSections'
import poeLogo              from '../../images/POE/poeLogo.png'

export default function GamesIndexPage({ data }) {
  const { description     ,   
          title           ,  
          image           ,  
          siteUrl         ,
          siteLanguage    ,   
          siteLocale      ,  
          twitterUsername ,
        } = UseSiteMetadata()
  const featured = [{game:'POE', img: poeLogo}]
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
      <Featured featured = {featured} title = 'FEATURED GAMES' />

      <Header>Posts</Header>
      
      <PostSections data={data} />

    </Layout>
  );
}
export const query = graphql`
query getGameBlogPosts {
  allMdx(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {category: {eq: "gaming"}}}
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
        sub_category
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