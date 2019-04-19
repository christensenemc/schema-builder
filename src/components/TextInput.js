import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { Form, FormGroup, Label, Input } from '@bootstrap-styled/v4';

function TextInput(props){
  const { 
    value, 
    name,
    label,
    onChange,
    error,
    placeholder
  } = props;

  //TODO: Forward ref to input

  return (
    <FormGroup>
      <Label>{capitalize(label || name)}</Label>
      <Input 
        type='text' 
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FormGroup>
  )
}

TextInput.defaultProps = {
  value:'',
  placeholder:'',
  error:null,
  onChange:() => {}
}


export default TextInput;