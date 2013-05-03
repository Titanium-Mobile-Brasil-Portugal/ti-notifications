/**
 * ti-notification
 * 
 * Copy this file into your resources and require it like this:
 * var notification = require('ti-notification');
 * 
 * To show a notification, you just call:
 * notification.show('Hello World!');
 * 
 * For more infomation, visit https://github.com/manumaticx/ti-notifications
 * 
 * @author Manuel Lehner (manumaticx@gmail.com)
 */

var os = Ti.Platform.osname;

// basic initalization values	
var Notification = {
	duration: 3000,
	navbar: true,
	showing: false,
	queue: [],
	orientation:  Titanium.UI.PORTRAIT
};

// color definitions
var colors = {
	red: '#d10d00',
	green: '#44b700',
	blue: '#005bd1',
	white: 'white',
	black: 'black',
	transparent: 'transparent'
};

// type definitions
// add custom properties here, e.g. icons
Notification.type = {
	ALERT: {
		color: colors.red
	},
	CONFIRM: {
		color: colors.green
	},
	INFO: {
		color: colors.blue
	}
};

/**
 * shows the notification
 * type and navbar is optional
 * you should use navbar only to show notifications on windows without Navigationbar
 * (unfortunatly the module doesn't know from what kind of window you call it)
 * 
 * @param {String} message
 * @param {Notification.type} type - optional (default: ALERT)
 * @param {Boolean} navbar - optional (default: true)
 */
var show = function(message, type, navbar){
	if (Notification.showing){
		Notification.queue.push({
			type: type,
			message: message,
			navbar: navbar
		});
		hide();
	}else{
		Notification.orientation = Ti.Gesture.getOrientation();
		Notification.showing = true;
		var _type = type || Notification.type.ALERT;
		Notification.navbar = navbar || true;
		init(function(){
			Notification.view.setTop((os === 'android') ? '-60dp' : -60);
			Notification.background.backgroundColor = _type.color;
			Notification.message.setText(message);
			Notification.win.open();
		});
		setTimeout(function(){
			hide();
		},Notification.duration);		
	}
};

/**
 * called to hide showing notification
 */
var hide = function(){
	Notification.view.animate(up);
	Notification.navbar = true;
};

/**
 * initialisation of the notification 
 * @param {Function} _callback
 */
var init = function(_callback){
	
	var _navbarHeight;
	switch (os){
		case 'iphone':
			_navbarHeight = (
				Notification.orientation === Titanium.UI.LANDSCAPE_LEFT || 
				Notification.orientation === Titanium.UI.LANDSCAPE_RIGHT
			) ? 31 : 43 ;
			break;
		case 'ipad':
			_navbarHeight = 43;
			break;
		case 'mobileweb':
			_navbarHeight = 50;
			break;
		case 'android':
			// this value should be the height of the ActionBar / TabBar
			_navbarHeight = 0;
			break;
		default:
			_navbarHeight = 0;
	};
	
	Notification.win = Titanium.UI.createWindow({
		top: Notification.navbar ? _navbarHeight : 0,
		width: Ti.UI.FILL,
		height: (os === 'android') ? '52dp' : 52
	});
	
	Notification.win.addEventListener('postlayout', function(){
		Notification.view.animate(down);
	});
	
	Notification.win.addEventListener('click', hide);
	
	Notification.view = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: (os === 'android') ? '52dp' : 52
	});
	
	Notification.win.add(Notification.view);
	
	Notification.background = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: (os === 'android') ? '60dp' : 60,
		top: (os === 'android') ? '-8dp' : -8,
		borderRadius: (os === 'android') ? '6dp' : 6,
		opacity: 0.7
	});
	
	Notification.view.add(Notification.background);
	
	Notification.shadow = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: (os === 'android') ? '10dp' : 10,
		top: 0,
		backgroundGradient: {
			type: 'linear',
	        colors: [ colors.black, colors.transparent],
		},
		opacity: 0.5,
		zIndex:1
	});
	Notification.view.add(Notification.shadow);
	
	Notification.message = Ti.UI.createLabel({
		color: colors.white,
		width: Ti.UI.FILL, 
		height: Ti.UI.FILL,
		left: (os === 'android') ? '12dp' : 12,
		right:(os === 'android') ? '12dp' : 12,
		top: (os === 'android') ? '14dp' : 14,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: (os === 'android') ? '18sp' : 18,
			fontWeight: 'bold'
		}
	});
	Notification.view.add(Notification.message);
	
	_callback();
};

// show animation
var down = Ti.UI.createAnimation({
    top: 0,
    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
    duration: 300
});

// hide animation
var up = Ti.UI.createAnimation({
    top: (os === 'android') ? '-60dp' : -60,
    curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
    duration: 300
});

// calles when notification is done
up.addEventListener('complete', function(){
	if (Notification.win != null) Notification.win.close();
	Notification.win = null;
	Notification.showing = false;
	// if there are other notifications in the queue, show the next 
	if (Notification.queue.length > 0){
		var _next = Notification.queue[0];
		exports.show(_next.type, _next.message, _next.navbar);
		Notification.queue.splice(0,1);
	}
});

// Interface
exports.type = Notification.type; 
exports.show = show;
exports.hide = hide;

