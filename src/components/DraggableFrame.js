import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import styled from 'styled-components';

const ContentFrame = styled.div`
  position: fixed;
  z-index: 50;
  width: ${(props) => props.width || 180}px;
`;

const Content = styled.div`
  border: 1px solid lightgrey;
  width: ${(props) => props.width || 180}px;
  border-radius: 2px;
  transform: ${(props) => (props.dragging ? 'scale(1.02)' : 'scale(1)')};
  box-shadow: ${(props) =>
    props.dragging ? '3px 3px 5px lightgrey' : 'inherit'};
  cursor: ${(props) => (props.dragging ? 'grabbing' : 'grab')};
  transition: transform 0.05s ease-in, box-shadow 0.05s ease-in;
  background-color: white;
`;

const DraggableFrame = React.forwardRef(function(props, ref) {
  const { position, width, onDragStart, onDrag, onDragStop } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handleStart = (event, data) => {
    setIsDragging(true);
    onDragStart(event, data);
  };

  const handleDrag = (event, data) => onDrag(event, data);

  const handleStop = (event, data) => {
    setIsDragging(false);
    onDragStop(event, data);
  };

  return (
    <Draggable
      position={position}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <ContentFrame width={width} ref={ref}>
        <Content dragging={isDragging} width={width}>
          {props.children}
        </Content>
      </ContentFrame>
    </Draggable>
  );
});

DraggableFrame.propTypes = {
  defaultPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  onDragStart: PropTypes.func,
  onDrag: PropTypes.func,
  onDragStop: PropTypes.func
};

DraggableFrame.defaultProps = {
  defaultPosition: {
    x: 0,
    y: 0
  },
  onDragStart: () => {},
  onDrag: () => {},
  onDragStop: () => {}
};

export default DraggableFrame;
