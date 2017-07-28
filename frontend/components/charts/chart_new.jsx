//drag and drop implementation of creating new chart, also current implementation on site
import React from 'react';
import DataSelection from './chart_data_selections';
import {withRouter} from 'react-router';
import {values, keys, merge} from 'lodash';
import NavBarContainer from '../navbar/navbar_container';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, BarChart, Bar, Cell, AreaChart, Area, defs, linearGradient, stop} from 'recharts';
import {findDOMNode} from 'react-dom';

class ChartNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xAxis: "",
      yAxis: "",
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
    this.changeTitle = this.changeTitle.bind(this);
    this.dataTableSelection = this.dataTableSelection.bind(this);
    this.changeDataTable = this.changeDataTable.bind(this);
    this.parseData = this.parseData.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.createScatterChart = this.createScatterChart.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.createPieChart = this.createPieChart.bind(this);
    this.createAreaChart = this.createAreaChart.bind(this);
    this.submitChart = this.submitChart.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.toggleDataTable = this.toggleDataTable.bind(this);
    this.changeDataTableCustom = this.changeDataTableCustom.bind(this);
    this.close =  this.close.bind(this);
    this.changeSortType = this.changeSortType.bind(this);
    this.xAxisDesc = this.xAxisDesc.bind(this);
    this.xAxisAsc = this.xAxisAsc.bind(this);
    this.yAxisAsc = this.yAxisAsc.bind(this);
    this.yAxisDesc = this.yAxisDesc.bind(this);
    this.changeColor = this.changeColor.bind(this);
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

  changeColor(e){
    console.log(e.target.value);
    this.setState({color: e.target.value});
  }

  changeSortType(e){
    if(this.state.type==="Scatter"){
      this.setState({sortType: e.target.value},
      this.createScatterChart);
    }else if(this.state.type==="Line"){
      this.setState({sortType: e.target.value},
      this.createLineChart);
    }else if(this.state.type==="Bar"){
      this.setState({sortType: e.target.value},
      this.createBarChart);
    }else if(this.state.type==="Area"){
      this.setState({sortType: e.target.value},
      this.createAreaChart);
    }else if(this.state.type==="Pie"){
      this.setState({sortType: e.target.value},
      this.createPieChart);
    }else{
      this.setState({sortType: e.target.value});
    }
  }

  handleOutsideClick(e){
    const dropdownTarget = findDOMNode(this).getElementsByClassName("Dropdown-Option");
    const dropdownTarget2 = findDOMNode(this).getElementsByClassName("Dropdown-Optionz")[0];
    // console.log(values(dropdownTarget));
    // const baseTarget = document.getElementById('1');
    // console.log(dropdownTarget2);
    // console.log(e.target);
    // console.log(values(dropdownTarget).length);
    // console.log(values(dropdownTarget).includes(e.target));
    // console.log(dropdownTarget2===e.target);
    // if(values(dropdownTarget).length > 1 && !values(dropdownTarget).includes(e.target) && this.state.dataTableName !== "Choose a Data Table"){
    //   this.setState({dropdownActive: false});
    // }
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

  xAxisDesc(origData){
    let xData = [];
    let yData = [];
    let xSortedData = [];
    for(let i = 0; i<origData.length; i++){
      xData.push(origData[i][this.state.xAxis]);
      yData.push(origData[i][this.state.yAxis]);
      xSortedData.push(origData[i][this.state.xAxis]);
    }
    xSortedData.sort().reverse();
    let ySortedData = [];
    for(let i = 0; i< origData.length; i++){
      let ind = xData.indexOf(xSortedData[i]);
      ySortedData.push(yData[ind]);
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.state.xAxis] = xSortedData[i];
      rowData[this.state.yAxis] = ySortedData[i];
      data.push(rowData);
    }
    return data;
  }

  xAxisAsc(origData){
    let xData = [];
    let yData = [];
    let xSortedData = [];
    for(let i = 0; i<origData.length; i++){
      xData.push(origData[i][this.state.xAxis]);
      yData.push(origData[i][this.state.yAxis]);
      xSortedData.push(origData[i][this.state.xAxis]);
    }
    xSortedData.sort();
    let ySortedData = [];
    for(let i = 0; i< origData.length; i++){
      let ind = xData.indexOf(xSortedData[i]);
      ySortedData.push(yData[ind]);
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.state.xAxis] = xSortedData[i];
      rowData[this.state.yAxis] = ySortedData[i];
      data.push(rowData);
    }
    return data;
  }

  yAxisAsc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.state.yAxis] > origData[j][this.state.yAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  yAxisDesc(origData){
    for(let i = 0; i<origData.length-1;i++){
      for(let j = i+1; j < origData.length; j++){
        //if need to swap
        if(origData[i][this.state.yAxis] < origData[j][this.state.yAxis]){
          let temp = origData[i];
          origData[i] = origData[j];
          origData[j] = temp;
        }
      }
    }
    return origData;
  }

  parseData(){
    let currentTable = this.state.table;
    let yData = [];
    let xData = [];
    for(let key in currentTable){
      //check if x data value is present in that row
      if(keys(currentTable[key]).includes(this.state.xAxis)){
        //check if y data value is present in that row
        if(keys(currentTable[key]).includes(this.state.yAxis)){
          if(isNaN(Number(currentTable[key][this.state.yAxis]))){
            return undefined;
          }else{
            let xDataVal = currentTable[key][this.state.xAxis];
            let ind = xData.indexOf(xDataVal);
            //if same xdataval has been found already;
            if(ind !== -1){
              yData[ind].push(Number(currentTable[key][this.state.yAxis]));
            }else{
              yData.push([Number(currentTable[key][this.state.yAxis])]);
              xData.push(xDataVal);
            }
          }
        }else{
          return "Missing Y Data Values";
        }
      }else{
        return "Missing X Data Values";
      }
    }
    //average out y data with same x data value s
    for(let i = 0; i<yData.length; i++){
      let yDataAvg = 0;
      for(let j = 0; j < yData[i].length; j++){
        yDataAvg += yData[i][j];
      }
      yData[i] = Math.round(yDataAvg/yData[i].length*1000)/1000;
    }
    let data = [];
    for(let i = 0; i <yData.length; i++){
      let rowData = {};
      rowData[this.state.xAxis] = xData[i];
      rowData[this.state.yAxis] = yData[i];
      data.push(rowData);
    }
    if(this.state.sortType==="X Axis Desc"){
      data = this.xAxisDesc(data);
    }else if(this.state.sortType==="X Axis Asc"){
      data = this.xAxisAsc(data);
    }else if(this.state.sortType==="Y Axis Asc"){
      data = this.yAxisAsc(data);
    }else if(this.state.sortType==="Y Axis Desc"){
      data = this.yAxisDesc(data);
    }
    return data;
  }

  createLineChart(e){
    let type = "Line";
    if(this.state.xAxis && this.state.yAxis){
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let data = this.parseData();
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%" >

            <LineChart data={data}
                  className="PreviewChart">
               <text className="Axis-Label">x axis</text>
               <XAxis dataKey={x} name={x} label={x}/>
               <YAxis dataKey={y} name={y} />
               <Tooltip/>
               <Legend />
               <Line isAnimationActive={true} type="monotone" dataKey={y} stroke={`#${this.state.color}`} activeDot={{r: 8}}/>
            </LineChart>
          </ResponsiveContainer>
        );
         this.setState({data, Chart, type, errors: []});
      }else{
        this.setState({errors: ["Y Axis must be numerical values"],
        Chart: (<div></div>), data: []});
      }
    }
  }

  createScatterChart(e){
    let type = "Scatter";
    if(this.state.xAxis && this.state.yAxis){
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let data = this.parseData();
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%" >

            <ScatterChart
                  className="PreviewChart">
                <XAxis dataKey={x} name={x} label={x}/>
                <YAxis dataKey={y} name={y} />
                <Tooltip/>
                <Scatter type="monotone" data={data} className="Chart" fill={`#${this.state.color}`}/>
            </ScatterChart>
          </ResponsiveContainer>
        );
         this.setState({data, Chart, type, errors: []});
      }else{
        this.setState({errors: ["Y Axis must be numerical values"],
        Chart: (<div></div>), data: []});
      }
    }
  }

  createBarChart(e){
    if(this.state.xAxis && this.state.yAxis){
      let type = "Bar";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <BarChart data={data}
                  className="PreviewChart">
               <XAxis dataKey={x} name={x} label={x}/>
               <YAxis dataKey={y} name={y} />
               <Tooltip/>
               <Legend />
               <Bar type="monotone" dataKey={y} className="Chart" fill={`#${this.state.color}`}/>
            </BarChart>
          </ResponsiveContainer>
        );
         this.setState({data, Chart, type, errors: []});
      }else{
        this.setState({errors: ["Y Axis must be numerical values"],
        Chart: (<div></div>), data: []});
      }
    }
  }

  createPieChart(){
    if(this.state.xAxis && this.state.yAxis){
      let type= "Pie";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <PieChart className="PreviewChart">
              <Pie isAnimationActive={true} nameKey={x} dataKey={y} data={data} className="PieChart">{
                  data.map((entry, index) => <Cell className={`PieCell${index%2}`}/>)
                }</Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        );
        this.setState({data,Chart, type, errors: []});
      }else{
        this.setState({errors: ["Y Axis must be numerical values"],
        Chart: (<div></div>), data: []});
      }
    }
  }

  createAreaChart(e){
    if(this.state.xAxis && this.state.yAxis){
      let type= "Area";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      if(typeof data === "string"){
        this.setState({errors: [data],
        Chart: (<div></div>), data: []});
      }else if(data){
        let Chart = (
          <ResponsiveContainer width="90%" height="80%">
            <AreaChart data={data} className="PreviewChart">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={`#${this.state.color}`} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={`#${this.state.color}`} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey={x} name={x} label={x}/>
              <YAxis dataKey={y} name={y} />
              <Area type="monotone" isAnimationActive={true} nameKey={this.state.xAxis} dataKey={this.state.yAxis} stroke={`#${this.state.color}`} fillOpacity={0.8} fill="url(#grad)" className="Chart" />
              <Tooltip/>
            </AreaChart>
          </ResponsiveContainer>
        );
        this.setState({data,Chart, type, errors: []});
      }else{
        this.setState({errors: ["Y Axis must be numerical values"],
        Chart: (<div></div>), data: []});
      }
    }
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
            <DataSelection headings={this.state.headings} changeXAxis={xAxis=>this.changeXAxis(xAxis)} changeYAxis={yAxis=>this.changeYAxis(yAxis)}/>
          </div>
          <div className="ChartButtons">
            <button onClick={this.createLineChart}>
              <i className="fa fa-line-chart" aria-hidden="true"></i>
            </button>
            <button onClick={this.createScatterChart}>
              <img src="https://png.icons8.com/scatter-plot/win10/48" title="Scatter Plot"/>
            </button>
            <button onClick={this.createBarChart}>
              <i className="fa fa-bar-chart" aria-hidden="true"></i>
            </button>
            <button onClick={this.createPieChart}>
              <i className="fa fa-pie-chart" aria-hidden="true"></i>
            </button>
            <button onClick={this.createAreaChart}>
              <i className="fa fa-area-chart" aria-hidden="true"></i>
            </button>
            <label className="SelectionsTitle">Sort by:</label>
            <select onChange={this.changeSortType} className="Dropdown-Option">
              <option default value="X Axis Asc" >X Axis Asc</option>
              <option value="X Axis Desc">X Axis Desc</option>
              <option value="Y Axis Asc">Y Axis Asc</option>
              <option value="Y Axis Desc">Y Axis Desc</option>
            </select>
            <label className="SelectionsTitle">Color:</label>
            <input onChange={this.changeColor} className="jscolor" value={this.state.color} />
          </div>

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

// display = (
//   <select onChange={this.changeDataTable} className="Dropdown">
//     <option selected disabled>Choose a DataTable</option>
//     {this.props.dataTables.map((dataTable,idx)=>
//     <option value={idx} key={idx} className="Dropdown-Option">
//       {dataTable.title}
//     </option>)}
//   </select>
// );
