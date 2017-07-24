import {connect} from 'react-redux';
import ChartsIndex from './charts_index';
import {fetchAllCharts, deleteChart} from '../../actions/charts_actions';
import {selectCurrentUserCharts} from '../../reducers/selectors';

const mapStateToProps = state => ({
  charts: selectCurrentUserCharts(state.charts,state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  fetchAllCharts: ()=>dispatch(fetchAllCharts()),
  deleteChart: id => dispatch(deleteChart(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChartsIndex);
