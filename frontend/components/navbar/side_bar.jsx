import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class SideBar extends React.Component{
  constructor(props){
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleDataTables = this.handleDataTables.bind(this);
    this.handleNewChart = this.handleNewChart.bind(this);
    this.handleCharts = this.handleCharts.bind(this);
    this.handleShareChart = this.handleShareChart.bind(this);
    this.handleSharedCharts = this.handleSharedCharts.bind(this);
  }

  handleNew(e){
    this.props.history.push('/data_tables/new');
  }

  handleDataTables(e){
    this.props.history.push('/data_tables');
  }

  handleNewChart(e){
    this.props.history.push('/charts/new');
  }

  handleCharts(e){
    this.props.history.push('/charts');
  }

  handleShareChart(e){
    this.props.history.push(`${this.props.location.pathname}/share`);
  }

  handleSharedCharts(e){
    this.props.history.push('/charts/shared');
  }

  render(){
    let display;
    if(this.props.currentPage === "data_tables_index"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Your Data Tables</h1>
          <button onClick={this.handleNew} className="newtable_button">Import New Table</button>
          <button onClick={this.handleCharts} className="newtable_button">View Your Charts</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage === "data_tables_new"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Add Data Table</h1>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
          <button onClick={this.handleCharts} className="newtable_button">View Your Charts</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage==="data_tables_show"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Data Table</h1>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage==="charts_index"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Your Charts</h1>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
          <button onClick={this.handleNew} className="newtable_button">Import New Table</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage==="chart_show"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Chart</h1>
          <button onClick={this.handleCharts} className="newtable_button">View Your Charts</button>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
          <button onClick={this.handleShareChart} className="newtable_button">Share Chart</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage==="chart_share"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Share Chart</h1>
          <button onClick={this.handleCharts} className="newtable_button">View Your Charts</button>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
          <button onClick={this.handleSharedCharts} className="newtable_button">Shared Charts</button>
        </div>
      );
    }else if(this.props.currentPage==="shared_charts"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Shared Charts</h1>
          <button onClick={this.handleCharts} className="newtable_button">View Your Charts</button>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
        </div>
      );
    }
    return (<div className="sidebar">
      <div>
        {display}
        <button onClick={this.handleNewChart} className="newtable_button">Create a Chart</button>
      </div>
    </div>);
  }
}

export default withRouter(SideBar);
