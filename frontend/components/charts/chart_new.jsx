import React from 'react';
import {VictoryChart, VictoryBar} from 'victory';

class ChartNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tableIdx: -1
    };
    this.menubar = this.menubar.bind(this);
    this.DataTableChange = this.DataTableChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  DataTableChange(e){
    console.log(e.target.value);
  }

  menubar(){
    return (
      <div className="col-4">
        <select onChange={this.DataTableChange}>
          <option selected disabled>Choose a Data Table</option>
          {this.props.dataTables.map((dataTable)=>
          <option value={dataTable.id}>
            {dataTable.title}
          </option>)}
        </select>
      </div>
    );
  }

  render(){
    console.log(this.props);
    let display;
    if(this.props.dataTables){
      display = (
        <div></div>
      );
    }
    return(
      <div>
        {this.menubar()}
      </div>
    );
  }
}

// <VictoryChart>
//   <VictoryBar
//     data={this.props.state.dataTables.table}
//     x="games" y="goals" />
// </VictoryChart>

export default ChartNew;
