function sumSalary(salaries) {
  let sum = 0;
  for (const key in salaries) {
    if ( (typeof salaries[key] === 'number') && salaries[key] && salaries[key] !== Infinity && salaries[key] !== -Infinity ) {
      sum += salaries[key];
    }
  }
  return sum;
}
