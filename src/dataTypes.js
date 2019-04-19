const DATA_TYPES = {
  //STRING TYPES
  varchar: {
    id: 'varchar',
    label: 'varchar',
    group: 'strings',
    args: {
      numberOfCharacters: {
        type: 'number',
        id: 'numberOfCharacters',
        label: 'number of characters',
        placeholder: 120
      }
    }
  },
  char: {
    id: 'char',
    label: 'char',
    group: 'strings',
    args: {
      numberOfCharacters: {
        type: 'number',
        id: 'numberOfCharacters',
        label: 'number of characters',
        placeholder: 120
      }
    }
  },
  text: {
    id: 'text',
    group: 'strings',
    label: 'text'
  },

  //DATE TYPES
  timestamp: {
    id: 'timestamp',
    group: 'dates',
    label: 'timestamp'
  },
  date: {
    id: 'date',
    group: 'dates',
    label: 'date'
  },
  time: {
    id: 'time',
    group: 'dates',
    label: 'time'
  },

  //INTEGER TYPES
  smallInteger: {
    id: 'smallInteger',
    group: 'integers',
    label: 'small integer'
  },
  integer: {
    id: 'integer',
    group: 'integers',
    label: 'integer'
  },
  serial: {
    id: 'serial',
    group: 'integers',
    label: 'serial'
  },

  //MONEY TYPES
  money: {
    id: 'money',
    group: 'money',
    label: 'money'
  },

  //BINARY TYPES
  bytea: {
    id: 'bytea',
    group: 'binary',
    label: 'bytea'
  },

  //LOGIC TYPES
  boolean: {
    id: 'boolean',
    group: 'logic',
    label: 'boolean'
  },
  //RELATIONSHIPS
  foreignKey: {
    id: 'foreignKey',
    group: 'relationships',
    label: 'foreign key',
    args: {
      targetTable: {
        type: 'table',
        id: 'targetTable',
        label: 'Target table'
      }
    }
  }
};

export default DATA_TYPES;
