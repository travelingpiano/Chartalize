import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import SideBar from '../navbar/side_bar';
import ChartIndexItem from './chart_index_item';

class ChartsIndex extends React.Component{
  constructor(props){
    super(props);
    this.showChart = this.showChart.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllCharts();
  }

  showChart(e){
    this.props.history.push(`/charts/${e.target.value}`);
  }

  render(){
    let display;
    if(this.props.charts.length === 0){
      display = (
        <div className="DataTables">
          <label className="tableTitle">No Charts Yet</label>
          <Link className="import-table" to='/charts/new'>Let's Make One?</Link>
        </div>
      );
    }else{
      display = (
        <div className="DataTables">
          <table className="datatables_table">
            <tbody>
              <tr className="tableshead">
                <td key={1} className="th-padding">Title</td>
                <td key={2} className="th-padding">Type</td>
                <td key={4} className="th-padding">Share</td>
                <td key={3} className="th-padding">Delete</td>
              </tr>
              {this.props.charts.map((chart,idx)=>
                <ChartIndexItem key={chart.id} chart={chart} deleteChart={this.props.deleteChart} idx={idx} />
              )}
            </tbody>
          </table>
        </div>
      );
    }
    return(
      <div className="dataTables">
        <SideBar currentPage="charts_index"/>
        {display}
      </div>
    );
  }
}

export default ChartsIndex;
// <ChartIndexItem key={chart.id} chart={chart} deleteChart={this.props.deleteChart} idx={idx} />
