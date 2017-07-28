import React from 'react';
import {withRouter} from 'react-router';
import SideBar from '../navbar/side_bar';
import NavBarContainer from '../navbar/navbar_container';

class SharedCharts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      charts: []
    };
    this.showChart = this.showChart.bind(this);
  }

  componentDidMount(){
    this.setState({charts: []},
    this.props.fetchSharedCharts);
  }

  componentWillReceiveProps(newProps){
    if(this.props.charts != newProps.charts){
      this.setState({charts: newProps.charts});
    }
  }

  showChart(e){
    this.props.history.push(`/charts/shared/${e.target.value}`);
  }

  render(){
    let display;
    if(this.state.charts.length > 0){
      display = (
        <div className="DataTables">
          <table className="datatables_table">
            <tbody>
              <tr className="tableshead">
                <td key={1} className="th-padding">Title</td>
                <td key={2} className="th-padding">Type</td>
                <td key={3} className="th-padding">Shared By</td>
              </tr>
              {this.state.charts.map((chart,idx)=>
                <tr key={chart.id} className={`tablesrow${idx%2}`}>
                  <td key="title" className="td-padding">
                    <button className="td-button" value={chart.id} onClick={this.showChart}>
                      {chart.title}
                    </button>
                  </td>
                  <td key="data-type" className="td-padding">
                    {chart.chart_type}
                  </td>
                  <td key="owner" className="td-padding">
                    {chart.owner}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }else{
      display = (
        <div className="DataTables">
          <label className="tableTitle">No Shared Charts yet</label>
        </div>
      );
    }
    return (
      <div>
        <NavBarContainer />
        <div className="dataTables">
          <SideBar currentPage="shared_charts" />
          {display}
        </div>
      </div>
    );
  }
}

export default withRouter(SharedCharts);
