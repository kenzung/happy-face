import React from 'react';
import Proptypes from 'prop-types';

function ImageRect({
  label,
  labelColor,
  borderColor,
  borderWidth,
  width,
  height,
  x,
  y,
}) {
  return (
    <>
      <div style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${x}px, ${y}px)`,
        borderWidth: `${borderWidth}px`,
        borderStyle: 'solid',
        borderColor,
      }}
      />
      {label && (
      <div style={{
        fontSize: '16px',
        color: labelColor,
        position: 'absolute',
        width: label.length * 16 < width ? `${width}px` : `${label.length * 16}px`,
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        transform: `translate(${x}px, ${y + height + borderWidth}px)`,
        borderStyle: 'solid',
        borderColor,
        borderLeftWidth: `${borderWidth}px`,
        borderBottomWidth: `${borderWidth}px`,
        borderRightWidth: `${borderWidth}px`,
        background: 'white',
      }}
      >
        {label}
      </div>
      )}
    </>
  );
}

ImageRect.propTypes = {
  label: Proptypes.string,
  labelColor: Proptypes.string,
  borderColor: Proptypes.string,
  borderWidth: Proptypes.number,
  width: Proptypes.number,
  height: Proptypes.number,
  x: Proptypes.number,
  y: Proptypes.number,
};

ImageRect.defaultProps = {
  label: null,
  labelColor: 'black',
  borderColor: '#61CBFF',
  borderWidth: 5,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export default ImageRect;
