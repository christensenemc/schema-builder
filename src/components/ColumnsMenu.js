import React from 'react';
import styled from 'styled-components';
import { 
  Button,
  FormGroup,
  Label,
  ListGroup, 
  ListGroupItem, 
} from '@bootstrap-styled/v4';


const NoBottomMarginLabel = styled(Label)`
  margin-bottom: 0px;
`

const AddColumnButton = styled(Button)`
  margin-top: 0.5rem;
`

function ColumnsMenu(props){
  const {
    columns,
    selectedColumnId,
    onColumnClick
  } = props;


  return (
    <div>
      <FormGroup>
        <NoBottomMarginLabel>Columns</NoBottomMarginLabel>
      </FormGroup>
      <ListGroup>
        {columns.map((col) => (
          <ListGroupItem 
            key={col.id}
            active={col.id === selectedColumnId}
            onClick={() => onColumnClick(col)}
          >
            {col.name || 'Untitled column'}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  )
}

export default ColumnsMenu;