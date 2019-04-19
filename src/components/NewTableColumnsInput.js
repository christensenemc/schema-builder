import React,{ useState } from 'react';
import styled from 'styled-components';

import { Button, FormLabel } from './shared';
import { generateGUID } from '../helpers';

import ColumnsMenu from './ColumnsMenu';
import DataTypeInput from './ColumnDataTypeInput';
import ColumnsMenuItem from './ColumnsMenuItem';
import TextInput from './TextInput';
import ErrorIndicator from './ErrorIndicator';

const NEW_COLUMN_NAME_PLACEHOLDER = 'new_column';

const Container = styled.div`
  padding-top: 12px;
  display: flex;
  flex-direction: row;
`;

const ColumnsMenuContainer = styled.div`
  width: 180px;
`;

const ColumnsMenuHeader = styled.div``;

const SelectedColumn = styled.div`
  flex: 1;
`;

const ColumnNameInput = styled.input`
  
`;

const ColumnName = styled.div``;
const ColumnNamePlaceholder = styled.div``;

function TableColumnsInput(props){
  const { 
    value, 
    otherTables,
    onChange, 
    error 
  } = props;

  //We alias this for clarities sake
  const columns = value;

  const [ selectedColumnId, setSelectedColumnId ] = useState(null);

  const updateColumnAtIndex = (index,changes) => {
    const newColumn = { ...columns[index], ...changes };

    const newColumns = columns.map((col,i) => {
      return index === i ? newColumn : col
    });

    onChange(newColumns);    
  }

  const updateColumnWithId = (id,changes) => {
    const newColumns = columns.map((col,i) => {
      return col.id === id ? { ...col, ...changes } : col
    });

    onChange(newColumns);        
  }

  // //TODO: use this clean up function instead of the below functions
  // const handleColumnChange = (index) => (event) => {
  //   if(event.target.getAttribute('type') === 'checkbox'){
  //     updateColumnAtIndex(index,{[event.target.name]: event.target.checked});
  //   } else {
  //     updateColumnAtIndex(index,{[event.target.name]: event.target.value});
  //   }
  // }


  const handleColumnChange = (id) => (event) => {
    updateColumnWithId(id,{[event.target.name]:event.target.value});
  };

  const handleColumnDataTypeChange = (id) => (event) => {};
  const handleColumnDataTypeArgsChange = (id) => (event) => {};

  const handleAddColumnClick = (event) => {
    const newColumnId = generateGUID();

    const newColumns = columns.concat({
      id: newColumnId,
      name:'',
      primaryKey:false,
      dataType:'',
      dataTypeArgs:{},
      notNull:false,
      defaultValue:''
    });

    onChange(newColumns);
    setSelectedColumnId(newColumnId);
  }

  const handleRemoveColumnClick = (id) => (event) => {
    const newColumns = columns.filter((col) => col.id !== id);

    setSelectedColumnId(null);
    onChange(newColumns);
  }

  const selectedColumn = columns.find((col) => col.id === selectedColumnId);

  return (
    <Container>

      <ColumnsMenuContainer>
        <ColumnsMenu 
          columns={columns} 
          selectedColumnId={selectedColumnId}
          onColumnClick={(col) => setSelectedColumnId(col.id)}
        />
        <Button onClick={handleAddColumnClick}>
          Add Column
        </Button>
      </ColumnsMenuContainer>
      {selectedColumnId && (
        <SelectedColumn>
          <TextInput 
            name='name'
            placeholder={NEW_COLUMN_NAME_PLACEHOLDER}
            value={selectedColumn.name} 
            onChange={handleColumnChange(selectedColumnId)}
          />
          <DataTypeInput 
              value={selectedColumn.dataType}
              argValues={selectedColumn.dataTypeArgs}
              otherTables={otherTables}
              onChange={handleColumnDataTypeChange(selectedColumnId)}
              onArgChange={handleColumnDataTypeArgsChange(selectedColumnId)}
          />
          <Button onClick={handleRemoveColumnClick(selectedColumnId)}>
            Delete this column
          </Button>
        </SelectedColumn>
      )}
    </Container>
  )
}

TableColumnsInput.defaultProps = {
  value:[],
  error:[],
  onChange:() => {}
}

export default TableColumnsInput;