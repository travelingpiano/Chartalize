import React from 'react';
import {Link} from 'react-router-dom';

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
    this.props.fetchOneDataTable(e.target.value);
  }

  deleteDataTable(e){
    e.preventDefault();
    console.log(e.target.value);
    this.props.deleteDataTable(e.target.value);
  }

  render(){
    console.log(this.props);
    let display;
    if(this.props.dataTables[0]){
      console.log(this.props.dataTables[0]);
      display = (
        <ul>
          {this.props.dataTables.map((dataTable)=>
          <li key={dataTable.id}>
            <Link to={`/data_tables/${dataTable.id}`} >
              <button value={dataTable.id} onClick={this.showDataTable}>
                {dataTable.title}
              </button>
            </Link>
            <button value={dataTable.id} onClick={this.deleteDataTable}>
              Remove
            </button>
          </li>)}
        </ul>
      );
    }else{
      display = (
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

export default DataTableIndex;
