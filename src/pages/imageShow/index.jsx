import React, { Component } from 'react';
import { } from 'antd-mobile';
import ImageRect from './components/ImageRect';
import * as api from '../../api';
import FunPicSelector from './components/FunPicSelector';
import './index.css';
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
      imgUrl: test,
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
    const { innerWidth } = window;
    return boxInfos.map((boxInfo, i) => {
      const {
        box: {
          width, height, x, y,
        },
        imageWidth,
      } = boxInfo.detection;
      const ratio = innerWidth / imageWidth;
      return (
        <ImageRect
          // eslint-disable-next-line
          key={i}
          width={width * ratio}
          height={height * ratio}
          x={x * ratio}
          y={y * ratio}
        />
      );
    });
  }

  render() {
    const { loading, boxInfos, imgUrl } = this.state;
    console.log(loading);
    return (
      <div className="image-show">
        <div style={{ position: 'relative' }}>
          {boxInfos.length > 0 && this.renderBox()}
          <img src={imgUrl} alt="十元" style={{ width: '100%' }} />
        </div>
        <FunPicSelector />
      </div>
    );
  }
}

export default ImageShow;
