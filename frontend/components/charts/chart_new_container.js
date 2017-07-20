import {connect} from 'react-redux';
import ChartNew from './chart_new';
import {fetchAllDataTables} from '../../actions/data_table_actions';
import {selectCurrentUserTables} from '../../reducers/selectors';

const mapStateToProps = ({dataTables,session}) => ({
  dataTables: selectCurrentUserTables(dataTables,session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  fetchAllDataTables: ()=>dispatch(fetchAllDataTables())
});

export default connect(mapStateToProps,mapDispatchToProps)(ChartNew);
