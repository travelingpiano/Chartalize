import React from 'react';
import {withRouter} from 'react-router';

class ChartIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      idx: this.props.idx,
      chart: this.props.chart
    };
    this.idx = this.props.idx;
    this.chart = this.props.chart;
    this.deleteChart = this.deleteChart.bind(this);
    this.showChart = this.showChart.bind(this);
    this.shareChart = this.shareChart.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(newProps!==this.props){
      this.setState({idx: newProps.idx, chart: newProps.chart});
    }
  }

  showChart(e){
    this.props.history.push(`/charts/${e.target.value}`);
  }

  shareChart(e){
    this.props.history.push(`/charts/${this.state.chart.id}/share`);
  }

  deleteChart(e){
    e.preventDefault();
    this.props.deleteChart(this.chart.id);
  }

  render(){
    return (
      <tr key={this.state.chart.id} className={`tablesrow${this.state.idx%2}`}>
        <td key="title" className="td-padding">
          <button className="td-button" value={this.state.chart.id} onClick={this.showChart}>
            {this.state.chart.title}
          </button>
        </td>
        <td key="data-type" className="td-padding">
          {this.state.chart.chart_type}
        </td>
        <td key="share" className="td-padding">
          <button  value={this.state.chart.id} onClick={this.shareChart} className="td-button">
            <i className="fa fa-share" aria-hidden="true"></i>
          </button>
        </td>
        <td key="delete" className="td-padding">
            <button  value={this.state.chart.id} onClick={this.deleteChart} className="td-button">
              <i  className="fa fa-trash-o" aria-hidden="true"></i>
            </button>
        </td>
      </tr>
    );
  }
}

export default withRouter(ChartIndexItem);
