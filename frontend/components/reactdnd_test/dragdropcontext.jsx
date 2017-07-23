import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Box from './drag_source';
import Bin from './drop_target';

class Container extends React.Component{
  constructor(props){
    super(props);
    this.headings = this.props.headings;
    this.onDrop = this.onDrop.bind(this);
    this.clear = this.clear.bind(this);
    this.updateitem = this.updateitem.bind(this);
    this.clearItem = this.clearItem.bind(this);
    let dropped = [];
    for(let i = 0; i <this.headings.length; i++){
      dropped.push(0);
    }
    this.state = {droppedY: 0, droppedX: 0, dropped, droppedXItem: "", droppedYItem: ""};
  }

  clearItem(e){
    this.clear(e.target.value);
  }

  clear(axisName,itemName){
    let dropped = [];
    console.log(axisName);
    if(axisName==="xAxis"){
      for(let i = 0; i<this.state.dropped.length; i++){
        if(this.props.headings[i]===this.state.droppedXItem){
          dropped.push(0);
        }else{
            dropped.push(this.state.dropped[i]);
        }
      }
      this.setState({droppedX: 0, dropped});
    }else{
      for(let i = 0; i<this.state.dropped.length; i++){
        if(this.props.headings[i]===this.state.droppedYItem){
          dropped.push(0);
        }else{
            dropped.push(this.state.dropped[i]);
        }
      }
      this.setState({droppedY: 0, dropped});
    }

  }

  onDrop(item){

  }

  updateitem(idx,binName){
    let dropped = [];
    for(let i = 0; i<this.state.dropped.length; i++){
      if(i===idx){
        dropped.push(this.state.dropped[i]+1);
      }else{
        dropped.push(this.state.dropped[i]);
      }
    }
    console.log(binName);
    if(binName==="xAxis"){
      this.setState({droppedX: 1, dropped, droppedXItem: this.headings[idx] });
    }else{
      this.setState({droppedY: 1, dropped, droppedYItem: this.headings[idx] });
    }

  }

  render(){
    let displaybox = [];
    for(let i = 0; i <this.state.dropped.length; i++){
      if(this.state.dropped[i] >= 1){
        displaybox.push((<div><s>{this.headings[i]}</s></div>));
      }else{
        displaybox.push((<Box itemName={this.headings[i]} updateitem={(idx,binName)=>this.updateitem(idx,binName)} idx={i} dropped={this.state.dropped}/>));
      }
    }

    let displaybinX;
    if(this.state.droppedX>= 1){
      displaybinX = (<div>
        {this.state.droppedXItem}
        <button value="xAxis" onClick={this.clearItem}>Clear</button>
      </div>);
    }else{
      displaybinX = (<Bin binName="xAxis" onDrop={item=>this.onDrop(item)} droppedTime={this.state.droppedTime}
        clear={(axisName)=>this.clear(axisName)}/>);
    }

    let displaybinY;
    if(this.state.droppedY>= 1){
      displaybinY = (<div>
        {this.state.droppedYItem}
        <button value="yAxis" onClick={this.clearItem}>Clear</button>
      </div>);
    }else{
      displaybinY = (<Bin binName="yAxis" onDrop={item=>this.onDrop(item)} droppedTime={this.state.droppedTime}
        clear={(axisName)=>this.clear(axisName)}/>);
    }
    return (
      <div>
        {this.props.headings.map((heading,idx)=>
          <div key={idx} style={{backgroundColor: 'black', color: 'white',
          width: '200px', height: '100px'}}>
            {displaybox[idx]}
          </div>
        )}

        <div style={{width: '100px', height: '100px', margin: '20px', backgroundColor: 'blue'}}>
          {displaybinX}
        </div>
        <div style={{width: '100px', height: '100px', margin: '20px', backgroundColor: 'blue'}}>
          {displaybinY}
        </div>

      </div>

    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
