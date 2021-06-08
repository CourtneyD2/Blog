import React from 'react'
import SEO from 'react-seo-component'; 
import styled  from 'styled-components';
import {  graphql, Link } from "gatsby";

import {  UseSiteMetadata } from '../../hooks/use-site-metadata'
import {  Box, GatsbyStyledLink, Header } from '../../components/primatives'
import {  Layout  } from "../../components/Layout";
import PostSections from '../../components/postSections'
import poeLogo from '../../images/POE/poeLogo.png'

const GameImage = styled.img`
  object-fit: contain;
 `

const FeaturedHeader = styled(Header)`
  width: 100%;
  text-align: center;
`
const FeaturedWrapper = styled(Box)`

  padding: 0;
  justify-content: center;
  margin-bottom: 4rem;
`
const FeaturedLink = styled(GatsbyStyledLink)`

  width: 25%;
`

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
      <FeaturedWrapper >
        <FeaturedHeader> FEATURED GAMES</FeaturedHeader>
        {featured.map ((item) =>  <FeaturedLink
                                    key={item.game} 
                                    type='text' 
                                    variant = 'primary' 
                                    to  = {item.game}>     
                                    <GameImage src={item.img}></GameImage> 
                                  </FeaturedLink>
                              
        )}
      </FeaturedWrapper>
      
      <Header>Recent Posts</Header>
      
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