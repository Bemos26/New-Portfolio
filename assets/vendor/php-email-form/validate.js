/**
* PHP Email Form Validation - v3.11
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let form = document.querySelector('#contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let loading = form.querySelector('.loading');
    let errorMessage = form.querySelector('.error-message');
    let sentMessage = form.querySelector('.sent-message');

    loading.classList.add('d-block');
    errorMessage.classList.remove('d-block');
    sentMessage.classList.remove('d-block');

    let formData = new FormData(form);

    fetch(form.getAttribute('action'), {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      loading.classList.remove('d-block');
      if (response.ok) {
        sentMessage.classList.add('d-block');
        form.reset();
      } else {
        return response.json().then(data => {
          throw new Error(data.message || 'Form submission failed');
        });
      }
    })
    .catch(error => {
      loading.classList.remove('d-block');
      errorMessage.innerHTML = error.message;
      errorMessage.classList.add('d-block');
    });
  });
})();
