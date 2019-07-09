import * as faceapi from 'face-api.js';

// Load models and weights
export async function loadModels() {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;
  await Promise.all([
    faceapi.loadSsdMobilenetv1Model(MODEL_URL),
    faceapi.loadAgeGenderModel(MODEL_URL),
    faceapi.loadFaceExpressionModel(MODEL_URL),
    faceapi.loadFaceLandmarkModel(MODEL_URL),
    faceapi.loadFaceRecognitionModel(MODEL_URL),
  ]);
}


export async function getFullFaceDescription(blob) {
  // tiny_face_detector options
  const scoreThreshold = 0.5;
  const OPTION = new faceapi.SsdMobilenetv1Options({
    minConfidence: scoreThreshold,
  });
  // const useTinyModel = true;

  // fetch image to api
  const img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  const fullDesc = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks()
    .withAgeAndGender()
    .withFaceDescriptors()
    .withFaceExpressions();
  return fullDesc;
}
