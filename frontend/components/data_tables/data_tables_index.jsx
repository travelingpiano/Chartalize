import React from 'react';
import {Link} from 'react-router-dom';

class DataTableIndex extends React.Component{
  constructor(props){
    super(props);
    this.showDataTable = this.showDataTable.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  showDataTable(e){
    this.props.fetchOneDataTable(e.target.value);
  }

  render(){
    console.log(this.props);
    let display;
    if(this.props.dataTables[0]){
      display = (
        <ul>
          {this.props.dataTables.map((dataTable)=>
          <li key={dataTable.id}>
            <Link to={`/data_tables/${dataTable.id}`} >
              <button value={dataTable.id} onClick={this.showDataTable}>
                {dataTable.title}
              </button>
            </Link>
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
