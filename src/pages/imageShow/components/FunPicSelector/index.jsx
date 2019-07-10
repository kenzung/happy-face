import React from 'react';
import PropTypes from 'prop-types';
import FunPicItem from './FunPicItem';
import './FunPicSelector.css';

function renderFunPicItem(picImages) {
  return picImages.map((picImage, key) => (
    // <FunPicItem />
    // eslint-disable-next-line
    <div style={{ width: '100px', height: '100px', border: '5px solid black' }} key={key} />
  ));
}

function FunPicSelector({
  picImages,
}) {
  return (
    <div className="funpic-selector-container">
      {picImages && picImages.length > 0 && renderFunPicItem(picImages)}
    </div>
  );
}

FunPicSelector.propTypes = {
  picImages: PropTypes.arrayOf(PropTypes.string),
};

FunPicSelector.defaultProps = {
  picImages: ['1', '1', '1', '1', '1', '1', '1', '1', '1'],
};

export default FunPicSelector;
