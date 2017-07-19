import React from 'react';
import {Link} from 'react-router-dom';

class DataTableShow extends React.Component{
  componentDidMount(){
    this.props.fetchOneDataTable(this.props.match.params.datatableId);
  }
  render(){
    return (
      <div>
        <label>{this.props.dataTable.title}</label>
        <Link to="/data_tables">Show All Data Tables</Link>
      </div>
    );
  }
}

export default DataTableShow;
