import React from 'react';
import styled from 'styled-components'

import { generateGUID } from '../helpers';

import ColumnDataTypeInput from './ColumnDataTypeInput';
import ErrorIndicator from './ErrorIndicator';



const Container = styled.div`
  padding-top: 12px;
`;

const AddColumnButton = styled.button``;

const EditColumnButton = styled.button``;

const RemoveColumnButton = styled.button``;


const ColumnNameInput = styled.input``;

const ColumnDefaultInput = styled.input``;

const ColumnPrimaryKeyInput = styled.input``;

const ColumnFields = styled.div`
  display: flex;
`;

const ColumnField = styled.div`
  flex: ${(props) => props.flex || 1};
`;


const ColumnFieldHeaders = styled.div`
  display: flex;
`
const ColumnFieldHeader = styled.div`
  flex: ${(props) => props.flex || 1};
  font-size: 12px;
  font-weight: bold;
`

function TableColumnsInput(props){
  const { 
    value, 
    otherTables,
    onChange, 
    error 
  } = props;

  const updateColumnAtIndex = (index,changes) => {
    const newColumn = { ...value[index], ...changes };

    const newColumns = value.map((col,i) => {
      return index === i ? newColumn : col
    });

    onChange(newColumns);    
  }

  //TODO: use this clean up function instead of the below functions
  const handleColumnChange = (index) => (event) => {
    if(event.target.getAttribute('type') === 'checkbox'){
      updateColumnAtIndex(index,{[event.target.name]: event.target.checked});
    } else {
      updateColumnAtIndex(index,{[event.target.name]: event.target.value});
    }
  }


  const handleColumnNameChange = (index) => (event) => {
    updateColumnAtIndex(index,{ name: event.target.value });
  }

  const handleColumnDataTypeChange = (index) => (event) => {
    updateColumnAtIndex(index,{ dataType: event.target.value });
  }

  const handleColumnDataTypeArgsChange = (index) => (event) => {
    const newDataTypeArgs = { ...value[index].dataTypeArgs, [event.target.name]: event.target.value };
    updateColumnAtIndex(index,{ dataTypeArgs: newDataTypeArgs });
  }

  const handleColumnDefaultChange = (index) => (event) => {
    updateColumnAtIndex(index,{ defaultValue: event.target.value});
  }

  const handlePrimaryKeyClick = (index) => (event) => {
    updateColumnAtIndex(index,{ primaryKey:event.target.checked })
  }

  const handleNotNullClick = (index) => (event) => {
    updateColumnAtIndex(index,{ notNull:event.target.checked })
  }

  const handleAddColumnClick = (event) => {
    const newColumns = value.concat({
      id: generateGUID(),
      name:'',
      primaryKey:false,
      dataType:'',
      dataTypeArgs:{},
      notNull:false,
      defaultValue:''
    });

    onChange(newColumns);
  }

  const handleRemoveColumnClick = (index) => (event) => {
    const newColumns = value.filter((col,i) => i !== index);

    onChange(newColumns);
  }

  return (
    <Container>
      <ColumnFieldHeaders>
        <ColumnFieldHeader>Name</ColumnFieldHeader>
        <ColumnFieldHeader flex={2}>Data Type</ColumnFieldHeader>
        <ColumnFieldHeader>Default</ColumnFieldHeader>
        <ColumnFieldHeader>Not Null</ColumnFieldHeader>
        <ColumnFieldHeader>Primary Key</ColumnFieldHeader>
        <ColumnFieldHeader />
      </ColumnFieldHeaders>
      {value.map((column, index) => (
        <ColumnFields key={index}>

          <ColumnField>
            <ColumnNameInput 
              name='columnName'
              value={column.name}
              onChange={handleColumnNameChange(index)}
            />
            <ErrorIndicator>{(error && error[index]) && error[index].name}</ErrorIndicator>
          </ColumnField>

          <ColumnField flex={2}>
            <ColumnDataTypeInput
              value={column.dataType}
              argValues={column.dataTypeArgs}
              otherTables={otherTables}
              onChange={handleColumnDataTypeChange(index)}
              onArgChange={handleColumnDataTypeArgsChange(index)}
            />
            <ErrorIndicator>{(error && error[index]) && error[index].dataType}</ErrorIndicator>
          </ColumnField>

          <ColumnField>
            <ColumnDefaultInput 
              name='defaultValue'
              value={column.defaultValue}
              onChange={handleColumnDefaultChange(index)}
            />
          </ColumnField>

          <ColumnField>
            <ColumnPrimaryKeyInput 
              name='notNull'
              type='checkbox'
              defaultChecked={column.notNull}
              onClick={handleNotNullClick(index)}
            />
          </ColumnField>

          <ColumnField>
            <ColumnPrimaryKeyInput 
              name='primaryKey'
              type='checkbox'
              defaultChecked={column.primaryKey}
              onClick={handlePrimaryKeyClick(index)}
            />
          </ColumnField>
          
          <ColumnField>
            <EditColumnButton
              type='button'
            >
              Edit
            </EditColumnButton>
            <RemoveColumnButton 
              type='button'
              onClick={handleRemoveColumnClick(index)}
            >
              Remove
            </RemoveColumnButton>
          </ColumnField>
        </ColumnFields>
      ))}
      <AddColumnButton 
        type='button'
        onClick={handleAddColumnClick}
      >
        Add Column
      </AddColumnButton>
    </Container>
  )
}

TableColumnsInput.defaultProps = {
  value:[],
  error:[],
  onChange:() => {}
}

export default TableColumnsInput;