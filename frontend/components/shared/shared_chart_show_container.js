import {connect} from 'react-redux';
import SharedChartShow from './shared_chart_show';
import {fetchSharedChart} from '../../actions/charts_actions';

const mapStateToProps = state => ({
  chart: state.charts
});

const mapDispatchToProps = dispatch => ({
  fetchSharedChart: id => dispatch(fetchSharedChart(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(SharedChartShow);
