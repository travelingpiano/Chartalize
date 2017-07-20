import React from 'react';
import {withRouter} from 'react-router';

class DataIndexItem extends React.Component{
  constructor(props){
    super(props);
    this.idx = this.props.idx;
    this.dataTable = this.props.dataTable;
    this.deleteDataTable = this.deleteDataTable.bind(this);
    this.showDataTable = this.showDataTable.bind(this);
  }

  showDataTable(e){
    this.props.history.push(`/data_tables/${e.target.value}`);
  }

  deleteDataTable(e){
    e.preventDefault();
    console.log(e.target.value);
    this.props.deleteDataTable(this.dataTable.id);
  }

  render(){
    return (
      <tr key={this.dataTable.id} className={`tablesrow${this.idx%2}`}>
        <td key="title" className="td-padding">
          <button className="td-button" value={this.dataTable.id} onClick={this.showDataTable}>
            {this.dataTable.title}
          </button>
        </td>
        <td key="data-type" className="td-padding">
          {this.dataTable.data_type}
        </td>
        <td key="delete" className="td-padding">
            <button  value={this.dataTable.id} onClick={this.deleteDataTable} className="td-button">
              <i  className="fa fa-trash-o" aria-hidden="true"></i>
            </button>

        </td>

      </tr>
    );
  }
}

export default withRouter(DataIndexItem);
