import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NoBorderButton = styled.button`
  cursor: pointer;
  border: none;
`;

function IconButton(props) {
  const { icon, onClick, onMouseDown } = props;

  return (
    <NoBorderButton type="button" onClick={onClick} onMouseDown={onMouseDown}>
      <FontAwesomeIcon icon={icon} />
    </NoBorderButton>
  );
}

export default IconButton;
