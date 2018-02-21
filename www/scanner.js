var argscheck = require('cordova/argscheck');
var utils = require('cordova/utils');
var exec = require('cordova/exec');

var scannerValues = {
  isOpen: false,
  vibrateEnabled: false,
  beepEnabled: false
};
var listeners = {};

// Scanner class
var Scanner = function() {};

Scanner.open = function() {
  exec(null, null, 'Scanner', 'open', []);
  return this;
};

Scanner.close = function() {
  exec(null, null, 'Scanner', 'close', []);
  return this;
};

Scanner.setVibrateEnabled = function(enabled) {
  exec(null, null, 'Scanner', 'vibrateEnabled', [enabled]);
  return this;
};

Scanner.setBeepEnabled = function(enabled) {
  exec(null, null, 'Scanner', 'beepEnabled', [enabled]);
  return this;
};

Object.defineProperties(Scanner, {
  isOpen: {
    enumerable: true,
    get() {
      return scannerValues.isOpen;
    }
  },
  vibrateEnabled: {
    enumerable: true,
    get() {
      return scannerValues.vibrateEnabled;
    }
  },
  beepEnabled: {
    enumerable: true,
    get() {
      return scannerValues.beepEnabled;
    }
  }
});

// window event to update the plugin values
window.addEventListener('scannerPluginResume', function (event) {
  scannerValues.isOpen = (event.detail & 4) === 4;
  scannerValues.vibrateEnabled = (event.detail & 2) === 2;
  scannerValues.beepEnabled = (event.detail & 1) === 1;
})

window.addEventListener('scannerOpen', function() {
  scannerValues.isOpen = true;
});

window.addEventListener('scannerClose', function() {
  scannerValues.isOpen = false;
});

window.addEventListener('scannerVibrateChange', function(event) {
  scannerValues.vibrateEnabled = event.detail;
});

window.addEventListener('scannerBeepChange', function(event) {
  scannerValues.beepEnabled = event.detail;
});

// initialize plugin
document.addEventListener('deviceready', function() {
  exec(
    function(args) {
      window.dispatchEvent(new CustomEvent(args[0], {
        detail: args[1]
      }));
    },
    null,
    'Scanner',
    'init',
    []
  );
});

module.exports = Scanner;