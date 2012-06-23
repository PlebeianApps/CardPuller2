/**
 * @author Vui Nguyen
 */
function SingleCardDetail(title, description, image) {
	var TabWindow = require('ui/TabWindow');
	var window = TabWindow(title, image, .5);
	
	/*
	var window = Ti.UI.createWindow({
			title: title,
			backgroundColor: 'white',
			//backgroundImage: image,
		});
		*/
		
	// Don't bother with opaque views for Android, it just doesn't work
	// You can only add opacity to the window, but then everything else added to it 
	// becomes opaque; My suggestion: Have an opaque and a non-opaque version of each graphic
	/*var opaqueView = Ti.UI.createImageView({
		//width: Ti.UI.FILL,
		//height: Ti.UI.FILL,
		image: image,
		opacity: '.5'
	});
	*/
	
	/*
	var opaqueView = Ti.UI.createView({
		backgroundImage: image,
		opacity: '.5',
	});
	*/
	
	var label = Ti.UI.createLabel({
		text: description,
        height:Ti.UI.FILL,
        width: '90%',
        color:'#900',
        font:{fontSize:24},
        textAlign:'center',
        opacity: 1.0
	});
	
	//opaqueView.add(label);
	//window.add(opaqueView);
	//window.add(opaqueView);
	window.add(label);
	return window;
};

module.exports = SingleCardDetail;
