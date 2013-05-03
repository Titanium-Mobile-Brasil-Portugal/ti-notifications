# Overview

An alternative to Alerts or AlertDialogs to show messages for user feedback in Titanium Mobile Applications (inspired by [Crouton](https://github.com/keyboardsurfer/Crouton) for Android).

Works with:

* iOS
* Android
* Mobile web


## Usage
Put the ``ti-notification.js`` file into your resources.


	var notification = require('ti-notification');
	
	notification.show('An error occured.');
	
	// using a type
	notification.show('Registration was successful!', notification.type.CONFIRM);
