/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство HOST, равно значению Entity.HOST.
 * Имеет свойство URL, равное '/user'.
 * */

class User {

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(data) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      return null;
    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = f => f) {
    let testrequest = {
      url: "http://bhj-diploma.u-w.me/user/current",
      method: "GET",
    };
    let response = createRequest(testrequest, function(response){
      User.setCurrent(response);
      callback(response);
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f) {
    let testrequest = {
      url: "http://bhj-diploma.u-w.me/user/register",
      method: "POST",
      body: data
    };
    let response = createRequest(testrequest, function(response){
      User.setCurrent(response);
      callback(response);
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * "http://bhj-diploma.u-w.me/user/register"
   * */
  static register( data, callback = f => f ) {
    return createRequest({
      url: "http://bhj-diploma.u-w.me/user/register",
      method: 'POST',
      responseType: 'json',
      data,
      callback: ( err, response ) => {
        if ( response && response.user ) {
          this.setCurrent( response.user );
        }
        callback.call( this, err, response );
      }
    });
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f => f) {

  }
}
