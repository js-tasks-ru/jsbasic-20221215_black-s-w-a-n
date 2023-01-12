function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', () => {
    const Div = document.querySelector('#text');
    if (!Div.hidden) {
      return Div.hidden = true;
    }
    Div.hidden = false;
  });
}
