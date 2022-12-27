function showSalary(users, age) {
  const result = users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`);
  return result.join('\n');
}
