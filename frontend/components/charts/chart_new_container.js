import {connect} from 'react-redux';
import ChartNew from './chart_new';
import {fetchOneDataTable} from '../../actions/data_table_actions';

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  fetchOneDataTable: id => dispatch(fetchOneDataTable(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChartNew);
