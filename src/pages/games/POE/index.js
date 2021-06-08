import React from 'react'
import SEO from 'react-seo-component'; 

import {  graphql } from "gatsby";

import {  UseSiteMetadata } from '../../../hooks/use-site-metadata'


import {  Layout  } from "../../../components/Layout";
import PostSections from '../../../components/postSections'

export default function POEIndexPage({ data }) {
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

      <h1>Poe</h1>
      <ul>
        <li>Beginners</li>
        <li>Builds
          <ul>
            <li>Maurder Burn</li>
          </ul>
        </li>
        <li>Classes
          <ul>
            <li>Maurder</li>
          </ul>
        </li>
        <li>Ascendancy</li>
      </ul>
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