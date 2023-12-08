

//////////////////////////// COMMON FUNCTIONS  ///////////////////////////




// FUNCTION FOR SPINNER LOADING EFFECT  
function showLoadingSpinner() {
  const loadingSpinner = document.querySelector('.spinner-container');
  loadingSpinner.style.display = 'block';
  console.log("hii spinner has started:");
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
  const loadingSpinner = document.querySelector('.spinner-container');
  loadingSpinner.style.display = 'none';
  console.log("hii spinner has closed:");
}


//FUNCTION FOR CONVERTING THE FILE INTO IMG TYPE.
function createImageElementFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = reader.result;
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Function to resize the image
function resizeImage(image, targetWidth, targetHeight) {
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
  return canvas;
}

// FUNCTION FOR SHOWING THE RESULT OF CLASSIFICATION
function showClassificationResult(topPrediction) {
  const resultSection = document.getElementById('resultSection');
  resultSection.innerHTML = `<h1>Classification Result : ${topPrediction}</h1>`;
}

//////////////////// CHEST DETECTION  ////////////////////////


async function performChestDiseaseDetection() {

  const fileInput = document.getElementById("imageUpload");
  
    if (!fileInput.files[0]) {
      alert("Please choose an image for classification.");
      return;
    }

  showLoadingSpinner();
  
  try{

  
  const MODEL_JSON_URL = '/models/chest-model/model.json'; 
  const TARGET_WIDTH = 32;
  const TARGET_HEIGHT = 32; 

  // Load the model
  const model = await tf.loadLayersModel(MODEL_JSON_URL);

  // Get the selected file from the file input
  const selectedFile = fileInput.files[0];

  // Create an HTMLImageElement from the selected file
  const imageElement = await createImageElementFromFile(selectedFile);

  // Resize the image using the canvas
  const resizedCanvas = resizeImage(imageElement, TARGET_WIDTH, TARGET_HEIGHT);

  // Convert the resized canvas to a tensor
  const tensor = tf.browser.fromPixels(resizedCanvas).toFloat();
  const expandedTensor = tensor.expandDims();

  // Perform prediction
  const predictions = await model.predict(expandedTensor).data();

  // Process the predictions to get the top class label
  const chestPrediction = chestGetTopPrediction(predictions);
  
  showClassificationResult(chestPrediction);
  }catch (error) {
    console.error(error);
  } finally {
    hideLoadingSpinner();
  }
  
}



  // Helper function to get the top prediction
  function chestGetTopPrediction(predictions) {
    const classLabels = ['Covid', 'Pneumonia', 'Turberculosis', 'Normal'];
  
    // Find the index of the class with the highest probability (top prediction)
    const topClassIndex = predictions.indexOf(Math.max(...predictions));
    
    // Get the corresponding class label for the top prediction
    const topClassName = classLabels[topClassIndex];
  
    return topClassName;
  }
  
  
   
  
  ////////////////  BRAIN DETECTION  //////////////////////


  async function performBrainTumourDetection() {
    const fileInput = document.getElementById("imageUpload");


    if (!fileInput.files[0]) {
      alert("Please choose an image for classification.");
      return;
    }

  showLoadingSpinner();
  
  try{
    const MODEL_JSON_URL = '/models/brain-model/model.json'; // Replace with the correct path to the model.json file
    const TARGET_WIDTH = 200; // Set the desired width for resizing
    const TARGET_HEIGHT = 200; // Set the desired height for resizing
  
    // Load the model
    const model = await tf.loadLayersModel(MODEL_JSON_URL);
  
    // Get the selected file from the file input
    const selectedFile = fileInput.files[0];
  
    // Create an HTMLImageElement from the selected file
    const imageElement = await createImageElementFromFile(selectedFile);
  
    // Resize the image using the canvas
    const resizedCanvas = resizeImage(imageElement, TARGET_WIDTH, TARGET_HEIGHT);
  
    // Convert the resized canvas to a tensor
    const tensor = tf.browser.fromPixels(resizedCanvas).toFloat();
    const expandedTensor = tensor.expandDims();
  
    // Perform prediction
    const predictions = await model.predict(expandedTensor).data();
  
    // Process the predictions to get the top class label
    const brainPrediction = brainGetTopPrediction(predictions);
    
    showClassificationResult(brainPrediction);
  }catch (error) {
    console.error(error);
  } finally {
    hideLoadingSpinner();
  }
}
  
  
  
    // Helper function to get the top prediction
    function brainGetTopPrediction(predictions) {
      const classLabels = ['Tumor Detected','Tumor not detected'];
    
      // Find the index of the class with the highest probability (top prediction)
      const topClassIndex = predictions.indexOf(Math.max(...predictions));
      
      // Get the corresponding class label for the top prediction
      const topClassName = classLabels[topClassIndex];
    
      return topClassName;
    }
  


///////////////////////// KIDNEY DETECTION  /////////////////////////


async function performKidneyDiseaseDetection() {
  const fileInput = document.getElementById("imageUpload");

  if (!fileInput.files[0]) {
    alert("Please choose an image for classification.");
    return;
  }

showLoadingSpinner();

try{
  const MODEL_JSON_URL = '/models/kidney-model/model.json'; // Replace with the correct path to the model.json file
  const TARGET_WIDTH = 32; // Set the desired width for resizing
  const TARGET_HEIGHT = 32; // Set the desired height for resizing

  // Load the model
  const model = await tf.loadLayersModel(MODEL_JSON_URL);

  // Get the selected file from the file input
  const selectedFile = fileInput.files[0];

  // Create an HTMLImageElement from the selected file
  const imageElement = await createImageElementFromFile(selectedFile);

  // Resize the image using the canvas
  const resizedCanvas = resizeImage(imageElement, TARGET_WIDTH, TARGET_HEIGHT);

  // Convert the resized canvas to a tensor
  const tensor = tf.browser.fromPixels(resizedCanvas).toFloat();
  const expandedTensor = tensor.expandDims();

  // Perform prediction
  const predictions = await model.predict(expandedTensor).data();

  // Process the predictions to get the top class label
  const kidneyPrediction = kidneyGetTopPrediction(predictions);
  
  showClassificationResult(kidneyPrediction);
}catch (error) {
  console.error(error);
} finally {
  hideLoadingSpinner();
}
}



  // Helper function to get the top prediction
  function kidneyGetTopPrediction(predictions) {
    const classLabels = ["Disease: Cyst", "Normal", "Disease: Stone", "Disease Tumor"];
  
    // Find the index of the class with the highest probability (top prediction)
    const topClassIndex = predictions.indexOf(Math.max(...predictions));
    
    // Get the corresponding class label for the top prediction
    const topClassName = classLabels[topClassIndex];
  
    return topClassName;
  }



  ///////////////////////  SKIN DETECTION  ///////////////////////////////


  async function performSkinDiseaseDetection() {
    const fileInput = document.getElementById("imageUpload");

    if (!fileInput.files[0]) {
      alert("Please choose an image for classification.");
      return;
    }

  showLoadingSpinner();
  
  try{
    const MODEL_JSON_URL = '/models/skin-model/model.json'; // Replace with the correct path to the model.json file
    const TARGET_WIDTH = 200; // Set the desired width for resizing
    const TARGET_HEIGHT = 200; // Set the desired height for resizing
  
    // Load the model
    const model = await tf.loadLayersModel(MODEL_JSON_URL);
  
    // Get the selected file from the file input
    const selectedFile = fileInput.files[0];
  
    // Create an HTMLImageElement from the selected file
    const imageElement = await createImageElementFromFile(selectedFile);
  
    // Resize the image using the canvas
    const resizedCanvas = resizeImage(imageElement, TARGET_WIDTH, TARGET_HEIGHT);
  
    // Convert the resized canvas to a tensor
    const tensor = tf.browser.fromPixels(resizedCanvas).toFloat();
    const expandedTensor = tensor.expandDims();
  
    // Perform prediction
    const predictions = await model.predict(expandedTensor).data();
  
    // Process the predictions to get the top class label
    const skinPrediction = skinGetTopPrediction(predictions);
    
    showClassificationResult(skinPrediction);
  }catch (error) {
    console.error(error);
  } finally {
    hideLoadingSpinner();
  }
}
  
  
  
    // Helper function to get the top prediction
    function skinGetTopPrediction(predictions) {
      const classLabels = ['Acne', 'Eczema', 'Psoriasis'];
    
      // Find the index of the class with the highest probability (top prediction)
      const topClassIndex = predictions.indexOf(Math.max(...predictions));
      
      // Get the corresponding class label for the top prediction
      const topClassName = classLabels[topClassIndex];
    
      return topClassName;
    }
     