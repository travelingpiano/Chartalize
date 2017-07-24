import {connect} from 'react-redux';
import Shared from './shared';

const mapStateToProps = state => ({
  users: state.users,
  chart: state.charts
});
