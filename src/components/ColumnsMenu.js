import React from 'react';
import styled from 'styled-components';
import {
  FormGroup as bsFormGroup,
  Label as bsLabel,
  ListGroup,
  ListGroupItem as bsListGroupItem
} from '@bootstrap-styled/v4';

const FormGroup = styled(bsFormGroup)`
  margin-bottom: 0.5rem !important;
`;

const Label = styled(bsLabel)`
  margin-bottom: 0;
`;

const ListGroupItem = styled(bsListGroupItem)`
  padding: 0.5rem 0.75rem !important;
  margin: 0;
`;

function ColumnsMenu(props) {
  const { columns, selectedColumnId, onColumnClick } = props;

  return (
    <div>
      <FormGroup>
        <Label>Columns</Label>
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
  );
}

export default ColumnsMenu;
