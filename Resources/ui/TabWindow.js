function TabWindow(title, image, opacity) {
	
		var window = Ti.UI.createWindow({
			title: title,
			backgroundColor: 'black',
			barColor: '#262626'
		});
		
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