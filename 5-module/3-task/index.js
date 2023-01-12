function initCarousel() {
  let offset = 0;
  let offsetWidth = document.querySelector('.carousel__img').offsetWidth;
  document.querySelector('.carousel__arrow_left img').style.display = 'none';
  const arrows = document.querySelector('.carousel');
  const slide = document.querySelector('.carousel__inner');

  arrows.addEventListener('click', (event) => {
    
    if (event.target.getAttribute('src') === "/assets/images/icons/angle-icon.svg") {
      offset -= offsetWidth;
      slide.style.transform = `translateX(${offset}px)`;

      if (offset <= (-offsetWidth * 3)) {
        event.target.style.display = 'none';
      } else {
        document.querySelector('.carousel__arrow_left img').style.display = '';
      }
    }

    if (event.target.getAttribute('src') === "/assets/images/icons/angle-left-icon.svg") {
      offset += offsetWidth;
      slide.style.transform = `translateX(${offset}px)`;
    
      if (offset >= 0) {
        event.target.style.display = 'none';
      } else {
        document.querySelector('.carousel__arrow_right img').style.display = '';
      }
    } 
  });
}
