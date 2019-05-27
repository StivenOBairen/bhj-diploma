/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    this.element = element;
    this.renderAccountsList();
  }

  update() {

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const list = Account.list({}, (err, res) => {
      console.log(res);
      if(res) {
        document.querySelector('.expense-accounts-list').innerHTML += `
          <option value="${res.id}">${res.name}</option>
        `;
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options, (err, res) => {
      console.log(err + res);
    })
  }
}
