import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { 
  addTable,
  updateTable,
  removeTable,
  loadFromLocalStorage,
  saveToLocalStorage 
} from '../../redux/tables';


function mapStateToProps(state,props){
  return {
    schemaId:props.match.params.schemaId,
    commitId:props.match.params.commitId || 'initial',
    tables:state.tables
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
    addTable, 
    updateTable,
    removeTable,
    saveToLocalStorage,
    loadFromLocalStorage
  },dispatch);
}

export default function(component){
  return connect(mapStateToProps,mapDispatchToProps)(component);
}
