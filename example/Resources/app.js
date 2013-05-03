/**
 * app.js
 * 
 * Short demonstration of ti-notification usage
 *
 * @author: Manuel Lehner (manumaticx@gmail.com)
 * See https://github.com/manumaticx/ti-notifications for info
 */


var notification = require('lib/ti-notification');

Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

var win = Titanium.UI.createWindow({
	title: 'ti-notification',
    backgroundColor:'#fff',
    tabBarHidden: true,
    layout: 'vertical'
});

tabGroup.addTab(Titanium.UI.createTab({ window:win }));

var types = [notification.type.ALERT, notification.type.CONFIRM, notification.type.INFO];

win.add(button('Alert', 'Something went wrong :-('));
win.add(button('Confirm', 'Something was good :-)', types[1]));
win.add(button('Info', 'Something just happened.', types[2]));

function button(title, message, type){
	var self = Ti.UI.createButton({
		title: title,
		top: 20
	});
	self.addEventListener('click', function(){
		notification.show(message, type);
	});
	return self;
};

tabGroup.open();
