function highlight(table) {
  const tagTR = table.querySelectorAll('tbody > tr');
  tagTR.forEach(item => {
    if (item.cells[3].dataset.available == 'true') {
      return item.classList.add('available');
    }
    item.classList.add('unavailable');
  });
  tagTR.forEach(item => {
    if (!item.cells[3].dataset.available) {
      item.hidden = true;
    }
  });
  tagTR.forEach(item => {
    if (item.cells[2].innerHTML === 'm') {
      return item.classList.add('male');
    }
    item.classList.add('female');
  });
  tagTR.forEach(item => {
    if (item.cells[1].innerHTML < 18) {
      item.style.textDecoration = 'line-through';
    }
  });
}
