import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withCSSUnit } from '../helpers';

const ANIMATION_TIME_IN_SECONDS = 0.25;

const ModalContainer = styled.div`
  position: fixed;
  background-color: transparent;
  height: 100%;
  width: 100%;
  z-index: 100;
`;

const FadedBackdrop = styled.div`
  position: fixed;
  top:0;
  left:0;
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
  opacity: ${(props) => props.opacity};
  transition: all ${ANIMATION_TIME_IN_SECONDS}s ease-in;
  overflow: hidden;
`;

const WindowContent = styled.div`
  opacity: ${(props) => props.opacity};
  transition: all ${ANIMATION_TIME_IN_SECONDS}s ease-in;
  height: 100%;
`;

class ExpandingModal extends Component {
  constructor(props) {
    super();

    this.state = {
      //We store these in the state because they have to delay slightly when props change
      visible: false,
      windowBounds: {
        left: null,
        right: null,
        top: null,
        bottom: null
      },
      fadeOpacity: 0,
      windowOpacity: 0,
      contentVisible: false
    };
  }

  componentDidMount() {
    if (this.props.open) {
      this.showModal();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.open && this.props.open) {
      this.showModal();
    } else if (prevProps.open && !this.props.open) {
      this.closeModal();
    }
  }

  showModal() {
    const { left, right, top, bottom } = this.props;

    //We start by setting the window to the size of original rectangle and showing the modal
    this.setState({
      visible: true,
      windowBounds: {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      },
      fadeOpacity: 0,
      windowOpacity: 1
    });

    //We update the bounds on the next animation frame.
    //This guarantees the window component is mounted and the animation fires.
    setTimeout(() => {
      this.setState({
        windowBounds: {
          left: '10%',
          right: '10%',
          top: 40,
          bottom: 40
        },
        fadeOpacity: 0.5
      });

      //Once the animation is done firing, we show the content
      //This avoids ugly reflowing content while the window is expanding
      setTimeout(() => {
        this.setState({ contentVisible: true });
      }, ANIMATION_TIME_IN_SECONDS * 1000 + 10);
    }, 0);
  }

  closeModal() {
    const { left, right, top, bottom } = this.props;

    this.setState({
      visible: true,
      windowBounds: {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      },
      fadeOpacity: 0,
      contentVisible: false
    });

    setTimeout(() => {
      this.setState({ visible: false });
    }, ANIMATION_TIME_IN_SECONDS * 1000);
  }

  render() {
    const { onClose, children } = this.props;

    const {
      visible,
      contentVisible,
      fadeOpacity,
      windowOpacity,
      windowBounds
    } = this.state;

    const handleBackdropClick = (e) => onClose(e);

    if (!visible) return null;

    return (
      <ModalContainer>
        <FadedBackdrop opacity={fadeOpacity} onClick={handleBackdropClick} />
        <Window
          opacity={windowOpacity}
          left={windowBounds.left}
          right={windowBounds.right}
          top={windowBounds.top}
          bottom={windowBounds.bottom}
        >
          <WindowContent opacity={contentVisible ? 1 : 0}>
            {contentVisible && children}
          </WindowContent>
        </Window>
      </ModalContainer>
    );
  }
}

ExpandingModal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,

  //Initial bounds
  left: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,

  //TODO: Implement this cleaner API
  closedBounds: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  }),
  openBounds: PropTypes.shape({
    top: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  })
};

ExpandingModal.defaultProps = {
  open: false,
  onClose: () => {}
};

export default ExpandingModal;
