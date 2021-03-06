import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {default as TouchBackend} from 'react-dnd-touch-backend';
import Selections from './chart_selections';
import Axis from './chart_axis';

class DataSelection extends React.Component{
  constructor(props){
    super(props);
    this.headings = this.props.headings;
    let selectionStatus = [];
    if(!this.headings){
      this.headings = [];
    }else{
      for(let i = 0; i< this.headings.length; i++){
        selectionStatus.push(0);
      }
    }

    this.state = {
      ySelection: "",
      xSelection: "",
      y2Selection: "",
      selectionStatus
    };
    this.changeSelection = this.changeSelection.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentWillReceiveProps(newProps){
    if(this.headings != newProps.headings){
      this.headings = newProps.headings;
      let selectionStatus = [];
      for(let i = 0; i< this.headings.length; i++){
        selectionStatus.push(0);
      }
      this.setState({selectionStatus, xSelection: "", ySelection: ""});
    }
  }

  changeSelection(selection,axisName){
    let selectionStatus = this.state.selectionStatus;
    let idx = this.headings.indexOf(selection);
    selectionStatus[idx] = 1;
    if(axisName==="yAxis"){
      this.props.changeYAxis(selection);
      this.setState({ySelection: selection, selectionStatus});
    }else if(axisName==="y2Axis"){
      this.props.changeY2Axis(selection);
      this.setState({y2Selection: selection, selectionStatus});
    }else{
      this.props.changeXAxis(selection);
      this.setState({xSelection: selection, selectionStatus});
    }
  }

  clear(e){
    let selectionStatus = this.state.selectionStatus;
    if(e.target.value==="Y"){
      let idx = this.headings.indexOf(this.state.ySelection);
      selectionStatus[idx] = 0;
      this.props.changeYAxis("");
      this.setState({ySelection: ""});
    }else if(e.target.value === "Y2"){
      let idx = this.headings.indexOf(this.state.y2Selection);
      selectionStatus[idx] = 0;
      this.props.changeY2Axis("");
      this.setState({y2Selection: ""});
    }else{
      let idx = this.headings.indexOf(this.state.xSelection);
      selectionStatus[idx] = 0;
      this.props.changeXAxis("");
      this.setState({xSelection: ""});
    }
  }

  render(){
    let ydisplay;
    if(this.state.ySelection){
      ydisplay = (
        <div className="Axis">
          <label>Y Axis</label>
          <label className="AxisSelection">{this.state.ySelection}</label>
          <button value="Y" onClick={this.clear}>Clear </button>
        </div>
      );
    }else{
      ydisplay = (<div className="Axis">
      <Axis axisName="yAxis" />
      </div>);
    }

    let y2display;
    if(this.state.y2Selection){
      y2display = (
        <div className="Axis">
          <label>Y2 Axis</label>
          <label className="AxisSelection">{this.state.y2Selection}</label>
          <button value="Y2" onClick={this.clear}>Clear</button>
        </div>
      );
    }else{
      y2display = (<div className="Axis">
      <Axis axisName="y2Axis" />
      </div>);
    }
    let xdisplay;
    if(this.state.xSelection){
      xdisplay= (
        <div className="Axis">
          <label>X Axis</label>
          <label className="AxisSelection">{this.state.xSelection}</label>
          <button value="X" onClick={this.clear}>Clear </button>
        </div>
      );
    }else{
      xdisplay = (<div className="Axis">
      <Axis axisName="xAxis" />
      </div>);
    }
    let selectionsdisplay = {};
    if(this.headings.length === 0){
      selectionsdisplay = (<div></div>);
    }else{
      for(let i = 0; i<this.headings.length;i++){
        if(this.state.selectionStatus[i] === 0){
          selectionsdisplay[this.headings[i]] = (
            <Selections heading={this.headings[i]}
              changeSelection={(selection,axisName)=>this.changeSelection(selection,axisName)}/>
          );
        }else{
          selectionsdisplay[this.headings[i]] = (
            <div className="AxisSelected">{this.headings[i]}</div>
          );
        }
      }
    }

    return (
      <div className="Selections">
        <div className="AxisSelectionScroll">
          {this.headings.map((heading, idx)=>
            <div key={idx}>
              {selectionsdisplay[heading]}
            </div>)}
        </div>
        <div className="Axes">
          {xdisplay}
          {ydisplay}
          {y2display}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DataSelection);
