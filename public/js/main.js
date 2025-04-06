
document.addEventListener("DOMContentLoaded", function () {
  let uniqueCurrentIndex = 0;

  function updateUniqueSlider() {
    const uniqueSlider = document.querySelector(".unique-slider");
    const uniqueDots = document.querySelectorAll(".unique-dot");

    if (uniqueSlider) {
      uniqueSlider.style.transform = `translateX(-${uniqueCurrentIndex * 100}%)`;
      uniqueDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === uniqueCurrentIndex);
      });
    }
  }

  // Expose goToUniqueSlide globally to make it accessible in HTML
  window.goToUniqueSlide = function (index) {
    uniqueCurrentIndex = index;
    updateUniqueSlider();
  };

  // Touch functionality
  const uniqueSliderElement = document.querySelector(".unique-slider");
  let uniqueStartX;

  if (uniqueSliderElement) {
    uniqueSliderElement.addEventListener("touchstart", (e) => {
      uniqueStartX = e.touches[0].clientX;
    });

    uniqueSliderElement.addEventListener("touchend", (e) => {
      const uniqueEndX = e.changedTouches[0].clientX;
      if (
        uniqueStartX - uniqueEndX > 50 &&
        uniqueCurrentIndex < document.querySelectorAll(".unique-dot").length - 1
      ) {
        window.goToUniqueSlide(uniqueCurrentIndex + 1); // Swipe left
      } else if (uniqueEndX - uniqueStartX > 50 && uniqueCurrentIndex > 0) {
        window.goToUniqueSlide(uniqueCurrentIndex - 1); // Swipe right
      }
    });
  }

  updateUniqueSlider(); // Initialize slider position and active dot
});

jQuery(document).on('ready', function () {
  jQuery("#our-creations").owlCarousel({
    items: -1,
    loop: true,
    nav: false,
    dots: true,
    margin: 20,
    autoplay: false,
    navText: [
      "<i class='fas fa-chevron-left'></i> ",
      "&nbsp | &nbsp<i class='fas fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  jQuery("#our-creations-home").owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    margin: 20,
    autoplay: false,
    navText: [
      "<i class='fas fa-chevron-left'></i> ",
      "&nbsp | &nbsp<i class='fas fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items:1,
      },
      1000: {
        items: 1,
      },
    },
  });
  jQuery("#discover-sider-main").owlCarousel({
    items: -1,
    loop: true,
    nav: false,
    dots: true,
    margin: 20,
    autoplay: false,
    navText: [
      "<i class='fas fa-chevron-left'></i> ",
      "&nbsp | &nbsp<i class='fas fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
});
