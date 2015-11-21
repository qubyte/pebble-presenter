(function () {
  var form = document.getElementById('config-form');
  var addressInput = document.getElementById('host-input');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = {
        host: addressInput.value
    };

    window.location.href = 'pebblejs://close#' + encodeURIComponent(JSON.stringify(data));
  });
}());
