import {connect} from 'react-redux';
import {selectSharedCharts} from '../../reducers/selectors';
import {fetchSharedCharts} from '../../actions/charts_actions';
import SharedCharts from './shared_charts';
import {values} from 'lodash';

const mapStateToProps = ({charts}) => ({
  charts: values(charts)
});

const mapDispatchToProps = dispatch => ({
  fetchAllCharts: () => dispatch(fetchSharedCharts())
});

export default connect(mapStateToProps,mapDispatchToProps)(SharedCharts);
