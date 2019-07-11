import React from 'react';
import PropTypes from 'prop-types';
// import FunPicItem from './FunPicItem';
import './FunPicSelector.css';

function renderFunPicItem(picImages) {
  return picImages.map((picImage, key) => (
    // <FunPicItem />
    <li
      style={{ width: '100px', height: '100px', border: '5px solid black' }}
      // eslint-disable-next-line
      key={key}
      className="funpic-selector-container__item"
    >
      {key}
    </li>
  ));
}

function FunPicSelector({
  picImages,
}) {
  return (
    <div className="funpic-selector">
      <ul className="funpic-selector-container">
        {picImages && picImages.length > 0 && renderFunPicItem(picImages)}
      </ul>
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
