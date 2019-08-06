import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import ImageRect from '../../components/ImageRect';
import * as api from '../../api';
// import FunPicSelector from './components/FunPicSelector';
import './index.css';
import test from '../../assets/test.jpg';

async function analyze(img) {
  const desc = await api.getFullFaceDescription(img);
  return desc;
}

class ImageShow extends Component {
  constructor(props) {
    super(props);
    this.imgUrl = test;
    this.state = {
      imgUrl: test,
      boxInfos: [],
    };
  }

  async componentDidMount() {
    await api.loadModels();
    this.handleGetBoxes();
  }

  imageFileChange(evt) {
    const fileName = evt.target.files[0];
    if (!fileName) {
      return;
    }
    const imgUrl = URL.createObjectURL(fileName);
    this.imgUrl = imgUrl;
    this.setState({
      imgUrl,
      boxInfos: [],
    });
    this.handleGetBoxes();
  }

  async handleGetBoxes() {
    const boxInfos = await analyze(this.imgUrl);
    const faceMatcher = api.createFatherMatcher();
    const newBoxInfos = boxInfos.map((fd) => {
      const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
      console.log(bestMatch.toString());
      return {
        ...fd,
        label: bestMatch.label,
      };
    });
    console.log(newBoxInfos);
    this.setState({ boxInfos: newBoxInfos });
  }

  renderBox() {
    const { boxInfos } = this.state;
    const { innerWidth } = window;
    return boxInfos.map((boxInfo, i) => {
      const {
        detection: {

          box: {
            width, height, x, y,
          },
          imageWidth,
        },
        label,
      } = boxInfo;
      const ratio = innerWidth / imageWidth;
      console.log('label', label);
      return (
        <ImageRect
          // eslint-disable-next-line
          key={i}
          width={width * ratio}
          height={height * ratio}
          x={x * ratio}
          y={y * ratio}
          label={label}
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
        {/* <FunPicSelector /> */}
      </div>
    );
  }
}

export default ImageShow;
