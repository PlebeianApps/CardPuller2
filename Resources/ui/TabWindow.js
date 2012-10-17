function TabWindow(title, image, opacity, bgrepeat) {
	
		var window = Ti.UI.createWindow({
			title: title,
			backgroundImage: '/images/bg.png',
			backgroundRepeat: true,
			barColor: '#272B33'
		});
		
		this.sharedWindow = window;
		
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

TabWindow.prototype.addLeftNavButton = function(button)
{
	this.sharedWindow.setLeftNavButton(button);
};
module.exports = TabWindow;