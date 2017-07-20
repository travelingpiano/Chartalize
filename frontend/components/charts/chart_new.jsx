import React from 'react';
import {VictoryChart, VictoryBar} from 'victory';

class ChartNew extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tableIdx: -1
    };
    this.dataTableBar = this.dataTableBar.bind(this);
    this.DataTableChange = this.DataTableChange.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  DataTableChange(e){
    this.setState({tableIdx: e.target.value});
  }

  dataTableBar(){
    return (
      <div className="col-4">
        <select onChange={this.DataTableChange}>
          <option selected disabled>Choose a Data Table</option>
          {this.props.dataTables.map((dataTable,idx)=>
          <option value={idx}>
            {dataTable.title}
          </option>)}
        </select>
      </div>
    );
  }

  xAxisBar(){
    let display;
    if(this.state.tableIdx===-1){
      display = (
        <select onChange={this.xAxisChange}>
          <option selected disabled>Choose an X Axis</option>
        </select>
      );
    }else{
      display = (
        <select onChange={this.xAxisChange}>
          <option selected disabled>Choose an X Axis</option>
          {Object.keys(this.props.dataTables[this.state.tableIdx].table[0]).map((heading)=>
          <option value={heading}>
            {heading}
          </option>)}
        </select>
      );
    }
    return display;
  }

  yAxisBar(){
    let display;
    if(this.state.tableIdx===-1){
      display = (
        <select onChange={this.yAxisChange}>
          <option selected disabled>Choose a Y Axis</option>
        </select>
      );
    }else{
      display = (
        <select onChange={this.yAxisChange}>
          <option selected disabled>Choose an X Axis</option>
          {Object.keys(this.props.dataTables[this.state.tableIdx].table[0]).map((heading)=>
          <option value={heading}>
            {heading}
          </option>)}
        </select>
      );
    }
    return display;
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
        {this.dataTableBar()}
        {this.xAxisBar()}
        {this.yAxisBar()}
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
