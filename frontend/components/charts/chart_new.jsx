//drag and drop implementation of creating new chart, also current implementation on site
import React from 'react';
import DataSelection from './chart_data_selections';
import {withRouter} from 'react-router';
import {values, keys, merge} from 'lodash';
import NavBarContainer from '../navbar/navbar_container';
import ChartGenerator from './chart_generator';

import {findDOMNode} from 'react-dom';

class ChartNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xAxis: "",
      yAxis: "",
      y2Axis: "",
      type: "",
      data: [],
      headings: [],
      table: [],
      tableIdx: 0,
      Chart: (<div></div>),
      errors: [],
      dropdownActive: false,
      dataTableName: "Choose a Data Table",
      sortType: "X Axis Asc",
      color: "253A5C"
    };
    this.changeXAxis = this.changeXAxis.bind(this);
    this.changeYAxis = this.changeYAxis.bind(this);
    this.changeY2Axis = this.changeY2Axis.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.dataTableSelection = this.dataTableSelection.bind(this);
    this.changeDataTable = this.changeDataTable.bind(this);
    this.submitChart = this.submitChart.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggleDataTable = this.toggleDataTable.bind(this);
    this.changeDataTableCustom = this.changeDataTableCustom.bind(this);
    this.changeChart = this.changeChart.bind(this);
    this.close =  this.close.bind(this);
  }

  close(e){
    this.setState({dropdownActive: false});
  }

  componentDidMount(){
    window.addEventListener('click',this.handleOutsideClick);
    window.addEventListener('touchstart',this.handleOutsideClick);
    this.props.fetchAllDataTables();
  }

  componentWillUnmount(){
    window.removeEventListener('click',this.handleOutsideClick);
    window.removeEventListener('touchstart',this.handleOutsideClick);
  }



  handleOutsideClick(e){
    const dropdownTarget = findDOMNode(this).getElementsByClassName("Dropdown-Option");
    const dropdownTarget2 = findDOMNode(this).getElementsByClassName("Dropdown-Optionz")[0];
  }

  toggleDataTable(e){
    this.setState({dropdownActive: !this.state.dropdownActive,
    headings: [], table: [], tableIdx: 0, dataTableName: "Choose a Data Table"});
  }

  componentWillReceiveProps(newProps){
    if(newProps.errors.constructor === Array){
      this.setState({errors: newProps.errors});
    }
  }

  changeTitle(e){
    this.setState({title: e.target.value, errors: []});
  }

  changeDataTableCustom(e){
    let tableIdx = e.target.value;
    let dataTableName = this.props.dataTables[tableIdx].title;
    this.props.fetchChartTable(this.props.dataTables[tableIdx].id).then(
      ChartTable =>
      this.setState({
        headings: Object.keys(ChartTable.dataTable.table[0]),
        table: ChartTable.dataTable.table, tableIdx, dataTableName, dropdownActive: !this.state.dropdownActive
      })
    );
  }

  dataTableSelection(){
    let display;
    if(this.props.dataTables[0] ){
      if(!this.state.dropdownActive){
        display = (
          <button onClick={this.toggleDataTable} className="Dropdown-Optionz">{this.state.dataTableName}</button>
        );
      }else{
        display = (
          <div className="Dropdown-Custom" tabIndex="0" onBlur={this.close}>
            <button onClick={this.toggleDataTable} className="Dropdown-Optionz">Choose a Data Table</button>
              <div className="Dropdown-Options">
                {this.props.dataTables.map((dataTable,idx)=>
                <button value={idx} key={idx} onClick={this.changeDataTableCustom} className="Dropdown-Option">
                  {dataTable.title}
                </button>)}
              </div>
          </div>
        );
      }

    }else{
      display = (<label className="empty-dropdown">No Tables Available</label>);
    }
    return display;
  }

  changeXAxis(xAxis){
    this.setState({xAxis});
  }

  changeYAxis(yAxis){
    this.setState({yAxis});
  }

  changeY2Axis(y2Axis){
    this.setState({y2Axis});
  }

  changeDataTable(e){
    let tableIdx = e.target.value;
    this.props.fetchChartTable(this.props.dataTables[tableIdx].id).then(
      ChartTable =>
      this.setState({
        headings: Object.keys(ChartTable.dataTable.table[0]),
        table: ChartTable.dataTable.table, tableIdx
      })
    );
  }

  changeChart(data,Chart,type,errors, sortType){
    this.setState({data,Chart,type,errors, sortType});
  }

  submitChart(e){
    let chart = {};
    chart.chart = {title: this.state.title, chart_type: this.state.type, xAxis: this.state.xAxis, yAxis: this.state.yAxis, data: this.state.data,data_table_id: this.props.dataTables[this.state.tableIdx].id};
    this.props.makeChart(chart).then(
      newchart => this.props.history.push('/charts')
    );
  }

  render(){
    let display;
    if(this.state.headings.length===0){
      display = (
        <div className="Selections"></div>
      );
    }else{
      display = (
        <DataSelection headings={this.state.headings} changeXAxis={xAxis=>this.changeXAxis(xAxis)} changeYAxis={yAxis=>this.changeYAxis(yAxis)}/>
      );
    }
    return(
      <div>
        <NavBarContainer />
        <div className="ChartForm">
          <div className="ChartSelections">
            <label className="SelectionsTitle">Table Choice</label>
            {this.dataTableSelection()}
            <label className="SelectionsTitle">Axis Choices</label>
            <DataSelection headings={this.state.headings} changeXAxis={xAxis=>this.changeXAxis(xAxis)} changeYAxis={yAxis=>this.changeYAxis(yAxis)}
            changeY2Axis={y2Axis=>this.changeY2Axis(y2Axis)}/>
          </div>
          <ChartGenerator changeChart={(data,chart,type,errors, sortType)=>this.changeChart(data,chart,type,errors, sortType)} data={this.state.data} y2Axis={this.state.y2Axis} yAxis={this.state.yAxis} xAxis={this.state.xAxis} type={this.state.type} table={this.state.table} sortType={this.state.sortType} color={this.state.color}/>

          <div className="ChartCanvas">
            <div className="Title-Errors">
              {this.state.errors.map((error,idx)=>
              <label style={{marginTop: '0px'}} className="errors" key={idx}>{error}</label>
              )}
              <div className="Title-Submit">
                <input value={this.state.title} onChange={this.changeTitle} placeholder="Title" className="ChartTitle"></input>
                <button onClick={this.submitChart} className="ChartSubmit">Save Chart</button>
              </div>
            </div>
            {this.state.Chart}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChartNew);
