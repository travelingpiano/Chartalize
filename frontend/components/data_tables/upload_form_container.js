import {connect} from 'react-redux';
import UploadForm from './upload_form';
import {makeDataTable} from '../../actions/data_table_actions';

const mapStateToProps = state => ({
  state: state,
  errors: state.dataTables.errors
});

const mapDispatchToProps = dispatch => ({
  makeDataTable: dataTable => dispatch(makeDataTable(dataTable))
});

export default connect(mapStateToProps,mapDispatchToProps)(UploadForm);
