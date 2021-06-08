import React from 'react'
import SEO from 'react-seo-component'; 

import {  graphql } from "gatsby";

import {  UseSiteMetadata } from '../../hooks/use-site-metadata'


import {  Layout  } from "../../components/Layout";
import PostSections from '../../components/postSections'

export default function IndexPage({ data }) {
  const { description     ,   
          title           ,  
          image           ,  
          siteUrl         ,
          siteLanguage    ,   
          siteLocale      ,  
          twitterUsername ,
        } = UseSiteMetadata()
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
      <PostSections data={data} />
    </Layout>
  );
}
export const query = graphql`
query getPnPBlogPosts {
  allMdx(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {category: {eq: "PnP"}}}
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