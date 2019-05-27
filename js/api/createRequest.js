/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const f = function () {},
    {
      method = 'GET',
      headers = {},
      success = f,
      error = f,
      callback = f,
      responseType,
      async = true,
      data = {}
    } = options,
    xhr = new XMLHttpRequest;

  let { url } = options;

  let requestData;
  if (responseType) {
    xhr.responseType = responseType;
  }
  xhr.onload = function() {
    success.call( this, xhr.response );
    callback.call( this, null, xhr.response );
  };
  xhr.onerror = function() {
     // дописать
  };

  xhr.withCredentials = true;

  if ( method === 'GET' ) {
    // дописать
  }
  else {
    requestData = Object.entries( data )
      .reduce(( target, [ key, value ]) => {
        target.append( key, value );
        return target;
      }, new FormData );
  }
  try {
    xhr.open( method, url, async );
    xhr.send( requestData );
  }
  catch ( err ) {
     // дописать
  }

  return xhr;
};
  
