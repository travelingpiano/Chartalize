//drag and drop implementation of creating new chart, also current implementation on site
import React from 'react';
import DataSelection from './chart_data_selections';
import {withRouter} from 'react-router';
import {values} from 'lodash';
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
      dataTableName: "Choose a Data Table"
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
  }

  close(e){
    console.log('hiii');
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
    console.log(values(dropdownTarget));
    const baseTarget = document.getElementById('1');
    console.log(dropdownTarget2);
    console.log(e.target);
    console.log(values(dropdownTarget).length);
    console.log(values(dropdownTarget).includes(e.target));
    console.log(dropdownTarget2===e.target);
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

  parseData(){
    let data = [];
    let currentTable = this.state.table;
    for(let key in currentTable){
      let rowData = {};
      for(let selector in currentTable[key]){
        if(selector===this.state.xAxis){
          rowData[this.state.xAxis] = currentTable[key][selector];
          if(!currentTable[key][selector]){
            return "Missing X Data Values";
          }
        }
        if(selector===this.state.yAxis){
          rowData[this.state.yAxis] = Number(currentTable[key][selector]);
          if(isNaN(rowData[this.state.yAxis])){
            return undefined;
          }else if(!currentTable[key][selector]){
            return "Missing Y Data Values";
          }
        }
      }
      data.push(rowData);
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
               <Line isAnimationActive={true} type="monotone" dataKey={y} stroke="#253A5C" activeDot={{r: 8}}/>
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
                <Scatter type="monotone" data={data} className="Chart"/>
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
               <Bar type="monotone" dataKey={y} className="Chart"/>
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
                <linearGradient>
                  <stop offset="5%" stopColor="#253A5C" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#253A5C" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey={x} name={x} label={x}/>
              <YAxis dataKey={y} name={y} />
              <Area isAnimationActive={true} nameKey={this.state.xAxis} dataKey={this.state.yAxis} stroke="#253A5C" fillOpacity={0.8} className="Chart" />
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
