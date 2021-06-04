// import React from "react";
// import SEO from 'react-seo-component'; 

// import { graphql, Link} from "gatsby";

// import {createGlobalStyle, keyframes,ThemeProvider} from 'styled-components';
// import styled from "styled-components";

// import bgImage from "../images/landingBackground.jpg"
// import {sizes, device} from '../../styles/breakpoints'
// import {CSSNormalization} from '../../styles/normalize'
// import { UseSiteMetadata } from '../../hooks/use-site-metadata'
// import {BLOG_SECTION} from '../../../siteconfig'
// import Palette from '../../styles/colors'

// const GlobalStyle = createGlobalStyle`
//   body {
//     height: 100vh;
//     background-color: #000;
//     background: url(${bgImage}) no-repeat center center/cover;    
//     background-position: 0 80%;

//    @media only screen and (min-width: ${sizes.tablet}px){
//     background-position: 0 65%;
//    }
//   }`

// const Container = styled.div`
//   display: flex;
//   margin: 0 auto;  
//   width: 100%;
//   min-width: 240px;
//   position: absolute;
//   bottom: calc(16% - 1em);
//   left: 0%;

//   @media only screen and (min-width: ${sizes.tablet}px){
//     width: 80%;
//     left: 10%;
//     bottom: 18%;
//   } 

//    @media only screen and (min-width: ${sizes.desktopS}px){
//     bottom: 22%;
//     width: 80%;
//     left: 10%;
//   }

// `;

// const Row = styled.div`
//   display: flex;  
//   justify-content: space-around;
//   width: 100%;
//   position: relative;
//   @media only screen and (min-width: ${sizes.tablet}px){
//     justify-content: space-evenly;
//   }
// `

// const blink = keyframes`
//     0%{border-right: 2px solid white }
//     49%{border-right: 2px solid white}
//     60%{border-right: 2px solid transparent;}
//     99%{border-right: 2px solid transparent;}    
//     100%{border-right: 2px solid white   }
// `;

// const boxIn = keyframes`
//     0%{width:0em;}
//     10%{width:0em; opacity: 1}
//     55%{width: 2.5em; height: 0em;opacity: 1}
//     100%{width: 2.5em; height: 1em;opacity: 1}             
// `;



// const LandingLinkButton = styled(Link)`
//   background-color: transparent;
//   color: white;
//   width: 45%;  
//   padding: 1em 0em;  
//   max-width: 25em;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;  
//   border-radius: 0.25em;
//   transition: transform 0.5s ease-in-out;
//   position: relative;

//   @media only screen and (min-width: ${sizes.mobileL}px){
//     padding: 1em 1em;
//   }   
//   @media only screen and (min-width: ${sizes.tablet}px){
//     padding: 1em 1.25em;
//     width: 33%;
//   }

//   &.blue {
//     box-shadow: inset 0px 0px 8px 1px hsl(197, 97%, 66%), 0px 0px 2px 1px hsl(197, 97%, 66%); 
//     &::after {
//       content: '';
//       position: absolute;
//       z-index: -1;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       border-radius: 0.25em; 
//       box-shadow: 0px 0px 6px 2px hsl(197, 97%, 66%), 0px 0px 3px 1px hsl(197, 97%, 78%), 0px 0px 2px 1px hsl(197, 97%, 90%), 0px 0px 1px 1px hsl(197, 97%, 95%);
//       opacity: 0;
//       transition: opacity 0.25s ease-in-out;
//     }
    
//     &::before{
//       border-right: 1px solid white;
//       content: '';
//       position: absolute;
//       z-index: 5;
//       width: 1ch;
//       height: 1em;
//       top: 1.05em;
//       right: 25%;
//       animation: ${blink} 1s linear infinite;      
//       @media only screen and (min-width: ${sizes.mobileM}px){
//         right: 30%;
//       }
//       @media only screen and (min-width: ${sizes.mobileL}px){
//         right: 32%;
//       }
//       @media only screen and (min-width: ${sizes.tablet}px){
//         right: 37%;
//       }
//       @media only screen and (min-width: ${sizes.desktopS}px){
//         right: 40%;
//       }
//       @media only screen and (min-width: ${sizes.desktopM}px){
//         right: 43%;
//       }
//     }
//     &:hover{        
//       box-shadow: inset 0px 0px 2px 1px hsl(197, 97%, 66%);
//       &::after {
//         opacity: 1;
//       }
//     }
//   }
//   &.pink {
//     box-shadow: inset 0px 0px 1px 1px hsl(348, 83%, 81%), 0px 0px 1px 1px hsl(348, 83%, 81%); 
//     &::after {
//       content: '';
//       position: absolute;
//       z-index: -1;
//       width: 100%;
//       height: 100%;
//       top: 0;
//       left: 0;
//       right: 0;
//       bottom: 0;
//       border-radius: 0.25em;
//       box-shadow: 0px 0px 6px 2px hsl(348, 83%, 81%), 0px 0px 3px 1px hsl(348, 83%, 81%), 0px 0px 2px 1px hsl(348, 83%, 81%), 0px 0px 1px 1px hsl(348, 83%, 81%);
//       opacity: 0;
//       transition: opacity 0.25s ease-in-out;
//     }
//     & div{    
//       position: absolute; 
//       border: 1px solid hsl(348, 83%, 81%);
//       z-index: 5;
//       width: 0em;
//       height: 0em;
//       background-color: transparent;
//       animation: ${boxIn} 4s linear infinite alternate;
//       opacity: 0;
//       &.left{
//         left: 50%;
//         border-left: none;
//       }
//       &.right{
//         right: 50%;
//         border-right: none;
//       }
//       &.top{
//         top: 25%;
//         border-bottom: none;
//       }
//       &.bottom{
//         border-top: none;
//         bottom: 25%;
//       }
//     }

//     &::before{      
//       content: '';
//       position: absolute;
//       z-index: 5;
//       width: 0%;
//       height: 0%;
//       bottom: 25%;
//       right: 50%;      
//       @media only screen and (min-width: ${sizes.mobileM}px){
//         right: 15%;
//       }
//       @media only screen and (min-width: ${sizes.mobileL}px){
//         right: 18%;
//       }
//       @media only screen and (min-width: ${sizes.tablet}px){
//         right: 28%;
//       }
//       @media only screen and (min-width: ${sizes.desktopS}px){
//         right: 32%;
//       }
//       @media only screen and (min-width: ${sizes.desktopM}px){
//         right: 35%;
//       }
//     }             
//     &:hover{        
//       box-shadow: inset 0px 0px 2px 1px hsl(348, 83%, 81%);
//       border:none;
//       &::after {
//         opacity: 1;
//       }
//       & div {
//         animation-play-state: paused;
//       }      
//     }    
//   }
// `;

// export default function IndexPage({ data }) {
//     const {
//     description,
//     title,
//     image,
//     siteUrl,
//     siteLanguage,
//     siteLocale,
//     twitterUsername,
//   } = UseSiteMetadata()
//   console.log(Palette); 
  

//   return (
//     <ThemeProvider theme={Palette}>
//       <CSSNormalization />
//       <GlobalStyle />
//       <SEO
//         title={title}
//         description={description || `nothin’`}
//         image={`${siteUrl}${image}`}
//         pathname={siteUrl}
//         siteLanguage={siteLanguage}
//         siteLocale={siteLocale}
//         twitterUsername={twitterUsername}
//       />
//       <Container>
//         <Row>
//           <LandingLinkButton 
//             className="blue" 
//             right = 'true' 
//             to={`${BLOG_SECTION}`}>
//               Blog
//           </LandingLinkButton>
          
//           <LandingLinkButton 
//             className="pink" 
//             left ='true'
//             to={`${BLOG_SECTION}`}>
//               <div className='top left'></div><div className='top right'></div>
//               <div className='bottom left'></div><div className='bottom right'></div>
//               Portfolio
//           </LandingLinkButton>
//         </Row>        
//       </Container>     
//     </ThemeProvider>
//   );
// }
// export const query = graphql`
// query MyQuery {
//   allMdx(sort: {fields: frontmatter___date, order: DESC}) {
//     nodes {
//       id
//       excerpt(pruneLength: 250)
//       fields{
//         slug
//       }
//       frontmatter {
//         date(formatString: "YYYY MM Do")
//         title
//         tag
//         cover {
//           publicURL
//           childImageSharp {
//             gatsbyImageData(
//               width: 100
//               placeholder: BLURRED
//               formats: [AUTO, WEBP, AVIF]
//             )
//           }
//         }
//       }
//     }
//   }
// }


// `;