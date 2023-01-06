function makeDiagonalRed(table) {
  const arr = table.querySelectorAll('tr');
  for (let i = 0; i < arr.length; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
