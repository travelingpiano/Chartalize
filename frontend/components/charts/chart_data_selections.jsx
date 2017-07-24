import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
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
      this.setState({selectionStatus});
    }
  }

  changeSelection(selection,axisName){
    let selectionStatus = this.state.selectionStatus;
    let idx = this.headings.indexOf(selection);
    selectionStatus[idx] = 1;
    if(axisName==="yAxis"){
      this.props.changeYAxis(selection);
      this.setState({ySelection: selection, selectionStatus});
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
          <button value="Y" onClick={this.clear}>Clear Selection</button>
          <label className="AxisSelection">{this.state.ySelection}</label>
        </div>
      );
    }else{
      ydisplay = (<div className="Axis">
      <Axis axisName="yAxis" />
      </div>);
    }
    let xdisplay;
    if(this.state.xSelection){
      xdisplay= (
        <div className="Axis">
          <label>X Axis</label>
          <button value="X" onClick={this.clear}>Clear Selection</button>
          <label className="AxisSelection">{this.state.xSelection}</label>
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
            <div className="AxisSelection"><s>{this.headings[i]}</s></div>
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
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DataSelection);
