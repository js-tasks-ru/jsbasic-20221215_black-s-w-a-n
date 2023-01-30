export default function promiseClick(button) {
  return new Promise((resolve) => {
    function listener(e) {
      resolve(e);
      button.removeEventListener('click', listener);
    }
    button.addEventListener("click", listener);
  });
}
