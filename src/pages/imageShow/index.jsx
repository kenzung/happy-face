import React, { Component } from 'react';
import ImageRect from './components/ImageRect';
import * as api from '../../api';
import test from '../../assets/sylm2.png';

async function analyze() {
  await api.loadModels();
  const desc = await api.getFullFaceDescription(test);
  return desc;
}

class ImageShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      boxInfos: [],
    };
  }


  async componentDidMount() {
    this.setState({ loading: true });
    const boxInfos = await analyze();
    console.log(boxInfos);
    this.setState({ loading: false, boxInfos });
  }

  renderBox() {
    const { boxInfos } = this.state;
    return boxInfos.map((boxInfo, i) => {
      const {
        width, height, x, y,
      } = boxInfo.detection.box;
      return (
        <ImageRect
          // eslint-disable-next-line
          key={i}
          width={width}
          height={height}
          x={x}
          y={y}
        />
      );
    });
  }

  render() {
    const { loading, boxInfos } = this.state;
    console.log(loading);
    return (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute' }}>
          <img src={test} alt="十元" />
        </div>
        {boxInfos.length > 0 && this.renderBox()}
      </div>
    );
  }
}

export default ImageShow;
