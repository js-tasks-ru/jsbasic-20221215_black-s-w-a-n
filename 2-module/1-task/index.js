function sumSalary(salaries) {
  let sum = 0;
  for (const key in obj) {
    if ( (typeof obj[key] === 'number') && obj[key] && obj[key] !== Infinity && obj[key] !== -Infinity ) {
      sum += obj[key];
    }
  }
  return sum;
}
