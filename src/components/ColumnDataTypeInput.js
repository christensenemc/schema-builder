import React,{Fragment} from 'react';
import styled from 'styled-components';
import values from 'lodash/values';

import { FormLabel } from './shared';

import DATA_TYPES from '../dataTypes';

const TableSelect = styled.select``;
const DataTypeSelect = styled.select``;
const NumberInput = styled.input``;

function DataTypeArgInput(props){
  const { 
    id, 
    type, 
    label, 
    otherTables,
    onChange ,
    value
  } = props;

  if(type === 'table'){
    return (
      <TableSelect 
        name={id}
        value={value}
        onChange={onChange}
      >
        <option value={null}></option>
        {otherTables.map((table) => (
          <option 
            key={table.id}
            value={table.id}
          > 
            {table.name}
          </option>
        ))}
      </TableSelect>
    )
  }


  if(type === 'number'){
    return (
      <NumberInput
        type='number'
        name={id}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
    )
  }

  return (
    <span>{label}</span>
  )
}

export default function ColumnDataTypeInput(props){
  const { 
    value, 
    argValues,
    onChange, 
    onArgChange,
    otherTables 
  } = props;

  const dataTypes = values(DATA_TYPES),
    dataTypeArgs = DATA_TYPES[value] ? values(DATA_TYPES[value].args) : [];

  const handleTypeChange = (event) => {
    onChange(event);
  }

  const handleArgChange = (event) => {
    onArgChange(event)
    // console.log('ARGS = ',{ ...argValues, [event.target.name]:event.target.value })
  }

  return (
    <div>
      <FormLabel>Data Type</FormLabel>
      <DataTypeSelect
        name='dataType'
        value={value}
        onChange={handleTypeChange}
      >  
        <option value={null}></option>
        {dataTypes.map((dataType) => (
          <option 
            key={dataType.id}
            value={dataType.id}
          >
            {dataType.label}
          </option>
        ))}
      </DataTypeSelect>
      {dataTypeArgs.map((arg) => (
        <DataTypeArgInput 
          key={arg.id} 
          type={arg.type} 
          label={arg.label} 
          id={arg.id} 
          otherTables={otherTables}
          value={argValues[arg.id]}
          onChange={handleArgChange}
        />
      ))}
    </div>
  )
}