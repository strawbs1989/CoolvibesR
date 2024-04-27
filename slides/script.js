// Get the slideshow container
var slideshow = document.querySelector('.slideshow-container');

// Array of image URLs
var images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

// Create slides dynamically
images.forEach(function(imageUrl) {
    var slide = document.createElement('div');
    slide.className = 'slide';
    var img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Slide Image';
    slide.appendChild(img);
    slideshow.appendChild(slide);
});

