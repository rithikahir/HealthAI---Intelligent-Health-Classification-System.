
// FUNCTION FOR SHOWING THE IMAGE FOR PREDICTION
const fileInput = document.getElementById("imageUpload");
fileInput.addEventListener('change', updateImagePreview);
  function updateImagePreview(event) {
    const imagePreview = document.getElementById('imagePreview');
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      imagePreview.style.display = 'block';
  
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    } else {
      imagePreview.style.display = 'none';
      imagePreview.src = '#';
    }
  }



  // For making slide show effect ///////


//   // Add this JavaScript code to your existing script
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   const slides = document.getElementsByClassName('mySlides');
//   const dots = document.getElementsByClassName('dot');
  
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = 'none';
//   }
  
//   slideIndex++;
  
//   if (slideIndex > slides.length) {
//     slideIndex = 1;
//   }
  
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(' active', '');
//   }
  
//   slides[slideIndex - 1].style.display = 'block';
//   dots[slideIndex - 1].className += ' active';
  
//   setTimeout(showSlides, 3000); // Change image every 3 seconds
// }


  