import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import values from 'lodash/values';

import Table from '../../components/Table';
import ExpandingModal from '../../components/ExpandingModal';
import EditTableForm from '../../components/EditTableForm';
import TableConnections from '../../components/TableConnections';

import { generateGUID } from '../../helpers';

import connect from './connect';


const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;

const AddTableButton = styled.button`
  z-index:100;
  position: relative;
`

const SaveTableButton = styled.button`
  z-index: 100;
  position: relative;
`

function EditSchemaRoute(props){

  const {
    schemaId,
    commitId,
    tables, 
    addTable, 
    updateTable,
    removeTable,
    loadFromLocalStorage,
    saveToLocalStorage
  } = props;


  //We start the modal window with a null bounds state so it doesnt throw an error
  const nullBounds = { top:null, left:null, right:null, bottom:null },
    centerBounds = {top: 100, left:100, right:100,bottom:100};

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ expandBounds, setExpandBounds ] = useState(nullBounds);
  const [ tableBeingEdited, setTableBeingEdited ] = useState(null);


  //Fetch the schema from localstorage
  useEffect(() => {
    loadFromLocalStorage(schemaId,commitId);

    //Persist the schema to local storage
    //TODO: get state to save, actually save it
    //return () => saveStateToLocalStorage(schemaId,commitId);
  },[schemaId,commitId]);

  //Handlers
  const handleModalClose = (event) => {
    setModalOpen(false);
  };

  const handleAddTableClick = (event) => {
    const newTable = {
      id:generateGUID(),
      name:'new_table'
    };

    addTable(newTable);
    setTableBeingEdited(newTable);
    setExpandBounds(centerBounds)
    setModalOpen(true);
  }

  const handleSaveTableClick = (event) => {
    saveToLocalStorage(schemaId,commitId,{tables:tables});
  }

  const handleTableEditClick = (tableId) => (event,bounds) => {
    setTableBeingEdited(tables[tableId]);
    setExpandBounds(bounds);
    setModalOpen(true);  
  }

  const handleTableExpandClick = (tableId) => (event) => {
    updateTable(tableId,{ expanded: !tables[tableId].expanded });
  }

  const handleTableDimensionsChange = (tableId) => (dimensions) => {
    updateTable(tableId,{ dimensions:dimensions });
  }

  const handleTablePositionChange = (tableId) => (position,dimensions) => {
    updateTable(tableId,{ position: position, dimensions:dimensions });
  }

  const handleEditTableFormSubmit = (event,updatedTable) => {
    updateTable(updatedTable.id,{ ...updatedTable, expanded:true });
    setModalOpen(false);
  }

  const handleEditTableFormDelete = (event,updatedTable) => {
    removeTable(updateTable.id);
    setModalOpen(false);
  }

  return (
    <Container>
      <AddTableButton onClick={handleAddTableClick}>
        Add Table
      </AddTableButton>
      <SaveTableButton onClick={handleSaveTableClick}>
        Commit
      </SaveTableButton>
      <ExpandingModal  
        open={modalOpen}
        left={expandBounds.left}
        right={expandBounds.right}
        top={expandBounds.top}
        bottom={expandBounds.bottom} 
        onClose={handleModalClose}
      >
        <EditTableForm 
          defaultValues={tableBeingEdited} 
          otherTables={values(tables)}
          onSubmit={handleEditTableFormSubmit}
          onDelete={handleEditTableFormDelete}
          onCancelClick={handleModalClose}
        />
      </ExpandingModal>
      {values(tables).map((table) => (
        <Table 
          key={table.id}
          name={table.name}
          expanded={table.expanded} 
          position={table.position}
          columns={table.columns}
          onExpandClick={handleTableExpandClick(table.id)}
          onDimensionsChange={handleTableDimensionsChange(table.id)}
          onPositionChange={handleTablePositionChange(table.id)}
          onEditClick={handleTableEditClick(table.id)}
        /> 
      ))}
      <TableConnections tables={tables} />
    </Container>
  )
}

export default connect(EditSchemaRoute);



