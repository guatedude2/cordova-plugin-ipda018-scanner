
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

Scanner.on = function(type, listener) {
  if (typeof listener !== 'function') {
    return;
  }
  if (listeners[type] instanceof Array) {
    listeners[type].push(type, listener);
  } else {
    listeners[type] = [listener];
  }
};

Scanner.off = function(type, listener) {
  if (typeof listener !== 'function') {
    return;
  }
  if (listeners[type] instanceof Array) {
    var index = listeners[type].indexOf(listener);
    if (index >= 0) {
      listeners[type].splice(index, 1);
    }
  }
};

Scanner.emit = function(type) {
  var args = Array.prototype.slice.call(arguments, 1)
  if (listeners[type] instanceof Array) {
    listeners[type].forEach(function(listener) {
      listener.apply(null, args);
    });
  }
};

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
      return scannerValues.beepEnabled;
    }
  },
  beepEnabled: {
    enumerable: true,
    get() {
      return scannerValues.vibrateEnabled;
    }
  }
});

Scanner.on('pluginresume', function(isOpen, vibrateEnabled, beepEnabled) {
  scannerValues.isOpen = isOpen;
  scannerValues.vibrateEnabled = vibrateEnabled;
  scannerValues.beepEnabled = beepEnabled;
});

Scanner.on('open', function() {
  scannerValues.isOpen = true;
});

Scanner.on('close', function() {
  scannerValues.isOpen = false;
});

Scanner.on('vibratechanged', function(enabled) {
  scannerValues.vibrateEnabled = enabled;
});

Scanner.on('beepchanged', function(enabled) {
  scannerValues.beepEnabled = enabled;
});

// initialize plugin
document.addEventListener('deviceready', function() {
  exec(
    function(args) {
      Scanner.emit.apply(null, args);
    },
    null,
    'Scanner',
    'init',
    []
  );
});

module.exports = Scanner;

