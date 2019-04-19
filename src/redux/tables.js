import { generateGUID, stateKey } from '../helpers';
import omit from 'lodash/omit';

const TABLE_ADDED = 'TABLE_ADDED',
  TABLE_UPDATED = 'TABLE_UPDATED',
  TABLE_REMOVED = 'TABLE_REMOVED',
  LOADED_FROM_LOCALSTORAGE = 'LOADED_FROM_LOCALSTORAGE',
  SAVED_TO_LOCALSTORAGE = 'SAVED_TO_LOCALSTORAGE';

export function addTable(tableAttributes) {
  const defaultAttributes = {
    id: generateGUID(),
    position: { x: 0, y: 0 },
    dimensions: { height: 54, width: 206, x: 0, y: 0 },
    name: '',
    columns: [],
    expanded: true
  };

  const newTable = { ...defaultAttributes, ...tableAttributes };

  return {
    type: TABLE_ADDED,
    payload: {
      tableId: newTable.id,
      attributes: newTable
    }
  };
}

export function updateTable(tableId, updatedAttributes) {
  return {
    type: TABLE_UPDATED,
    payload: {
      tableId: tableId,
      attributes: updatedAttributes
    }
  };
}

export function removeTable(tableId) {
  return {
    type: TABLE_REMOVED,
    payload: {
      tableId: tableId
    }
  };
}

export function loadFromLocalStorage(schemaId, commitId) {
  const savedState = JSON.parse(
    window.localStorage.getItem(stateKey(schemaId, commitId))
  );

  return {
    type: LOADED_FROM_LOCALSTORAGE,
    payload: {
      savedState: savedState
    }
  };
}

export function saveToLocalStorage(schemaId, commitId, state) {
  console.log('ATTEMPTING TO SAVE:', state);

  window.localStorage.setItem(
    stateKey(schemaId, commitId),
    JSON.stringify(state)
  );

  return {
    type: SAVED_TO_LOCALSTORAGE
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOADED_FROM_LOCALSTORAGE: {
      const { savedState } = action.payload;

      return savedState ? savedState.tables : {};
    }

    case TABLE_ADDED: {
      const { tableId, attributes } = action.payload;

      return {
        ...state,
        [tableId]: attributes
      };
    }

    case TABLE_UPDATED: {
      const { tableId, attributes } = action.payload;

      return {
        ...state,
        [tableId]: {
          ...state[tableId],
          ...attributes
        }
      };
    }

    case TABLE_REMOVED: {
      const { tableId } = action.payload;

      return omit(state, tableId);
    }

    default: {
      return state;
    }
  }
}
