import React from 'react';
import styled from 'styled-components';

const SelectableDiv = styled.div`
  font-weight: ${(props) => props.selected ? 'bold' : 'normal'};
  cursor: pointer;
  font-style: ${(props) => props.isPlaceholder ? 'italic' : 'normal'};
`; 

function ColumnsMenuItem(props){
  const { 
    title, 
    placeholder,
    selected,
    onClick 
  } = props;


  const isPlaceholder = !(title && title.length > 0);

  return (
    <SelectableDiv 
      selected={selected}
      onClick={onClick}
      isPlaceholder={isPlaceholder}
    >
      {selected && (<span>&#8226;&nbsp;</span>)}
      {isPlaceholder ? placeholder : title}
    </SelectableDiv>
  )
}

export default ColumnsMenuItem;