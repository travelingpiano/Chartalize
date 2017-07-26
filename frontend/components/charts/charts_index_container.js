import {connect} from 'react-redux';
import ChartsIndex from './charts_index';
import {fetchAllCharts, deleteChart} from '../../actions/charts_actions';
import {withRouter} from 'react-router';
import {values} from 'lodash';

const mapStateToProps = ({charts}) => ({
  charts: values(charts)
});

const mapDispatchToProps = dispatch => ({
  fetchAllCharts: ()=>dispatch(fetchAllCharts()),
  deleteChart: id => dispatch(deleteChart(id))
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ChartsIndex));
