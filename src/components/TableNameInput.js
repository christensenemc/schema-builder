import React from 'react';

import ErrorIndicator from './ErrorIndicator';

function TableNameInput(props){
  const { value, onChange, error } = props;

  return (
    <div>
      <input 
        type='text' 
        value={value}
        onChange={onChange}
      />
      <ErrorIndicator>{error}</ErrorIndicator>
    </div>
  )
}

TableNameInput.defaultProps = {
  value:'',
  error:null,
  onChange:() => {}
}

export default TableNameInput;