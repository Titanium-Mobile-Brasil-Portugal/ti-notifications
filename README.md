# Overview

An alternative to Alerts or AlertDialogs to show messages for user feedback in Titanium Mobile Applications (inspired by [Crouton](https://github.com/keyboardsurfer/Crouton) for Android).

This is for Titanium Classic but I will soon add an Alloy widget.

Works with:

* iOS
* Android
* Mobile web


## Usage
Put the ``ti-notification.js`` file into your resources.


	var notification = require('ti-notification');
	
	notification.show(notification.type.ALERT, 'An error occured.');
