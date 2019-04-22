import DATA_TYPES from './dataTypes';

export function withCSSUnit(num) {
  //If the given value is a number, assume it is a pixel value and add 'px'
  //If the given number already has a % or is NaN assume it is a percent value and leave it alone
  return isNaN(num) ? num : num + 'px';
}

export function windowBoundsForRef(parentWindow, ref) {
  const rect = ref.current.getBoundingClientRect();
  //Translate the bounds so they are relative to the viewport (position: fixed;
  return {
    left: rect.left,
    top: rect.top,
    right: parentWindow.innerWidth - (rect.left + rect.width),
    bottom: parentWindow.innerHeight - (rect.top + rect.height)
  };
}

export function dimensionsForRef(ref) {
  const rect = ref.current.getBoundingClientRect();

  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height
  };
}

export function getCenterDimensionsForWindow(parentWindow) {
  return {
    x: parentWindow.innerWidth / 2,
    y: parentWindow.innerHeight / 2
  };
}

export function positionFixedDimensions(dimensions) {
  return {
    left: dimensions.x,
    top: dimensions.y,
    right: window.innerWidth - (dimensions.x + dimensions.width),
    bottom: window.innerHeight - (dimensions.y + dimensions.height)
  };
}

export function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function stateKey(schemaId, commitId) {
  return 'schema_' + schemaId + '_commit_' + commitId;
}

export function validateTable(table, otherTables) {
  function getNameError(name) {
    if (!name || name === '') {
      return 'Name is required';
    } else {
      return null;
    }
  }

  function getColumnNameError(name) {
    if (!name || name === '') {
      return 'Name is required';
    } else {
      return null;
    }
  }

  function getColumnDataTypeError(dataType, dataTypeArgs) {
    if (!dataType || dataType === '') {
      return 'Data type is required';
    } else {
      return null;
    }
  }

  return {
    otherErrors: null,
    name: getNameError(table.name),
    columns: table.columns.map((col) => ({
      id: col.id,
      name: getColumnNameError(col.name),
      dataType: getColumnDataTypeError(col.dataType)
    }))
  };
}

export function formatDataType(dataType, dataTypeArgs) {
  if (dataType === 'char') {
    return `char(${dataTypeArgs.numberOfCharacters})`;
  } else if (dataType === 'varchar') {
    return `varchar(${dataTypeArgs.numberOfCharacters})`;
  } else if (dataType === 'foreignKey') {
    return 'foreign key';
  } else if (DATA_TYPES[dataType]) {
    return DATA_TYPES[dataType].label;
  } else {
    return '';
  }
}
