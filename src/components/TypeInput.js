import React from 'react';
import capitalize from 'lodash/capitalize';
import values from 'lodash/values';

import { FormGroup, Label, Input } from '@bootstrap-styled/v4';
import Select from 'react-select';

import DATA_TYPES from '../dataTypes';

function formatChangeEvent(name, value) {
  return {
    target: {
      name: name,
      value: value
    }
  };
}

function formatDataTypeOption(option) {
  return { label: option.label, value: option.id };
}

function formatTableOption(option) {
  return { label: option.name, value: option.id };
}

function TypeInput(props) {
  const {
    value,
    argsValue,
    name,
    label,
    onChange,
    onArgsChange,
    otherTables
  } = props;

  //TODO: Forward ref to input

  const dataTypes = values(DATA_TYPES),
    dataTypeArgs = DATA_TYPES[value] ? values(DATA_TYPES[value].args) : [];

  return (
    <div>
      <FormGroup>
        <Label>{capitalize(label || name)}</Label>
        <Select
          value={value ? formatDataTypeOption(DATA_TYPES[value]) : null}
          options={dataTypes.map(formatDataTypeOption)}
          onChange={(option) => onChange(formatChangeEvent(name, option.value))}
        />
      </FormGroup>
      {dataTypeArgs.map((dataTypeArg, i) => {
        const value = argsValue[dataTypeArg.id],
          name = dataTypeArg.id;

        if (dataTypeArg.type === 'number') {
          return (
            <FormGroup key={i}>
              <Label>{capitalize(dataTypeArg.label)}</Label>
              <Input
                type="number"
                value={value}
                name={name}
                placeholder={dataTypeArg.placeholder || ''}
                onChange={onArgsChange}
              />
            </FormGroup>
          );
        } else if (dataTypeArg.type === 'table') {
          const tableOptions = otherTables.map(formatTableOption),
            selectedOption = tableOptions.find(
              (option) => option.value === value
            );

          return (
            <FormGroup key={i}>
              <Label>{capitalize(dataTypeArg.label)}</Label>
              <Select
                value={selectedOption}
                options={tableOptions}
                onChange={(option) =>
                  onArgsChange(formatChangeEvent(name, option.value))
                }
              />
            </FormGroup>
          );
        } else {
          return (
            <FormGroup key={i}>
              <Label>{capitalize(dataTypeArg.label)}</Label>
              <Input
                type="text"
                value={value}
                name={name}
                onChange={onArgsChange}
                placeholder={dataTypeArg.placeholder || ''}
              />
            </FormGroup>
          );
        }
      })}
    </div>
  );
}

TypeInput.defaultProps = {
  value: '',
  placeholder: '',
  error: null,
  onChange: () => {}
};

export default TypeInput;
