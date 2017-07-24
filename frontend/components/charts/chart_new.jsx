import React from 'react';
import DataSelection from './chart_data_selections';
import {withRouter} from 'react-router';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, BarChart, Bar, Cell, AreaChart, Area} from 'recharts';

class ChartNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      xAxis: "",
      yAxis: "",
      type: "",
      data: [],
      headings: [],
      tableIdx: 0,
      Chart: (<div></div>)
    };
    this.dataTableSelection = this.dataTableSelection.bind(this);
    this.changeDataTable = this.changeDataTable.bind(this);
    this.parseData = this.parseData.bind(this);
    this.createLineChart = this.createLineChart.bind(this);
    this.createScatterChart = this.createScatterChart.bind(this);
    this.createBarChart = this.createBarChart.bind(this);
    this.createPieChart = this.createPieChart.bind(this);
    this.createAreaChart = this.createAreaChart.bind(this);
    this.submitChart = this.submitChart.bind(this);
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

  parseData(){
    let data = [];
    let currentTable = this.props.dataTables[this.state.tableIdx].table;
    for(let key in currentTable){
      let rowData = {};
      for(let selector in currentTable[key]){
        if(selector===this.state.xAxis){
          rowData[this.state.xAxis] = Number(currentTable[key][selector]);
        }
        if(selector===this.state.yAxis){
          rowData[this.state.yAxis] = Number(currentTable[key][selector]);
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
      let Chart = (
        <ResponsiveContainer width="100%" height="80%" >
          <LineChart data={data}
                className="PreviewChart">
             <XAxis dataKey={x} name={x} label={x}/>
             <YAxis dataKey={y} name={y} />
             <Tooltip/>
             <Legend />
             <Line isAnimationActive={true} type="monotone" dataKey={this.state.yAxis} stroke="#253A5C" activeDot={{r: 8}}/>
          </LineChart>
        </ResponsiveContainer>
      );
       this.setState({data, Chart, type});
    }
  }

  createScatterChart(e){
    let type = "Scatter";
    if(this.state.xAxis && this.state.yAxis){
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let data = this.parseData();
      let Chart = (
        <ResponsiveContainer width="100%" height="80%" >

          <ScatterChart
                className="PreviewChart">
              <XAxis dataKey={x} name={x} label={x}/>
              <YAxis dataKey={y} name={y} />
              <Tooltip/>
              <Scatter type="monotone" data={data} className="Chart"/>
          </ScatterChart>
        </ResponsiveContainer>
      );
       this.setState({data, Chart, type});
    }
  }

  createBarChart(e){
    if(this.state.xAxis && this.state.yAxis){
      let type = "Bar";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let Chart = (
        <ResponsiveContainer width="100%" height="80%">
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
       this.setState({data, Chart, type});
    }
  }

  createPieChart(){
    if(this.state.xAxis && this.state.yAxis){
      let type= "Pie";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let Chart = (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart className="PreviewChart">
            <Pie isAnimationActive={true} nameKey={x} dataKey={y} data={data} className="PieChart">{
                data.map((entry, index) => <Cell className={`PieCell${index%2}`}/>)
              }</Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      );
      this.setState({data,Chart, type});
    }
  }

  createAreaChart(e){
    if(this.state.xAxis && this.state.yAxis){
      let type= "Area";
      let data = this.parseData();
      let x = this.state.xAxis;
      let y = this.state.yAxis;
      let Chart = (
        <ResponsiveContainer width="100%" height="80%">
          <AreaChart data={data} className="PreviewChart">
            <XAxis dataKey={x} name={x} label={x}/>
            <YAxis dataKey={y} name={y} />
            <Area isAnimationActive={true} nameKey={this.state.xAxis} dataKey={this.state.yAxis} stroke="#253A5C" fillOpacity={0.8} className="Chart" />
            <Tooltip/>
          </AreaChart>
        </ResponsiveContainer>
      );
      this.setState({data,Chart, type});
    }
  }


  submitChart(e){

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
          <div className="Title-Submit">
            <input onChange={this.changeTitle} placeholder="Title" className="ChartTitle"></input>
            <button onClick={this.submitChart} className="ChartSubmit">Save Chart</button>
          </div>
          {this.state.Chart}
        </div>
      </div>
    );
  }
}

export default withRouter(ChartNew);
