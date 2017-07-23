import React from 'react';
import {DragSource} from 'react-dnd';

const boxSource = {
  beginDrag(props){
    console.log('begin drag');
    return {};
  },

  endDrag(props,monitor){
    if(monitor.getDropResult()){
      console.log(monitor.getDropResult().binName);
      let binName = monitor.getDropResult().binName;
      props.updateitem(props.idx,binName);
    }
    return {};
  }
};

function collect(connect,monitor){
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Box extends React.Component{
  render(){
    const {connectDragSource, isDragging, dropped, itemName} = this.props;
    const opacity = isDragging ? 0.5 : 1;
    return connectDragSource(
      <div style={{opacity,
      width: 'inherit', height: 'inherit'}}>
        {itemName}

      </div>
    );
  }
}

export default DragSource("BOX", boxSource,collect)(Box);
