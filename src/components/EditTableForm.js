import React, { useState } from 'react';
import styled from 'styled-components';

import { validateTable, generateGUID } from '../helpers';

import TextInput from './TextInput';
import EditColumnInputs from './EditColumnInputs';
import ColumnsMenu from './ColumnsMenu';

import { Form, Container, Row, Col, Button } from '@bootstrap-styled/v4';

const FullHeightForm = styled(Form)`
  height: 100%;
`;

const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NameInputRow = styled(Row)``;

const ColumnsInputRow = styled(Row)`
  flex: 1;
`;

const FooterButtonsRow = styled(Row)``;

const FooterButtonsCol = styled(Col)`
  display: flex;
  justify-content: space-between;
`;

function EditTableForm(props) {
  const { defaultValues, onSubmit, onCancelClick, otherTables } = props;

  const initialValues = { id: '', name: '', columns: [], ...defaultValues };

  const [name, setName] = useState(initialValues.name);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [columns, setColumns] = useState(initialValues.columns);
  const [errors, setErrors] = useState({});

  //Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTable = { id: initialValues.id, name: name, columns: columns };

    const newErrors = validateTable(newTable);

    if (
      newErrors.name ||
      newErrors.columns.some((col) => col.name || col.dataType)
    ) {
      console.log('GOT ERRORS ', newErrors);
      setErrors(newErrors);
    } else {
      onSubmit(e, newTable);
    }
  };

  const handleColumnChange = (id) => (event) => {
    let changes;

    //I could do this with a ternary but it would be really long
    if (event.target.type === 'checkbox') {
      changes = { [event.target.name]: event.target.checked };
    } else {
      changes = { [event.target.name]: event.target.value };
    }

    const newColumns = columns.map((col) => {
      return col.id === id ? { ...col, ...changes } : col;
    });

    setColumns(newColumns);
  };

  const handleColumnArgsChange = (id) => (event) => {
    const changes = { [event.target.name]: event.target.value };

    const newColumns = columns.map((col) => {
      if (col.id === id) {
        const newDataTypeArgs = { ...col.dataTypeArgs, ...changes };

        return { ...col, dataTypeArgs: newDataTypeArgs };
      } else {
        return col;
      }
    });

    setColumns(newColumns);
  };

  const handleAddColumnClick = (event) => {
    const newColumnId = generateGUID();

    const newColumns = columns.concat({
      id: newColumnId,
      name: '',
      primaryKey: false,
      dataType: '',
      dataTypeArgs: {},
      notNull: false,
      defaultValue: ''
    });

    setColumns(newColumns);
    setSelectedColumnId(newColumnId);
  };

  const selectedColumn = columns.find((col) => col.id === selectedColumnId);

  return (
    <FullHeightForm onSubmit={handleSubmit}>
      <FlexContainer>
        <NameInputRow>
          <Col xs={4} lg={3}>
            <TextInput
              label="Table name"
              value={name}
              error={errors.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </NameInputRow>
        <ColumnsInputRow>
          <Col xs={4} lg={3}>
            <ColumnsMenu
              columns={columns}
              selectedColumnId={selectedColumnId}
              onColumnClick={(col) => setSelectedColumnId(col.id)}
            />
          </Col>
          <Col xs={8} lg={9}>
            {selectedColumnId ? (
              <EditColumnInputs
                values={selectedColumn}
                onChange={handleColumnChange(selectedColumnId)}
                onArgsChange={handleColumnArgsChange(selectedColumnId)}
                otherTables={otherTables}
              />
            ) : (
              <div>Select a column...</div>
            )}
          </Col>
        </ColumnsInputRow>
        <FooterButtonsRow>
          <FooterButtonsCol xs={12}>
            <Button
              type="button"
              color="primary"
              onClick={handleAddColumnClick}
            >
              Add Column
            </Button>
            <div>
              <Button type="button" onClick={onCancelClick} color="danger">
                Cancel
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button type="submit" color="secondary">
                Save
              </Button>
            </div>
          </FooterButtonsCol>
        </FooterButtonsRow>
      </FlexContainer>
    </FullHeightForm>
  );
}

EditTableForm.defaultProps = {
  defaultValues: {
    id: '',
    name: '',
    columns: []
  },
  otherTables: [],
  onSubmit: () => {},
  onDelete: () => {},
  onCancelClick: () => {}
};

export default EditTableForm;
