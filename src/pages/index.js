import React from "react";
import SEO from 'react-seo-component'; 

import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import styled from 'styled-components';
import { Layout } from "../components/Layout";
import { UseSiteMetadata } from '../hooks/use-site-metadata'

import {Box, Header, Paragraph} from '../components/primatives'

const CoverImg = styled(GatsbyImage)`
  border-radius: 0.5rem 0rem 0rem 0.5rem;
`;

const IndexWrapper = styled(Box)`
  padding: 0;
  align-items: stretch;
`;

const PostWrapper = styled(Box)`
  background: transparent;
  min-height: 20ch;
  max-height: 20vh;
  padding: 0rem; 
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  transistion: transform var(--transition-normal) ease;
  box-shadow: 0 0 2px 1px rgba(0,0,0,0.4);
  &:last-child {
    margin-bottom: 0;
  }
  @media only screen and (min-width: 72em){
    &:nth-child(odd) {
      margin-left: 1rem;
      &:first-child {
        width: 100%;
        margin: 0 auto;
        margin-bottom: 1rem;
      }
    }
    &:nth-last-child(2) {
      margin-bottom: 0;
    }
    width: calc(50% - 0.5rem);
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 8px 1px rgba(0,0,0,0.4);
  }
  `;

const PostTitle = styled(Header)`
  width: 75%;
  text-decoration: underline;
  margin-top: 0.75rem;
  text-align: center;
`
const Excerpt = styled(Paragraph)`
  padding-right: 1.5rem;
  margin-left: 1rem;
`
const PostLink = styled(Link)`
  display: flex;  
  width: 100%;
  height: 100%;
  align-items: center;
  text-decoration: none;
  color: white;
`
const ImgContainer = styled.div`
  width: 50%;
  height: 100%;  
  margin-right: 0rem;
  display: none;
  flex-direction: column;
  justify-content: center;  
  padding: 0.5rem;
  @media only screen and (min-width: 28em){
    display: flex;
  }
`
const Container = styled.div`
  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
  display: flex;

  flex-wrap: wrap;
  @media only screen and (min-width: 36em){

  flex-wrap: nowrap;
  }

`
const InnerContainer = styled.div`
  width: 100%;
  height: calc(100% - 2rem);
`
const DatePost = styled.p`
  width: 100%;
  margin: 0 auto;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 0rem 0rem 1rem 0rem;  
  border-top: 0.0675rem solid black;
  background-color: ${props => props.theme.colors.danger[5].CSS};
  color: black;

  @media only screen and (min-width: 36em){
    width: 2rem;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    border-radius: 0rem 1rem 1rem 0rem; 
  }
`

export default function IndexPage({ data }) {
    const {
    description,
    title,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = UseSiteMetadata()
  return (
    <Layout>
      {/* eslint-disable-next-line*/}
      <SEO
        title={title}
        description={description || `nothin’`}
        image={`${siteUrl}${image}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <IndexWrapper>  
        {data.allMdx.nodes.map(({ id, excerpt, frontmatter, fields, slug }) => {
          const image = getImage(frontmatter.cover)
          return (
            <PostWrapper 
              key={id}
            >
              <PostLink 
                to={fields.slug}
              >
                { frontmatter 
                  && frontmatter.cover 
                    ? (
                    <ImgContainer>
                      <CoverImg 
                        image={image} 
                        alt={frontmatter.title} 
                      />
                    </ImgContainer>
                    ) 
                    : null
                }
                <Container>

                  <InnerContainer>
                    <PostTitle>
                      {frontmatter.title}
                    </PostTitle>
                    <Excerpt>
                      {excerpt}
                    </Excerpt>
                  </InnerContainer>
                  
                  <DatePost>
                   {frontmatter.date}
                  </DatePost>
                
                </Container>
              </PostLink>
            </PostWrapper>
          )
        })}
      </IndexWrapper>
    </Layout>

  );
}
export const query = graphql`
query getAllBlogPosts {
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      id
      excerpt(pruneLength: 140)
      fields{
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