import React from 'react';
import {withRouter} from 'react-router';

class ChartIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.idx = this.props.idx;
    this.chart = this.props.chart;
    this.deleteChart = this.deleteChart.bind(this);
    this.showChart = this.showChart.bind(this);
  }

  showChart(e){
    this.props.history.push(`/charts/${e.target.value}`);
  }

  deleteChart(e){
    e.preventDefault();
    this.props.deleteChart(this.chart.id);
  }

  render(){
    return (
      <tr key={this.chart.id} className={`tablesrow${this.idx%2}`}>
        <td key="title" className="td-padding">
          <button className="td-button" value={this.chart.id} onClick={this.showChart}>
            {this.chart.title}
          </button>
        </td>
        <td key="data-type" className="td-padding">
          {this.chart.chart_type}
        </td>
        <td key="delete" className="td-padding">
            <button  value={this.chart.id} onClick={this.deleteChart} className="td-button">
              <i  className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </td>
      </tr>
    );
  }
}

export default withRouter(ChartIndexItem);
