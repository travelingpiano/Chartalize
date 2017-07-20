import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from '../navbar/side_bar';

class DataTableIndex extends React.Component{
  constructor(props){
    super(props);
    this.showDataTable = this.showDataTable.bind(this);
    this.deleteDataTable = this.deleteDataTable.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  showDataTable(e){
    this.props.history.push(`/data_tables/${e.target.value}`);
  }

  deleteDataTable(e){
    e.preventDefault();
    console.log(e.target.value);
    this.props.deleteDataTable(e.target.value);
  }

  render(){
    let display;
    if(this.props.dataTables[0]){
      display = (
        <div className="col-9 DataTables">
          <table className="datatables_table">
            <tr className="tableshead">
              <th>Title</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
            {this.props.dataTables.map((dataTable,idx)=>
            <tr key={dataTable.id} className={`tablesrow${idx%2}`}>
              <td>
                <button value={dataTable.id} onClick={this.showDataTable}>
                  {dataTable.title}
                </button>
              </td>
              <td>
                {dataTable.data_type}
              </td>
              <td>
                <button value={dataTable.id} onClick={this.deleteDataTable}>
                  Remove
                </button>
              </td>

            </tr>)}
          </table>
          <ul>

          </ul>
        </div>
      );
    }else{
      display = (
        <div></div>
      );
    }
    return (
      <div className="dataTables">
        <SideBar currentPage="data_tables_index"/>
        {display}
      </div>
    );
  }
}

export default DataTableIndex;
