# cordova-plugin-ipda018-scanner

> This plugin provides the `Scanner` object which has some functions to customize and control the Scanner on [IPDA018](http://www.issyzonepos.com/IPDA018-Android-5-1-PDA-Bluetooth-4-1-Support-GPRS-Wifi_p326.html) or
[PDF417](http://a.co/6QnS4N9)
 devices.

**This plugin only works on Android**


This plugin has only been tested in Cordova 3.2 or greater, and its use in previous Cordova versions is not recommended (potential conflict with keyboard customization code present in the core in previous Cordova versions).

- [Installation](#installation)
- [Basic Usage](#basicUsage)
- [Methods](#methods)
    - [Scanner.open](#scannerOpen)
    - [Scanner.close](#scannerClose)
    - [Scanner.setVibrateEnabled](#scannerSetVibrateEnabled)
    - [Scanner.setBeepEnabled](#scannerSetBeepEnabled)
    - [Scanner.on](#scannerOn)
    - [Scanner.off](#scannerOff)
- [Properties](#properties)
    - [Scanner.isOpen](#scannerIsOpen)
    - [Scanner.vibrateEnabled](#scannerVibrateEnabled)
    - [Scanner.beepEnabled](#scannerBeepEnabled)
- [Events](#events)
    - [open](#open)
    - [close](#close)
    - [scan](#scan)
    - [vibratechange](#vibratechange)
    - [beepchange](#beepchange)
- [Releases](#releases)

# Installation

From [npm](https://www.npmjs.com/package/cordova-plugin-keyboard) (stable)

`cordova plugin add cordova-plugin-ipda018-scanner`

From github latest (may not be stable)

`cordova plugin add https://github.com/guatedude2/cordova-plugin-ipda018-scanner`


# Basic Usage

```javascript

document.addEventListener('deviceready', function() {
	// Open the device
	Scanner.open();

	// Add scan event
	Scanner.on('scan', function (barcode) {
		console.log('BARCODE', barcode);
	});
});

```

# Methods

## Scanner.open

Opens the scanner reciever

    Scanner.open();

## scanner.close

Closes the scanner reciever

    Scanner.close();

## Scanner.setVibrateEnabled

Enables or disables vibration when scanning succeeds

    Scanner.setVibrateEnabled(boolean);

## Scanner.setBeepEnabled

Enables or disables the beep sound when scanning succeeds

    Scanner.setBeepEnabled(boolean)

## Scanner.on

Attaches an event listener. See [events](#events)

    Scanner.on(string, function);

## Scanner.off

Remvoes an event listener. See [events](#events)

    Scanner.off(string, function);


# Properties

## Scanner.isOpen

Returns whether the scanner is open or not.

    [Read Only] Scanner.isOpen (boolean)

## Scanner.vibrateEnabled

Returns whether the scanner vibrate-on-scan is enabled or not.

     [Read Only] Scanner.vibrateEnabled (boolean)

## Scanner.beepEnabled

Returns whether the scanner beep-on-scan is enabled or not.

     [Read Only] Scanner.beepEnabled (boolean)

# Events

## open

This event is fired when the device is opened

    Scanner.on('open', function () {
        // Describe your logic which will be run each time scanner is open
    });

## close

This event is fired when the device is closed

    Scanner.on('close', function () {
        // Describe your logic which will be run each time scanner is close
    });

## scan

This event is fired when the device scans succesfully

    Scanner.on('scan', function (string) {
        // Describe your logic which will be run each time scanner scans successfully
    });

## vibratechange

This event is fired when the scanner vibrate settings is enabled or disabled

    Scanner.on('vibratechange', function (boolean) {
        // Describe your logic which will be run each time the vibrate setting is changed
    });

## beepchange

This event is fired when the scanner beep settings is enabled or disabled

    Scanner.on('beepchange', function (boolean) {
        // Describe your logic which will be run each time the beep setting is changed
    });


# Releases

- 1.0.0
    - Initial NPM release