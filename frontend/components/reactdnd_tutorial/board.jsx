import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import Knight from './Knight';

export default class Board extends React.Component {
  renderSquare(i){
    const x = i % 8;
    const y = Math.floor(i/8);
    const black = (x+y) % 2 === 1;
    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> : null;
    return (
      <div key={i} style={{width: '12.5%', height: '12.5%'}}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for(let i = 0; i< 64; i++){
      squares.push(this.renderSquare(i));
    }
    console.log(squares);
    return (
      <div style={{width: '500px',
      height: '500px', display: 'flex', flexWrap: 'wrap'}}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
