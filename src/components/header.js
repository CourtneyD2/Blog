import React                from 'react'
import styled               from 'styled-components'
import { Link }             from 'gatsby'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'

import Logo                             from '../images/logo.png'
import { NavBar                       } from './navbar'
import { Box, makeFlex, ExternalLink  } from '../components/primatives'

import {  faYoutube,  faGithub, 
          faTwitch,   faTwitter } from "@fortawesome/free-brands-svg-icons";

const StyledHeader = styled(Box)`
  margin-bottom: ${props => props.theme.spacing.base}rem;

  ${props => props.theme.media.md}{ align-items: flex-end;}
`
const LogoLink = styled(Link)`
  padding-left:   1rem;
  padding-right:  1rem;
  padding-top:    0.5rem;
  width:          ${props => props.theme.column['full']}%;

  ${props => props.theme.media.xs}{
    width: ${props => props.theme.column['2/3']}%;
  }
`
const LogoBlock = styled(Box)`
  height:     100%;
  min-height: 15vh; 
  background: url(${Logo}) no-repeat center left/contain; 
`
const SocialLink = styled(ExternalLink)`
  width:      ${props => props.theme.column['1/4']}%;
  font-size:  1.5rem;
  ${props => makeFlex}
  
  
  ${props => props.theme.media.xs}{
    width:        ${props => props.theme.column['1/2']}%;    
    margin-top:   ${props => props.theme.spacing.base}rem;
    padding-right:${props => props.theme.spacing.base}rem;  
  }
  ${props => props.theme.media.sm}{
    width:          ${props => props.theme.column['2']}%; 
    margin-bottom:  0;
    padding-right:  0;
    align-items:    flex-end;
  }
`
const SocialContainer = styled(Box)`
  padding:    0;
  margin-top: ${props => props.theme.spacing.base*0.75}rem;

  ${props => props.theme.media.xs}{ 
    width:            ${props => props.theme.column['1/3']}%;
    justify-content:  flex-end;
    margin-top:       0;
  }
  ${props => props.theme.media.sm}{
    justify-content:  flex-end;
    flex-wrap:        nowrap;   
  } 
`

export const Header = ({ siteTitle, siteDescription }) => {
  const social = [  { URL:  'https://github.com/CourtneyD2', 
                      Icon: faGithub}, 
                    { URL:  'https://www.youtube.com/channel/UCpI0ypt6eAQLlyfeBtyF5Gw', 
                      Icon: faYoutube}, 
                    { URL:  'https://www.twitch.tv/courtsdawn', 
                      Icon: faTwitch},
                    { URL:  'https://twitter.com/courts_dawn', 
                      Icon: faTwitter}
                 ] 
  return (
    <>
    <StyledHeader as  = 'header'> 
          <LogoLink to  = "/">
            <LogoBlock />
          </LogoLink>
          <SocialContainer>
              { social.map( ( item, index ) => {
                  return  <SocialLink 
                            variant = 'danger' 
                            key     = { index     } 
                            href    = { item.URL  }  >
                              <FontAwesomeIcon icon={item.Icon} />
                              {''}
                          </SocialLink>
                })
              }
          </SocialContainer>
    </StyledHeader>
    <NavBar />
    </>    
  );
};