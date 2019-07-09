import React, { Fragment, useEffect } from 'react';
import * as api from '../../api';
import test from '../../assets/sylm2.png';

async function analyze() {
  await api.loadModels();
  const desc = await api.getFullFaceDescription(test);
  console.log(desc);
}

function ImageShow() {
  useEffect(() => {
    analyze();
  });

  return (
    <Fragment>
      <img src={test} alt="十元" />
    </Fragment>
  );
}

export default ImageShow;
