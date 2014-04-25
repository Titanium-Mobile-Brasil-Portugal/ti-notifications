/**
 * ti-notification
 * 
 * CommonJS module for Titanium mobile apps
 * 
 * For more infomation, visit https://github.com/manumaticx/ti-notifications
 * 
 * @author Manuel Lehner (manumaticx@gmail.com)
 */

// configuration

var duration = 3000,
	navbar = true,
	current = undefined,
	queue = [],
	os = Ti.Platform.osname,
	orientation = Titanium.UI.PORTRAIT,
	colors = {
		red: '#d10d00',
		green: '#44b700',
		blue: '#005bd1',
		white: 'white',
		black: 'black',
		transparent: 'transparent'
	},
	type = {
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

// constructor
var Notification = function(args){
	this.type = args.type;
	this.message = args.message;
};

// method to show the notification
Notification.prototype.show = function(){
	
	var _navbarHeight;
	switch (os){
		case 'iphone':
			_navbarHeight = (
				this.orientation === Titanium.UI.LANDSCAPE_LEFT || 
				this.orientation === Titanium.UI.LANDSCAPE_RIGHT
			) ? 51 : 63 ;
			break;
		case 'ipad':
			_navbarHeight = 63;
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
	
	this.win = Titanium.UI.createWindow({
		top: navbar ? _navbarHeight : 0,
		width: Ti.UI.FILL,
		height: 52
	});
	
	this.win.addEventListener('postlayout', function onPostlayout(){
		// show animation
		var down = Ti.UI.createAnimation({
		    top: 0,
		    curve: Ti.UI.ANIMATION_CURVE_EASE_OUT,
		    duration: 300
		});
		this.view.animate(down);
		this.win.removeEventListener('postlayout', onPostlayout);
	});
	
	this.win.addEventListener('click', function onClick(){
		//clearTimeout(this.timeout);
		this.hide();
		this.win.removeEventListener('click', onClick);
	});
	
	this.view = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 52
	});
	
	this.win.add(this.view);
	
	// background
	this.view.add(Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 60,
		top: -8,
		backgroundClolor: this.type.color,
		borderRadius: 6,
		opacity: 0.7
	}));
	
	// top shadow
	this.view.add(Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 10,
		top: 0,
		backgroundGradient: {
			type: 'linear',
	        colors: [ colors.black, colors.transparent],
		},
		opacity: 0.5,
		zIndex:1
	}));
	
	// message label
	this.view.add(Ti.UI.createLabel({
		text: this.message,
		color: colors.white,
		width: Ti.UI.FILL, 
		height: Ti.UI.FILL,
		left: 12,
		right: 12,
		top: 14,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: 18,
			fontWeight: 'bold'
		}
	}));
	
	this.view.setTop(-60);
	this.win.open();
	this.timeout = setTimeout(this.hide, duration);	
};

// method to hide the notification
Notification.prototype.hide = function(){
	clearTimeout(this.timeout);
	// hide animation
	var up = Ti.UI.createAnimation({
	    top: -60,
	    curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
	    duration: 300
	});
	this.view.animate(up, function(){
		this.win.close();
		navbar = true;
		current = undefined;
		
		// if there are other notifications in the queue, show the next 
		if (n.queue.length > 0){
			var _next = queue[queue.length - 1];
			show(_next.type, _next.message, _next.navbar);
			queue.splice(queue.length - 1, 1);
		}
	});
};

/**
 * show a new message
 * @param {String} message
 * @param {Object} type
 * @param {Boolean} navbar
 */
function show(message, type, navbar){
	if ('undefined' !== typeof current){
		queue.push({
			type: type,
			message: message,
			navbar: navbar
		});
		current.hide();
	}else{
		orientation = Ti.Gesture.getOrientation();
		var _type = type || type.ALERT;
		navbar = navbar || true;
		current = new Notification({
			type: _type,
			message:  message
		});
		current.show();
	}
};


function hide(){
	current.hide();
};

// API
exports.type = type; 
exports.show = show;
exports.hide = hide;