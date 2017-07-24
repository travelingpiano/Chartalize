import React from 'react';
import {DropTarget} from 'react-dnd';

const axisSource = {
  drop(props){
    return {axisName: props.axisName};
  }
};

function collect(connect,monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Axis extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {connectDropTarget, axisName} = this.props;
    let name;
    if(axisName==="xAxis"){
      name = "X Axis";
    }else{
      name = "Y Axis";
    }
    return connectDropTarget(
      <div style={{width: '100%', height: '100%'}}>
        {name}
      </div>
    );
  }
}

export default DropTarget("HEADING",axisSource,collect)(Axis);
