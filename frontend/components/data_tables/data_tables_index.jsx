import React from 'react';
import {Link} from 'react-router-dom';
import SideBar from '../navbar/side_bar';
import DataIndexItem from './data_index_item';

class DataTableIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  showDataTable(e){
    this.props.history.push(`/data_tables/${e.target.value}`);
  }



  render(){
    let display;
    console.log(this.props);
    if(this.props.dataTables[0]){
      display = (
        <div className="col-9 DataTables">
          <table className="datatables_table">
            <tbody>
              <tr className="tableshead">
                <td className="th-padding">Title</td>
                <td className="th-padding">Type</td>
                <td className="th-padding">Delete</td>
              </tr>
              {this.props.dataTables.map((dataTable,idx)=>
                <DataIndexItem key={idx} dataTable={dataTable} deleteDataTable={this.props.deleteDataTable} idx={idx} />
              )}
            </tbody>
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
