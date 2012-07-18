function TabWindow(title, image, opacity, bgrepeat) {
	
		var window = Ti.UI.createWindow({
			title: title,
			backgroundImage: 'images/bg.png',
			backgroundRepeat: 'TRUE',
			barColor: '#272B33'
		});
		
		if (bgrepeat){
		    window.setBackgroundRepeat(bgrepeat);
		}
		
		if (image)
		{
			window.setBackgroundImage(image);
		}
		if (opacity)
		{
			window.setOpacity(opacity); // 0 is transparent, 1 is opaque
		}
		return window;
};

module.exports = TabWindow;