import {connect} from 'react-redux';
import {editChart, fetchOneChart} from '../../actions/charts_actions';
import {fetchAllUsers} from '../../actions/users_actions';
import ShareChart from './share_chart';
import {values} from 'lodash';

const mapStateToProps = state => ({
  users: values(state.users),
  chart: state.charts
});

const mapDispatchToProps = dispatch => ({
  fetchOneChart: id => dispatch(fetchOneChart(id)),
  fetchAllUsers: () => dispatch(fetchAllUsers()),
  editChart: (chart,id) => dispatch(editChart(chart,id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareChart);
