import React from "react";
import styled  from 'styled-components';
import { Layout } from "../../components/Layout";
import { Header, Box, Paragraph, GatsbyStyledLink } from '../../components/primatives'
import illy from '../../images/illy.jpg'

const AboutTitle = styled(Header)`
margin:       0 0;
margin-left:  1rem;
font-size:    clamp(2.5rem, 5vmin ,5rem);
line-height:  clamp(2.5rem, 5vmin ,5rem);
`
const Subtitle = styled(Header)`
margin:       0;
margin-right: 1rem;
font-size:    clamp(0.75rem, 1.5vmin ,1.5rem);
line-height:  clamp(0.75rem, 1.5vmin ,1.5rem);
width:        100%;
text-align:   right; 

`
const AboutContainer = styled(Box)`
  flex-drectiion: row;
  padding:        0;
  min-width:      20em;
`

const AboutImage = styled.img`
  width:            100%;
  object-position:  0% 0%;
  border-radius:    1000rem 1000rem 0rem 0rem;
  object-fit:       cover;
  border:           3px ridge ${props => props.theme.colors.danger[5].CSS};
  box-shadow:       0 0 2px 2px rgba(0,0,0,0.4);

  @media only screen and (min-width: 25em){  height: 35vh;  }

  @media only screen and (min-width: 36em){
    height:         40vh;
    width:          35%;
    border-radius:  100rem 0rem 0rem 100rem;
  }
`
const AboutInfoContainer = styled(Box)`
  width:            100%;
  border:           3px ridge ${props => props.theme.colors.danger[5].CSS};
  border-top:       none;
  justify-content:  flex-start;
  align-items:      stretch;
  overflow-y:       auto;
  padding:          0;

  @media only screen and (min-width: 36em){
    border-top:   3px ridge ${props => props.theme.colors.danger[5].CSS};
    border-left:  none;
    width:        65%;
    height:       40vh;
  }

  &:not(:first-of-type){
    width:      100%;
    height:     100%;
    border:     none;
    margin-top: 4rem;

    &:nth-of-type(odd){  justify-content: flex-end;  }
  }
`
const TitleContainer = styled(Box)`
  width:            60ch;
  height:           6rem;
  margin:           0.25rem auto;
  padding:          0;  
  justify-content:  flex-start;
  flex-direction:   row;
`
const AboutText = styled(Paragraph)`
  width:          80%;
  margin:         0 auto;
  font-size:      clamp(1rem, 2.5vmin , 2rem);
  line-height:    clamp(1.25rem, 3vmin ,3rem);
  padding:        1rem;
  border-bottom:  3px ridge ${props => props.theme.colors.danger[5].CSS};
  border-right:   3px ridge ${props => props.theme.colors.danger[5].CSS};
  border-Left:    3px ridge ${props => props.theme.colors.danger[5].CSS};
  `

export default function AboutPage(props) {
  return  <Layout>
            <AboutContainer>
              <AboutImage 
                src = { illy  } 
                alt = 'profile image'/>
              <AboutInfoContainer>
                <TitleContainer>
                  <AboutTitle>Courts Dawn</AboutTitle>
                  <Subtitle as='h6'>One awesome person</Subtitle>
                </TitleContainer>
                <AboutText style  = { { border: 'none',   width: '100%' } }>
                  Just your averge trans gamer gal and programer. I spend my free time playing games, crafting hoembrew settings and content and coding sites or small game projects. These are all the things I do, and this is a central local for me to put my ideas and projects out there for others to try out.
                </AboutText>                
              </AboutInfoContainer>
            <AboutInfoContainer>

                <AboutText 
                  style = { { justifySelf: 'left', margin: '0 0', borderLeft: 'none'  } }>
                  Having played <span> </span>
                  <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                    variant ='danger' 
                    to      ='/PnP'>
                    pen and paper
                  </GatsbyStyledLink> 
                  <span> </span>games for over 20 years now, starting with <span> </span>
                  <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                    variant = 'danger' 
                    to      = '/PnP/DnD'>
                    Dungeons and Dragons
                  </GatsbyStyledLink> 
                  <span> </span>3e and moving through 3.5e, going back to 2e, trying out the widely derided 4e and finally playing 5e. But beyond DnD I have worked with BESM and other Tri Stat systems, New world of Darkness, Mutants and Master minds 2e and 3e and many more. I throughly enjoy checking out different systems and what they have to offer. In this vein I have created many homebrew items, including custom games and systems; though much has been lost over the years.
                  </AboutText>
                </AboutInfoContainer>
                
                <AboutInfoContainer>
                  <AboutText 
                    style = { { justifySelf: 'flex-end', margin: '0 0', borderRight: 'none' } }>
                    As an avid gamer I have played many a <span> </span>
                    <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                      variant ='danger' 
                      to      ='/PnP'>
                      games
                    </GatsbyStyledLink> 
                    <span> </span>over the years but by far my favorite and most played is<span> </span> 
                    <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                      variant ='danger' 
                      to      ='/games/POE'>
                      Path of Exile
                    </GatsbyStyledLink>
                    . As such mush of my gaming content will likely revole around this game. Though I have recently played and enjoyed outriders so you may see content from this game, along with other like Warhammer series, Torchlight, Remnant and more.
                  </AboutText>
                </AboutInfoContainer>
                
                <AboutInfoContainer>
                  <AboutText 
                    style = { { justifySelf: 'flex-start', margin: '0 0',  borderLeft: 'none' } }>
                    I am a hobyist and educational<span> </span>
                    <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                      variant = 'danger' 
                      to      = '/PnP'>
                     developer
                    </GatsbyStyledLink>
                    , I have been both self and formally taught different aspects of the developer world. Be it<span> </span>
                    <GatsbyStyledLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                      variant = 'danger' 
                      to      = '/games/POE'> 
                      website
                    </GatsbyStyledLink>
                    , apps or games I have dabbled in all these areas. Using react and other tools for website building is my main focus at this time. But I also love to work with game engines and tools like libgdx, godot, defold, phaser and others to create small games or interactive apps. In terms of programming I have experiance with Python, C++, C, Java, Javascript, though I do have a preferance to Java and Javascript.
                  </AboutText>
                </AboutInfoContainer>

                <AboutText 
                  style=  { { textAlign: 'center', margin: '3rem 0', border: 'none' } }>
                  Stay Awesome
                </AboutText>
            </AboutContainer>
          </Layout>

}