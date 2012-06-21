/**
 * @author Vui Nguyen
 */
function ReadCardLayout(title, numberCards, cardDescrips)
{
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title);
	
	// logic: based on the title and number of cards, we determine
	// 1 - how many views to create and display and
	// 2 - how many card position descriptions to pull for the respective title
	// create the same layout for each view; keep in mind percentage for image layout
	// here, we want to display a series of scrollviews
	var views = [];
	for (var i = 0; i < numberCards; i++)
	{
		//Ti.API.info('card description is ' + cardDescrips[i]);
		// create a View, add a label and an image view with a default image for now
		var view = Titanium.UI.createView({
			contentHeight:'auto',
            top:0,
            width: '80%',
            height: '100%',
            layout: 'vertical'
			//backgroundColor:'#FFFFCC'
		});
		
		var cardNum = i + 1;
		var numberLabel = Ti.UI.createLabel({
			top: 10,
			color: 'black',
			textAlign: 'center',
			text: 'Card ' + cardNum + ' out of ' + numberCards 
		});
		var image = Ti.UI.createImageView({
			top: 10,
			//height: 200,
			//width: 100,
			height: '60%',
			image: '/images/BACKOFCARD.png'
		});
		var descripLabel = Ti.UI.createLabel({
			top: 10,
			color: 'black',
			textAlign: 'center',
			text: cardDescrips[i]
		});
		view.add(numberLabel);
		view.add(image);
		view.add(descripLabel);
		views.push(view);
	}
	
	var scrollable = Titanium.UI.createScrollableView({
  		views:views,
		showPagingControl: true
	});
	window.add(scrollable);
	
	return window;
};

module.exports = ReadCardLayout;

