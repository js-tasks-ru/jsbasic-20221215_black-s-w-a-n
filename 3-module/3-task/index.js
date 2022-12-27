function camelize(str) {
  const arr = str.split('-');
  return arr.reduce((sum, item) => sum + item[0].toUpperCase() + item.slice(1, 50));
}
