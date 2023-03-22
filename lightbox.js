  //w3schools - how to tutorials
  // Open the Modal 
  function openModal() {
    document.getElementById("myModal").style.display = "block"
  }

  // Close the Modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none"
  }

  let slideIndex = 1;
  showSlides(slideIndex)
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n)
  }
  
  // Thumbnail image controls - needed in onclick HTML attribute
  function currentSlide(n) {
    showSlides(slideIndex = n)
  }
  
  function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides")
    let dots = document.getElementsByClassName("demo")

    if (n > slides.length) {
      slideIndex = 1
    }

    if (n < 1) {
      slideIndex = slides.length
    }

    //when we click on the arrow, the next image would appear under the main image and so on. This function prevents it
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"
    }

    //important for the thumbnail images formatting, see CSS
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "")
    }

    slides[slideIndex-1].style.display = "block" //displays the images in the modal
    dots[slideIndex-1].className += " active"
  } 


