(function() {
  var form = document.getElementById('uncss-form');
  var formAction = form.getAttribute('action') || '/uncss';
  var formMethod = form.getAttribute('method') || 'POST';

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }

  function parseJSON(response) {
    return response.json()
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelector('.button-large').classList.add('button-loading');

    if(!form.type) {
      var hiddenInput = document.createElement('input');

      hiddenInput.name = 'type';
      hiddenInput.value = 'fetch';
      hiddenInput.type = 'hidden';

      form.appendChild(hiddenInput);
    }

    fetch(formAction, {
      method: formMethod,
      body: new FormData(form)
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(function(data) {
      document.querySelector('.button-large').classList.remove('button-loading');
      document.getElementById('outputCss').innerHTML = '';
      document.getElementById('outputCss').insertAdjacentHTML('afterbegin', data.outputCss);
    })
    .catch(function(error) {
      document.querySelector('.button-large').classList.remove('button-loading');
      console.log(error);
    });
  }, false);
})();
