import {connect} from 'react-redux';
import SharedChartShow from './shared_chart_show';
import {fetchOneChart} from '../../actions/charts_actions';

const mapStateToProps = state => ({
  chart: state.charts
});

const mapDispatchToProps = dispatch => ({
  fetchOneChart: id => dispatch(fetchOneChart(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(SharedChartShow);
