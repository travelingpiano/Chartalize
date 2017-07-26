import {connect} from 'react-redux';
import DataTableIndex from './data_tables_index';
import {deleteDataTable,fetchAllDataTables} from '../../actions/data_table_actions';
import {values} from 'lodash';

const mapStateToProps = ({dataTables,session}) => ({
  dataTables: values(dataTables)
});

const mapDispatchToProps = dispatch => ({
  deleteDataTable: id=>dispatch(deleteDataTable(id)),
  fetchAllDataTables: ()=>dispatch(fetchAllDataTables())
});

export default connect(mapStateToProps,mapDispatchToProps)(DataTableIndex);
