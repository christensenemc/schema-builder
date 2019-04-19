import React from 'react';
import styled from 'styled-components';
import capitalize from 'lodash/capitalize';

import { Form, FormGroup, Label, Input } from '@bootstrap-styled/v4';

function CheckboxInput(props){
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
      <Label check>
        <Input 
          type='checkbox' 
          name={name}
          checked={value}
          //onChange fires after the checkbox changes which makes setting "value" impossible
          onChange={onChange}
        />
        &nbsp;&nbsp;
        {capitalize(label || name)}
      </Label>
    </FormGroup>
  )
}

CheckboxInput.defaultProps = {
  value:false,
  placeholder:'',
  error:null,
  onChange:() => {}
}


export default CheckboxInput;