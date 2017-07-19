import {connect} from 'react-redux';
import DataTableShow from './data_table_show';
import {fetchOneDataTable} from '../../actions/data_table_actions';

const mapStateToProps = state => ({
  dataTable: state.dataTables
});

const mapDispatchToProps = dispatch => ({
  fetchOneDataTable: id => dispatch(fetchOneDataTable(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(DataTableShow);
