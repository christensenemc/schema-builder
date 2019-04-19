
import React,{ Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withCSSUnit } from '../helpers';

const ANIMATION_TIME_IN_SECONDS = 0.25

const ModalContainer = styled.div`
  position: fixed;
  background-color:transparent;
  height: 100%;
  width: 100%;
  z-index: 100;
`;

const FadedBackdrop = styled.div`
  position: fixed;
  height: 100%;
  width: 100%
  background-color: grey;
  opacity: ${(props) => props.opacity};
  transition: all ${ANIMATION_TIME_IN_SECONDS}s ease-in;
`;

const Window = styled.div`
  position: fixed;
  left: ${(props) => (props.left ? withCSSUnit(props.left) : 'inherit')};
  right: ${(props) => (props.right ? withCSSUnit(props.right) : 'inherit')};
  top: ${(props) => (props.top ? withCSSUnit(props.top) : 'inherit')};
  bottom: ${(props) => (props.bottom ? withCSSUnit(props.bottom) : 'inherit')};
  background-color: white; 
  box-shadow: 2px 2px 5px grey;
  border-radius: 2px;
  padding: 12px;
  opacity: ${(props) => props.opacity};
  transition: all ${ANIMATION_TIME_IN_SECONDS}s ease-in;
  overflow:hidden;
`;

const WindowContent = styled.div`
  opacity: ${(props) => props.opacity};
  transition: all ${ANIMATION_TIME_IN_SECONDS}s ease-in;
`


function ExpandingModal(props){
  const { 
    closedBounds,
    openBounds,
    open,
    children,
    onClose
  } = props; 

  const [ contentVisible, setContentVisible ] = useState(!!open);
  const [ toggled, setToggled ] = useState(!!open);
  const [ visible, setVisible ] = useState(!!open);

  useEffect(() => {
    if(open && !toggled){
      const delay = ANIMATION_TIME_IN_SECONDS * 1000 - 50;
      setVisible(true);
      setTimeout(() => {setToggled(true)}, 0);
      setTimeout(() => setContentVisible(true), delay);

    } else if(toggled && !open){
      const delay = ANIMATION_TIME_IN_SECONDS * 1000;

      setToggled(false);
      setContentVisible(false)
      setTimeout(() => setVisible(false),delay)
    }
  },[open]);

  const handleBackdropClick = (e) => onClose(e);

  console.log('VISIBLE = ',visible,'OPEN = ',open,'TOGGLED = ',toggled);

  if(!visible) return null;

  return (
    <ModalContainer>
      <FadedBackdrop 
        opacity={toggled ? 0.5 : 0} 
        onClick={handleBackdropClick}
      />
      {visible && (
      <Window
        left={toggled ? openBounds.left : closedBounds.left}
        right={toggled ? openBounds.right : closedBounds.right}
        top={toggled ? openBounds.top : closedBounds.top}
        bottom={toggled ? openBounds.bottom : closedBounds.bottom}
      >
        <WindowContent opacity={contentVisible ? 1 : 0}>
          {contentVisible && children}
        </WindowContent>
      </Window>
      )}
    </ModalContainer>
  )
}

ExpandingModal.propTypes = {
  open:PropTypes.bool,
  children:PropTypes.node,
  onClose:PropTypes.func,

  //TODO: Implement this cleaner API
  closedBounds:PropTypes.shape({
    top:PropTypes.number.isRequired,
    bottom:PropTypes.number.isRequired,
    left:PropTypes.number.isRequired,
    right:PropTypes.number.isRequired
  }),
  openBounds:PropTypes.shape({
    top:PropTypes.number.isRequired,
    bottom:PropTypes.number.isRequired,
    left:PropTypes.number.isRequired,
    right:PropTypes.number.isRequired
  }),


};

ExpandingModal.defaultProps = {
  open:false,
  onClose:() => {}
}


export default ExpandingModal;



