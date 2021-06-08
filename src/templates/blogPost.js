import React from 'react';

import { graphql} from "gatsby";
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import styled from 'styled-components';

import { Layout } from '../components/Layout';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons'

import {Box, Header, GatsbyButton, Line} from '../components/primatives'

const Container = styled(Box)`padding: 0;`

const CoverImg = styled(GatsbyImage)`
  width: 100%;
  border-radius: 1rem;
  margin: 0 auto;
`;

const TitleBox = styled(Box)`
  flex-direction: column;
  width: auto;
  padding: 0;
`
const Title = styled(Header)`
  margin-top: 2rem;
  font-size: clamp(2rem, 5vmin, 5rem);
  line-height: clamp(2rem, 3vmin, 3rem);
  color: inherit;
  text-align: center;
`
const Date = styled(Header)`
  font-size: clamp(1rem, 2vmin, 2rem);
  align-self: flex-end;
  margin: 0;

`
const PostFooter = styled(Box)`
  width: 100%;
  justify-content: space-between; 
  @media only screen and (min-width: 62em){
    width: 65%;
  }
  @media only screen and (min-width: 75em){
    width: 50%;
  }
`
const FooterButton = styled(GatsbyButton)`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;

`
const FooterText = styled.span`
  display: none;
  @media only screen and (min-width: 25em){
    display: inline;
  }

  &:last-child{
    margin-left: 0.25rem;
  }
  &:first-child{
    margin-right: 0.25rem;
  }
`

//padding
export default function postTemplate ({ data, pageContext }) {
  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;
  const image = getImage(frontmatter.cover)

  return (
    <Layout>
      <Container>
      
      {frontmatter && frontmatter.cover 
        ? (<CoverImg 
            image={image} 
            alt={frontmatter.title} 
          />) 
        : null
      }
      
      <Box>
        <TitleBox>
          <Title> 
            {frontmatter.title}
          </Title>
          <Date>  
            {frontmatter.date}
          </Date>
        </TitleBox>
      </Box>

      <div 
        style={{width: '100%'}}
      >
      <MDXRenderer>
        {body}
      </MDXRenderer>
      </div>

      <Line variant={'danger'} />
      
      <PostFooter>
        {previous === false ? <div /> : (
          <>
            {previous 
            && (
              <FooterButton 
                type    = 'text'
                variant = 'info'
                to={previous.fields.slug}>
                <p>
                  <FontAwesomeIcon 
                    icon={faCaretSquareLeft} 
                  /> 
                  <FooterText>{previous.frontmatter.title}</FooterText>
                </p>
            </FooterButton>

            )}
          </>
        )}
        {next === false ? <div /> : (
          <>
            {next 
              && (
                <FooterButton 
                  //`/${BLOG_SECTION}${next.fields.slug}`
                  to      = {next.fields.slug}
                  type    = 'text'
                  variant = 'info'
                >
                <p>
                  <FooterText>{next.frontmatter.title}</FooterText> 
                  <FontAwesomeIcon 
                    icon={faCaretSquareRight} 
                  />
                </p>
            </FooterButton>
            )}
          </>
        )}
      </PostFooter>
    </Container>
  </Layout>  
  );
};

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do YYYY")
        cover {
          publicURL
          childImageSharp {
            gatsbyImageData(
              height: 360
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;