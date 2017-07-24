import React from 'react';
import {withRouter} from 'react-router';
import SideBar from '../navbar/side_bar';
import ChartIndexItem from './chart_index_item';

class ChartsIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchAllCharts();
  }

  render(){
    let display;
    if(this.props.charts.length === 0){
      display = (
        <div></div>
      );
    }else{
      display = (
        <div className="DataTables">
          <table className="datatables_table">
            <tbody>
              <tr className="tableshead">
                <td key={1} className="th-padding">Title</td>
                <td key={2} className="th-padding">Type</td>
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

export default withRouter(ChartsIndex);
