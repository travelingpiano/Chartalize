import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from '../navbar/side_bar';

class DataTableShow extends React.Component{
  componentDidMount(){
    this.props.fetchOneDataTable(this.props.match.params.datatableId);
  }
  render(){
    let display;
    console.log(this.props);
    if(this.props.dataTable.title){
      display = (
        <div className="col-9 DataTables">
          <label>{this.props.dataTable.title}</label>
          <br></br>
          <table>
            <thead>
              <tr>
                {Object.keys(this.props.dataTable.table[0]).map((tableitem)=>
                <td>
                  {tableitem}
                </td>)}
              </tr>
            </thead>
            <tbody>
              {this.props.dataTable.table.map((tablerow)=>
              <tr>
                {Object.values(tablerow).map((tableitem)=>
                <td>
                  {tableitem}
                </td>)}
              </tr>)}
            </tbody>

          </table>
          <Link to="/data_tables">Show All Data Tables</Link>
        </div>
      );
    }else{
      display=(
        <div></div>
      );
    }
    return (
      <div className="dataTables">
        <SideBar currentPage="data_tables_show"/>
        {display}
      </div>
    );
  }
}

export default DataTableShow;
