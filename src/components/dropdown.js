import React, {useState, useRef, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group';

import { navigate } from "gatsby";
import styled,  { css } from 'styled-components';
import {Box, Button, GatsbyButton, textFlow} from './primatives'

const DropDownContainer = styled(Box)`
  width:    ${props => props.width};
  height:   ${props => props.height};
  position: relative;
  z-index:  200;  
`
const DropDownButton = styled(Button)`
  width:      100%;
  height:     100%;
  position:   absolute;
  top:        0;
  left:       0;
  cursor:     pointer;
  z-index:    200;  
  transform:  skew(-15deg, 0deg);

  &.open  {
    --shadow:             0 0 0.75rem -0.01rem rgba(0,0,0,0.5);
    --ring-color:         ${props => props.bg_color[5].CSS};
    --ring-offset-color:  ${props => props.theme.colors.main_bg.CSS}; 
    box-shadow:           var(--all-shadows);
    transform:            scale(1.02) skew(-15deg, 0deg);

  }

  &:hover, &:focus {transform: scale(1.02) skew(-15deg, 0deg);}

`
const DropDownMenuContainer = styled(Box)`
  padding: 0;
  position: absolute;
  overflow: hidden;
  height: 0;
  top: ${props => props.height};
  left: 0;
  z-index: 199;
  align-items: stretch;
  transition: height var(--transition-normal) linear;
`
const DropDownMenuList = styled(Box)`
  width: 100%;  
  padding: 0;
  &.menu-up-enter {
    position: absolute;
    transform: translateX(-100%);
  }
  &.menu-up-enter-active { 
    transform: translateX(0%);
    transition: transform var(--transition-normal) linear;
  }
  &.menu-up-exit {
    position: absolute;
  }
  &.menu-up-exit-active {
    transform: translateX(-100%);
    transition: transform var(--transition-normal) linear;
  }  
  &.menu-down-enter {
    position: absolute;
    transform: translateX(100%);
  }
  &.menu-down-enter-active { 
    transform: translateX(0%);
    transition: transform var(--transition-normal) linear;
  }
  &.menu-down-exit {
    position: absolute;
  }
  &.menu-down-exit-active {
    transform: translateX(100%);
    transition: transform var(--transition-normal) linear;
  }
`
const MenuItem = styled(Box)`
  height: ${props => props.height};
  padding: 0;
`
const baseMenuItem = css`
  width: 100%;
  height: 100%;
  line-height: 2.5rem;
  text-align: center;
  display:flex;
  align-items: center;
  justify-content: center;
    &:hover, &.focus{
    transform: scale(1);
    --ring-color: ${props => props.bg_color[4].CSS};
    --ring-offset-color: ${props => props.theme.colors.main_bg.CSS}; 
    box-shadow: inset 0 0 0 4px var(--ring-offset-color); 
  }
`

const MenuText = styled.div`
  ${props => baseMenuItem}
    cursor:     pointer;
`

const MenuButton = styled(Button)`
  ${props => baseMenuItem}
  position: relative;
  padding: 0;
  cursor:     pointer;
  & > * {
    pointer-events: none;
  }
`
const MenuLink = styled(GatsbyButton)`
  padding: 0;
  ${props => baseMenuItem}

`
const MenuIcon = styled.span`
  width: 60%;
  height: 100%;
  display: flex;
  font-size: clamp(0.75rem, 1.5vw, 1.25rem);
  line-height: clamp(0.75rem, 1.5vw, 1.25rem);
  ${props => textFlow}
  justify-content: center;
  align-items: center;
  &:last-child {
    width: 20%;    
    text-align: center;
  }
  &:first-child {
    width: 20%;
    text-align: center;
  }
`

export default function DropDown(props) {
  const {Menus}     = props;
  const wrapperRef  = useRef(null);


  const [open, setOpen]           = useState(false);
  const [focus, setFocus]         = useState(false);   
  const [selection, setSelection] = useState(
                                      { selectedMenu: [0],
                                        directions:   ['up'],
                                        selectedItem: 0
                                      }
  )
  const M = Menus[selection.selectedMenu[selection.selectedMenu.length-1]];
  const MN = M.Name;

  function findMenu (currentMenu, target) {
    const itemContents = currentMenu.contents[target];
    if (itemContents.GoTo)
    Menus.forEach((menu, index) => { 
      if (menu.Name === itemContents.GoTo){
        const theDirection = itemContents.direction;
        setSelection ((previous)=> ({
            selectedMenu: [...previous.selectedMenu, index],
            directions: [...previous.directions, theDirection],
            selectedItem: 0,
        }));            
      }                  
    });
  }

  function internalButtonClicked(e){
    const currentMenu = Menus[selection.selectedMenu[selection.selectedMenu.length-1]];
    const target = e.target.value;
    findMenu(currentMenu, target);

  }

  function updateItem(newitemIndex) {
    setSelection((previous)=> (
      { selectedMenu: [...previous.selectedMenu],
        directions: [...previous.directions],
        selectedItem: newitemIndex,}
    ));
  }
  function resetSelection() {
    setSelection(() => ({
      selectedMenu: [0],
      directions: ['up'],
      selectedItem: 0
      }
    ));
  }

  useEffect(() => {
    function handleAction(event) {
      const clickOutside  = ( wrapperRef.current && !wrapperRef.current.contains(event.target));
      const closeButton   = ( event.keyCode === 27 || event.keyCode === 9);

      if (clickOutside || closeButton){
        setFocus(false);
        setOpen(false);
        resetSelection();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleAction);
    document.addEventListener('keydown', handleAction);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleAction);
      document.removeEventListener('keydown', handleAction);
    };
  }, [wrapperRef]);

  return (
  <DropDownContainer ref={wrapperRef} width= {props.width} height= {props.height} >
    <DropDownButton 
      variant   = { props.variant   } 
      type      = { props.type      }
      styleType = { props.styleType }
      className = { open && 'open'  }
      onClick   = {() => {setOpen(!open); resetSelection()}} 
      onKeyDown = {(e) => {
        const Menu = Menus[selection.selectedMenu[selection.selectedMenu.length-1]];
        const itemIndex = selection.selectedItem;
        const itemContents = Menu.contents[itemIndex];

        if (    e.key === 'Enter' 
            ||  e.key === 'ArrowDown'
            ||  e.key === 'ArrowUp'
            ||  e.key === 'ArrowLeft'
            ||  e.key === 'ArrowRight') {
              e.preventDefault();
        }
        
        if (!focus){
          if (e.key === 'Enter' || e.key === 'ArrowDown') {
            if (!open) setOpen(true);
            setFocus(true);
          }
        } 
        else {
          if (e.key === 'Enter'){            
            if (itemContents.Link) navigate(itemContents.Link);
            if (itemContents.GoTo) findMenu(Menu, itemIndex);               
          }
          if (e.key === 'ArrowDown') {
            const newItemIndex = itemIndex  >= Menu.contents.length-1 
                                    ? 0
                                    : itemIndex + 1
            updateItem(newItemIndex);
          }
          if (e.key === 'ArrowUp') {
            const newItemIndex =  itemIndex <= 0 
                                      ? Menu.contents.length-1
                                      : itemIndex - 1
            updateItem(newItemIndex);
          }
          if (e.key === 'ArrowRight') { findMenu(Menu, selection.selectedItem); }
          if (e.key === 'ArrowLeft')  {      
            if (selection.selectedMenu.length>1){
              var newMenuPath = selection.selectedMenu;
              var newDirectionsList = selection.directions;
              
              newMenuPath.pop();
              newDirectionsList.pop();

              setSelection((previous)=> (
                { selectedMenu: [...newMenuPath],
                  directions: [...newDirectionsList],
                  selectedItem: 0
                }
              ));
            }                    
          }
        }
      }}>
        {MN}
      </DropDownButton>
      {/* {<DropDownMenu 
        open = {open} 
        focus = {focus} 
        selection = {selection}
        buttonclick={internalButtonClicked} 
        Menus={Menus} 
       /> 
      } */}
      {React.cloneElement(props.children, {open, focus, selection,
        buttonclick: internalButtonClicked ,
        Menus})}
  </DropDownContainer>
  );
}

function DropDownItem(props){
    
    return (
    <MenuItem 
      height = {props.height}
      tabIndex={props.tabIndex} 
      value={props.index}
      className={props.infocus ? 'focus': ''}
    >
      
      {props.item.GoTo 
        ?<MenuButton 
            variant     = { props.variant              }
            type        = { props.type                 }
            styleType   = { props.styleType            }
            tabIndex    = { props.tabIndex             } 
            value       = { props.index                }
            onClick     = { props.buttonclick          }
            className   = { props.infocus ? 'focus': ''}>
            <MenuIcon>  
              { props.leftIcon}
            </MenuIcon>
            <MenuIcon>  
              { props.item.Name}
            </MenuIcon>
            <MenuIcon>  
              { props.rightIcon}
            </MenuIcon>
          </MenuButton> 
        : (props.item.Link 
            ? <MenuLink paintDrip direction='down' hex='#55CDFC' duration={0.65}
                variant     = { props.variant}
                type        = { props.type  }
                styleType   = { props.styleType  }
                tabIndex    = { props.tabIndex}  
                to          = { props.item.Link}  
                className   = { props.infocus ? 'focus': ''}>
            <MenuIcon>{ props.leftIcon  }</MenuIcon>
            <MenuIcon>{ props.item.Name }</MenuIcon>
            <MenuIcon>{ props.rightIcon }</MenuIcon>
              </MenuLink> 
            : <MenuText>
                            <MenuIcon>{props.leftIcon}</MenuIcon>
            <MenuIcon>{props.item.Name}</MenuIcon>
            <MenuIcon>{props.rightIcon}</MenuIcon></MenuText>)       
      } 
    </MenuItem>
    );
  }

export function DropDownMenu(props) {
  const {open, focus, Menus, selection, buttonclick} = props;
  const {selectedItem, directions, selectedMenu} = selection;
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
     setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
   }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  const getDirection = (MenuIndex) => {
    const lastDirection = directions.length-1;
    const lastMenu = selectedMenu.length -1;

    if (directions[lastDirection] === 'down') {
      return  selectedMenu[lastMenu] === MenuIndex 
                  ? 'menu-down' 
                  : 'menu-up'
    }
    if (directions[lastDirection] === 'up') {
      return  selectedMenu[lastMenu] === MenuIndex
                ? 'menu-up' 
                : 'menu-down'
    }
  }

  return (
    <DropDownMenuContainer 
      height = {props.height}
      style = { 
        !open 
            ? { height: 0 }
            : { height: menuHeight }} 
        ref = {dropdownRef}
    >
      {Menus.map((Menu, menuIndex) => {
        return (
          <CSSTransition
          key         = { menuIndex               }           
          timeout     = { 500                     } 
          classNames  = { getDirection(menuIndex) } 
          onEnter     = { calcHeight              }
          in          = { selectedMenu[selectedMenu.length-1] === menuIndex}  
          unmountOnExit
          >
            <DropDownMenuList>
              {Menu.contents.map((item, itemIndex) => {          
                return ( 
                  <DropDownItem 
                    height      = {props.height}
                    variant     = {props.variant}
                    type        = {props.type}
                    styleType   = {props.styleType}
                    key         = {itemIndex}
                    index       = {itemIndex}
                    infocus     = {selectedItem === itemIndex && focus}                   
                    item        = {item}
                    buttonclick = {buttonclick} 
                    Menus       = {Menus}
                    tabIndex    = {!open ? -1 : itemIndex}
                    leftIcon    = {item.leftIcon}
                    rightIcon   = {item.rightIcon}
                  />
                )})
              }
            </DropDownMenuList>

          </CSSTransition>
        )}
      )}
    </DropDownMenuContainer>
  )
}