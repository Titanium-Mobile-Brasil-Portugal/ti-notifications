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

var win1 = Titanium.UI.createWindow({  
    title:'ALERT',
    backgroundColor:'#fff',
    barColor: '#000'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});

var button1 = Ti.UI.createButton({
	title:'show alert'
});
button1.addEventListener('click', function(){
	// a single line of code:
	notification.show(notification.type.ALERT, 'Something went wrong :-(');
});
win1.add(button1);

var win2 = Titanium.UI.createWindow({  
    title:'CONFIRM',
    backgroundColor:'#fff',
    barColor: '#000'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Tab 2',
    window:win2
});

var button2 = Ti.UI.createButton({
	title:'show confirm'
});
button2.addEventListener('click', function(){
	// a single line of code:
	notification.show(notification.type.CONFIRM, 'Some better news here :-)');
});
win2.add(button2);

var win3 = Titanium.UI.createWindow({  
    title:'INFO',
    backgroundColor:'#fff',
    barColor: '#000'
});
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 3',
    window:win3
});

var button3 = Ti.UI.createButton({
	title:'show info'
});
button3.addEventListener('click', function(){
	// a single line of code:
	notification.show(notification.type.INFO, 'Some info');
});
win3.add(button3);


tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);  

tabGroup.open();
