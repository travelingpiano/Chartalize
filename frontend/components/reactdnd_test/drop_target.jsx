import React from 'react';
import {DropTarget} from 'react-dnd';

const binTarget = {
  drop(props,monitor){
    return {binName: props.binName};
  }
};

function collect(connect,monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class Bin extends React.Component{
  constructor(props){
    super(props);
    this.clearBin = this.clearBin.bind(this);
  }

  clearBin(e){
    e.preventDefault();
    console.log(e.target.value);
    this.props.clear(e.target.value);
  }

  render(){
    const {connectDropTarget,droppedTime, droppedItem, binName} = this.props;
    return connectDropTarget(
      <div style={{width: 'inherit', height: 'inherit'}}>
        {binName}
        {droppedItem}
      </div>
    );
  }
}

export default DropTarget("BOX", binTarget,collect)(Bin);
