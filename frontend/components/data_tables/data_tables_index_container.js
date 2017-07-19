import {connect} from 'react-redux';
import DataTableIndex from './data_tables_index';
import {fetchOneDataTable,fetchAllDataTables} from '../../actions/data_table_actions';

const mapStateToProps = ({dataTables}) => ({
  dataTables
});

const mapDispatchToProps = dispatch => ({
  fetchOneDataTable: id=>dispatch(fetchOneDataTable(id)),
  fetchAllDataTables: ()=>dispatch(fetchAllDataTables())
});

export default connect(mapStateToProps,mapDispatchToProps)(DataTableIndex);
