function getMinMax(str) {
  const arr = str.split(' ');
  const filtered = arr.filter(item => Number(item));
  const min = Math.min(...filtered);
  const max = Math.max(...filtered);
  return { min: min, max: max };
}
