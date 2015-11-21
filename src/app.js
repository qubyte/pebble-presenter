var UI = require('ui');
var Vibe = require('ui/vibe');
var ajax = require('ajax');
var host;

Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('http://pebble-config.herokuapp.com/config?title=Pebble%20Presenter%20Config&fields=host');
});

Pebble.addEventListener('webviewclosed', function(e) {
  host = JSON.parse(decodeURIComponent(e.response)).host;
});

function navigate(by) {
  if (!host) {
    return;
  }
  
  ajax(
    { url: host, method: 'post', type: 'json', data: { by: by } },
    function success() {
      Vibe.vibrate('short');
    },
    function failure() {
      Vibe.vibrate('long');
    }
  );
}

var main = new UI.Card({
  title: 'Simple Presenter',
  body: 'Press up for forward, down for backward.'
});

main.on('click', 'up', function forward() {
  navigate(1);
});

main.on('click', 'down', function backward() {
  navigate(-1);
});

main.show();
