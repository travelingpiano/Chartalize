import React from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props){
    console.log(props);
    return {};
  }
};

function collect(connect,monitor){
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class Knight extends React.Component {
  componentDidMount(){
    // const img = new Image('20px','20px');
    // img.src = 'https://images-na.ssl-images-amazon.com/images/I/51NhtW9exnL._SX355_.jpg';
    // console.log(img);
    // img.onload = () => this.props.connectDragPreview(img);
  }
  render(){
    console.log(this.props);
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move'
        }}>
        ♘
      </div>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
