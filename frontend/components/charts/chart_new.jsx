import React from 'react';
import DataSelection from './chart_data_selections';
import {withRouter} from 'react-router';

class ChartNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xAxis: "",
      yAxis: "",
      data: [],
      headings: [],
      tableIdx: 0
    };
    this.dataTableSelection = this.dataTableSelection.bind(this);
    this.changeDataTable = this.changeDataTable.bind(this);
  }

  componentDidMount(){
    this.props.fetchAllDataTables();
  }

  dataTableSelection(){
    let display;
    if(this.props.dataTables[0]){
      display = (
        <select onChange={this.changeDataTable}>
          <option selected disabled>Choose a DataTable</option>
          {this.props.dataTables.map((dataTable,idx)=>
          <option value={idx} key={idx}>
            {dataTable.title}
          </option>)}
        </select>
      );
    }else{
      display = (<div></div>);
    }
    return display;
  }

  changeXAxis(xAxis){
    this.setState({xAxis});
  }

  changeYAxis(yAxis){
    this.setState({yAxis});
  }

  changeDataTable(e){
    let tableIdx = e.target.value;
    let headings = Object.keys(this.props.dataTables[tableIdx].table[0]);
    this.setState({tableIdx,headings});
  }

  render(){

    let display;
    if(this.state.headings.length !== 0){
      display = (<DataSelection headings={this.state.headings} />);
    }else{
      display = (<div></div>);
    }
    return(
      <div>
        {this.dataTableSelection()}
        {display}
      </div>
    );
  }
}

export default withRouter(ChartNew);
