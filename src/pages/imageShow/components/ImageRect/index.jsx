import React from 'react';
import Proptypes from 'prop-types';

function ImageRect({
  borderColor,
  borderWidth,
  width,
  height,
  x,
  y,
}) {
  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${x}px, ${y}px)`,
      borderWidth: `${borderWidth}px`,
      borderStyle: 'solid',
      borderColor,
    }}
    />
  );
}

ImageRect.propTypes = {
  borderColor: Proptypes.string,
  borderWidth: Proptypes.number,
  width: Proptypes.number,
  height: Proptypes.number,
  x: Proptypes.number,
  y: Proptypes.number,
};

ImageRect.defaultProps = {
  borderColor: '#61CBFF',
  borderWidth: 5,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export default ImageRect;
