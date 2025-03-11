// script.js
const images = [
    "-gazelle.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "images.jpeg",
    "lion-1.webp"
  ];
  
  let currentIndex = 0;
  const galleryImage = document.getElementById("galleryImage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  function updateImage() {
    galleryImage.src = images[currentIndex];
    galleryImage.alt = `Image ${currentIndex + 1}`;
  }
  
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });
  
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  });
  
  // Initialize the gallery with the first image
  updateImage();