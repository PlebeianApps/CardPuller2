/**
 * @author Vui Nguyen
 */
function SingleCardWindow(parentWindow, windowTitle, imageLoc, imageLocTransparent)
{
	var flipSound = Ti.Media.createSound({
				url: '/audio/CardFlip.mp3',
				preload: true
	});
	
	flipSound.play();
	
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(windowTitle, imageLoc);	
	var SingleCardList = require('ui/deck/SingleCardList');
	
	var image = Ti.UI.createImageView({
		image: '/images/KS_nav_views.png',
		height: '15%',
		bottom: '5%',
		left: '5%'
	});
	image.addEventListener('click', function(e) {
		// have window add another view on top of view
		parentWindow.containingTab.open(new SingleCardList(parentWindow, windowTitle, imageLocTransparent));
	});
	 
	// at this point, do we want these to be windows or views?
	// what controls do we want these to have at the bottom (both for Android and iOS)?
	
	// to keep things simple, continue this as another series of windows with a regular "back"
	// button and a button on the left for "more info"
	// Screens 6 & 7 will just have regular back buttons for now, the other buttons are just
	// extraneous at this point
	// if possible, add an icon on screen 7 (that's also compatible with Android) that will
	// turn on and off the sound when you click on it (toggle)
	
	//cardView.add(image);
	//window.add(cardView);
	window.add(image);
	return window;
};

module.exports = SingleCardWindow;
