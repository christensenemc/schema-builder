import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconButton from './IconButton';

import {
  faEdit,
  faWindowMinimize,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';

import DraggableFrame from './DraggableFrame';

import {
  windowBoundsForRef,
  dimensionsForRef,
  formatDataType
} from '../helpers';

import { useUpdateEffect } from '../hooks';

const Header = styled.div`
  display: flex;
  padding-top: 8px;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 8px;
  border-bottom: ${(props) =>
    props.showBottomBorder ? '1px solid LightGrey' : 'none'};
`;

const Title = styled.div`
  flex: 1;
  font-weight: bold;
`;

const HeaderButtons = styled.div``;

const Columns = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Column = styled.div`
  display: flex;
`;

const ColumnName = styled.div`
  flex: 1;
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`;

const ColumnType = styled.div`
  flex: 1;
  text-align: right;
  font-style: italic;
`;

function Table(props) {
  const {
    name,
    columns,
    expanded,
    onEditClick,
    onExpandClick,
    onDimensionsChange,
    onPositionChange,
    position
  } = props;

  const draggableFrameRef = React.createRef();

  useUpdateEffect(() => {
    //Every time the columns are updated or the table is minimized or maximized, send over the dimensions
    onDimensionsChange(dimensionsForRef(draggableFrameRef));
  }, [expanded, columns]);

  const handleMouseDown = (event) => {
    //We have to swallow the event to prevent React-Draggable from calling onStart()
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  const handleEditClick = (event) => {
    //We send the bounding rect from the draggable frame so the edit modal window can expand out from it
    onEditClick(event, windowBoundsForRef(window, draggableFrameRef));
  };

  const handleDrag = (event, data) => {
    //We send the dimensions along too so they can be stored to draw connectors
    onPositionChange(
      { x: data.x, y: data.y },
      dimensionsForRef(draggableFrameRef)
    );
  };

  return (
    <DraggableFrame
      width={240}
      ref={draggableFrameRef}
      position={position}
      onDrag={handleDrag}
    >
      <Header showBottomBorder={expanded}>
        <Title>{name}</Title>
        <HeaderButtons>
          <IconButton
            onMouseDown={handleMouseDown}
            onClick={handleEditClick}
            icon={faEdit}
          />
          <IconButton
            onMouseDown={handleMouseDown}
            onClick={onExpandClick}
            icon={expanded ? faWindowMinimize : faWindowMaximize}
          />
        </HeaderButtons>
      </Header>
      <Columns show={expanded}>
        {columns.map((column) => (
          <Column key={column.name}>
            <ColumnName bold={column.primaryKey}>{column.name}</ColumnName>
            <ColumnType>
              {formatDataType(column.dataType, column.dataTypeArgs)}
            </ColumnType>
          </Column>
        ))}
      </Columns>
    </DraggableFrame>
  );
}

Table.propTypes = {
  name: PropTypes.string,
  expanded: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, //Name of the column
      primaryKey: PropTypes.bool.isRequired, //Is the column a primary key
      dataType: PropTypes.string.isRequired, //Type of the column
      dataTypeArgs: PropTypes.object
    })
  ),
  onEditClick: PropTypes.func,
  onDimensionsChange: PropTypes.func,
  onPositionChange: PropTypes.func
};

Table.defaultProps = {
  name: '',
  columns: [],
  expanded: true,
  onEditClick: () => {},
  onPositionChange: () => {},
  onDimensionsChange: () => {}
};

export default Table;
