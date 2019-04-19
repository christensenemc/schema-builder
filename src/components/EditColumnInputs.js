import React from 'react';

import TextInput from './TextInput';
import TypeInput from './TypeInput';
import CheckboxInput from './CheckboxInput';

import { Container, Row, Col } from '@bootstrap-styled/v4';

function EditColumnInputs(props){
  const { 
    values, 
    onChange, 
    onArgsChange,
    otherTables 
  } = props;

  return (
    <Container>
      <Row>
        <Col xs='12'>
          <TextInput 
            name='name' 
            label='Column name' 
            value={values.name || ''}
            onChange={onChange}
            placeholder='Untitled column'
          />
          <TypeInput 
            name='dataType' 
            label='Data type' 
            value={values.dataType || ''}
            argsValue={values.dataTypeArgs}
            onChange={onChange}
            onArgsChange={onArgsChange}
            otherTables={otherTables}
          />
          <TextInput 
            name='defaultValue' 
            label='Default value' 
            value={values.defaultValue || ''}
            onChange={onChange}
            placeholder='None'
          />          
        </Col>
      </Row>
      <Row>
        <Col>
          <CheckboxInput 
            label='Primary key' 
            name='primaryKey'
            value={values.primaryKey}
            onChange={onChange}
          />
        </Col>
        <Col>
          <CheckboxInput 
            label='Not null' 
            name='notNull'
            value={values.notNull}
            onChange={onChange}
          />          
        </Col>
      </Row>
    </Container>
  );
}

EditColumnInputs.defaultProps = {
  values:{}
};

export default EditColumnInputs;