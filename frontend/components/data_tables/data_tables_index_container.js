import {connect} from 'react-redux';
import DataTableIndex from './data_tables_index';
import {deleteDataTable,fetchAllDataTables} from '../../actions/data_table_actions';
import {selectAllDataTables} from '../../reducers/selectors';

const mapStateToProps = ({dataTables}) => ({
  dataTables: selectAllDataTables(dataTables)
});

const mapDispatchToProps = dispatch => ({
  deleteDataTable: id=>dispatch(deleteDataTable(id)),
  fetchAllDataTables: ()=>dispatch(fetchAllDataTables())
});

export default connect(mapStateToProps,mapDispatchToProps)(DataTableIndex);
