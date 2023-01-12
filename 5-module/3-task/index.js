function initCarousel() {
  let offset = 0;
  let offsetWidth = document.querySelector('.carousel__img').offsetWidth;
  const leftArrow = document.querySelector('.carousel__arrow_left img');
  const rightArrow = document.querySelector('.carousel__arrow_right img');
  const arrows = document.querySelector('.carousel');
  const slide = document.querySelector('.carousel__inner');
  leftArrow.style.display = 'none';

  arrows.addEventListener('click', (event) => {
    
    if (event.target === rightArrow) {
      offset -= offsetWidth;
      slide.style.transform = `translateX(${offset}px)`;

      if (offset <= (-offsetWidth * 3)) {
        event.target.style.display = 'none';
      } else {
        leftArrow.style.display = '';
      }
    }

    if (event.target === leftArrow) {
      offset += offsetWidth;
      slide.style.transform = `translateX(${offset}px)`;
    
      if (offset >= 0) {
        event.target.style.display = 'none';
      } else {
        rightArrow.style.display = '';
      }
    } 
  });
}
