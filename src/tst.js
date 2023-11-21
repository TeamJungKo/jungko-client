let isHovered = false;
let animationFinished = false;

$(document).ready(function() {
  $('.cube').hover(
    function() {
      isHovered = true;
      if (animationFinished) {
        changeImagesToOriginal();
      }
    },
    function() {
      isHovered = false;
      if (animationFinished) {
        changeImageToNew();
      }
    }
  );

  $('.face6').on('animationend', function() {
    animationFinished = true;
    if (!isHovered) {
      changeImageToNew();
    }
  });
});

function changeImagesToOriginal() {
  $('.face1, .face2').attr('src', 'danggeun.png');
  $('.face3, .face4').attr('src', 'junggonara.png');
  $('.face5, .face6').attr('src', 'bungae.png');
}

function changeImageToNew() {
  $('.cube img').attr('src', 'jungkoIcon.png');
}

window.onload = function() {
  setTimeout(function() {
    var element = document.querySelector('.explanation li:nth-child(1)');
    element.classList.add('visible');
  }, 600);

  setTimeout(function() {
    var element = document.querySelector('.explanation li:nth-child(2)');
    element.classList.add('visible');
  }, 3000);
}

/* 여기부터 설명 배너 js */

var multipleCardCarousel = document.querySelector("#carouselExampleControls");

if (window.matchMedia("(min-width: 576px)").matches) {
  var carousel = new bootstrap.Carousel(multipleCardCarousel, {
    interval: false
  });
  var carouselWidth = $(".carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-item").width();
  var scrollPosition = 0;
  $("#carouselExampleControls .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 3) {
      scrollPosition += cardWidth;
      $("#carouselExampleControls .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
  $("#carouselExampleControls .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#carouselExampleControls .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else {
  $(multipleCardCarousel).addClass("slide");
}

var slider = document.querySelector('.carousel-inner');
var isDown = false;
var startX;
var scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  slider.style.cursor = 'grabbing';
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
  slider.style.cursor = 'grab';
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; //스크롤 속도
  slider.scrollLeft = scrollLeft - walk;
});
