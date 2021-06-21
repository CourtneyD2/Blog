import React  from 'react'
import styled from 'styled-components'
import DropDown, {DropDownMenu} from './dropdown'
import {Box, GatsbyButton}      from './primatives'

  const Content = [
    {Name: 'Gaming' , GoTo: 'Gaming', direction: 'down' },
    {Name: 'Coding' , GoTo: 'Coding', direction: 'down' },
    {Name: 'PnP'    , GoTo: 'PnP'   , direction: 'down' },
  ];
 const PenAndPaper = [
    {Name: 'About'    , Link: '/PnP' },
    {Name: 'DnD'      , Link: '/PnP/DnD' },
    {Name: 'Back'     , GoTo: 'Main', direction: 'up' },
  ];
   const Programming = [
    {Name: 'About', Link: '/dev' },
    {Name: 'Web'  , Link: '/dev/web' },
    {Name: 'Back' , GoTo: 'Main', direction: 'up'},
  ];
  const gaming = [
    {Name: 'About'        , Link: '/games' },
    {Name: 'POE'          , Link: '/games/POE' },
    {Name: 'Back'         , GoTo: 'Main'    , direction: 'up'},
  ];
  const mainMenu = {
    Name: 'Main',
    contents: Content    
  }
  const PnPMenu = {
    Name: 'PnP',
    contents: PenAndPaper    
  }
  const programmingMenu = {
    Name: 'Coding',
    contents: Programming    
  }
  const gamingMenu = {
    Name: 'Gaming',
    contents: gaming    
  }
  const Menus = [    
    mainMenu,
    PnPMenu,
    programmingMenu, 
    gamingMenu
  ]

const StyleNav = styled(Box)`
  justify-content:  space-between;
  align-items:      center;
  position:         -webkit-sticky;
  position:         sticky;
  top:              0;    
  z-index:          20;
`
const NavLink = styled(GatsbyButton)`
  width:            30%;
  height:           2.5rem;  
  line-height:      2.25rem;
  border-radius:    0;  
  position:         relative;
  display:          flex;
  justify-content:  center;
  align-items:      center;
  transform:        skew(-15deg, 0deg);

  &:first-child {border-radius: 0.5rem 0rem 0rem 0.5rem;}
  
  &:last-child  {border-radius: 0rem 0.5rem 0.5rem 0rem;}

  &:hover, &:focus {transform: scale(1.02) skew(-15deg, 0deg);}
`
export const NavBar = (props) => {
   
  return (
   
    <StyleNav as = 'nav'>
      <NavLink cover direction='down' bg='#55CDFC'
        to      = '/'
        variant = 'info'
        type    = 'button'
        styleType = 'button'
      >
        Home
      </NavLink>
      <DropDown 
        width   = '39%'
        height  = '2.5rem'
        variant = 'info'
        type    = 'button' 
        styleType = 'button'
        Name    = 'Content'
        Menus   = { Menus }>
          <DropDownMenu
            variant = 'info'
            type    = 'button' 
            styleType = 'button'
            height  = '2.5rem'>
          </DropDownMenu>
      </DropDown> 
      <NavLink cover direction='up' bg='#55CDFC'
        to      = '/about'
        variant = 'info'
        type    = 'button'
        styleType = 'button'>        
          About
      </NavLink>
    </StyleNav>
  )
}