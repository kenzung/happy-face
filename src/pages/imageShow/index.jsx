import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import ImageRect from './components/ImageRect';
import * as api from '../../api';
import FunPicSelector from './components/FunPicSelector';
import './index.css';
import test from '../../assets/sylm2.png';

async function analyze(img) {
  await api.loadModels();
  const desc = await api.getFullFaceDescription(img);
  return desc;
}

class ImageShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: test,
      boxInfos: [],
    };
  }

  async componentDidMount() {
    this.handleGetBoxes();
  }

  async imageFileChange(evt) {
    await this.setState({
      imgUrl: URL.createObjectURL(evt.target.files[0]),
      boxInfos: [],
    });
    this.handleGetBoxes();
  }

  async handleGetBoxes() {
    const { imgUrl } = this.state;
    const boxInfos = await analyze(imgUrl);
    this.setState({ boxInfos });
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
    const { boxInfos, imgUrl } = this.state;
    return (
      <div className="image-show">
        <input type="file" accept="image/png, image/jpeg" onChange={this.imageFileChange.bind(this)} />
        <Button className="image-show__upload-btn">点击上传图片</Button>
        <div style={{ position: 'relative' }}>
          {boxInfos.length > 0 && this.renderBox()}
          <img src={imgUrl} alt="" style={{ width: '100%' }} />
        </div>
        <FunPicSelector />
      </div>
    );
  }
}

export default ImageShow;
