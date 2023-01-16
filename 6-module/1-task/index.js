export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.rows = rows;
    this.createTable();
    this.deleteTD();
  }

  createTable() {
    const table = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      ${this.rows.map(({name, age, salary, city}) => ` 
        <tr>
          <td>${name}</td>
          <td>${age}</td>
          <td>${salary}</td>
          <td>${city}</td>
          <td><button>X</button></td>
        </tr>
      `).join('')}
      </tbody>`;
   
    this.elem.innerHTML = table;
  }

  deleteTD() {
    this.elem.addEventListener('click', event => {
      event.target.closest('tr').remove();
    });
  }

}