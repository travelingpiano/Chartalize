import React from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class SideBar extends React.Component{
  constructor(props){
    super(props);
    this.handleNew = this.handleNew.bind(this);
    this.handleDataTables = this.handleDataTables.bind(this);
  }

  handleNew(e){
    console.log(this.props);
    this.props.history.push('/data_tables/new');
  }

  handleDataTables(e){
    console.log(this.props);
    this.props.history.push('/data_tables');
  }

  render(){
    let display;

    if(this.props.currentPage === "data_tables_index"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Your Data Tables</h1>
          <button onClick={this.handleNew} className="newtable_button">Import New Table</button>
        </div>
      );
    }else if(this.props.currentPage === "data_tables_new"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Add Data Table</h1>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
        </div>
      );
    }else if(this.props.currentPage==="data_tables_show"){
      display = (
        <div>
          <h1 className="DataTablesTitle">Data Table</h1>
          <button onClick={this.handleDataTables} className="newtable_button">View Your Tables</button>
        </div>
      );
    }
    return (<div className="col-3 sidebar">
      <div>
        {display}
      </div>
    </div>);
  }
}

export default withRouter(SideBar);
