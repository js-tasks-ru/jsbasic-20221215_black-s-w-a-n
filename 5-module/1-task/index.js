function hideSelf() {
  const button = document.querySelector('.hide-self-button');
  button.addEventListener('click', (event) => {
    event.target.hidden = true;
  });
}
