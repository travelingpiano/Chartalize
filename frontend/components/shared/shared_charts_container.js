import {connect} from 'react-redux';
import {selectSharedCharts} from '../../reducers/selectors';
import {fetchAllCharts} from '../../actions/charts_actions';
import SharedCharts from './shared_charts';

const mapStateToProps = state => ({
  charts: selectSharedCharts(state.charts,state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({
  fetchAllCharts: () => dispatch(fetchAllCharts())
});

export default connect(mapStateToProps,mapDispatchToProps)(SharedCharts);
