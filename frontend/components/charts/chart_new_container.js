import {connect} from 'react-redux';
import ChartNew from './chart_new';
import {fetchAllDataTables,fetchChartTable} from '../../actions/data_table_actions';
import {makeChart} from '../../actions/charts_actions';
import {values} from 'lodash';

const mapStateToProps = ({dataTables,chartTable, charts}) => ({
  dataTables: values(dataTables),
  chartTable: chartTable,
  errors: charts
});

const mapDispatchToProps = dispatch => ({
  fetchAllDataTables: ()=>dispatch(fetchAllDataTables()),
  fetchChartTable: id => dispatch(fetchChartTable(id)),
  makeChart: chart => dispatch(makeChart(chart))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChartNew);
