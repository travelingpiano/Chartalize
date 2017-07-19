import React from 'react';
import {Link} from 'react-router-dom';

class DataTableShow extends React.Component{
  componentDidMount(){
    this.props.fetchOneDataTable(this.props.match.params.datatableId);
  }
  render(){
    let display;
    if(this.props.dataTable.title){
      display = (
        <div>
          <label>{this.props.dataTable.title}</label>
          <br></br>
          <table>
            <thead>
              <tr>
                {this.props.dataTable.table[0].map((tableitem)=>
                <td>
                  {tableitem}
                </td>)}
              </tr>
            </thead>
            <tbody>
              {this.props.dataTable.table.map((tablerow)=>
              <tr>
                {tablerow.map((tableitem)=>
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
      <div>
        {display}
      </div>
    );
  }
}

export default DataTableShow;
