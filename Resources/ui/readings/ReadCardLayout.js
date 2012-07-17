/**
 * @author Vui Nguyen
 */
function ReadCardLayout(parentWindow, title, cardSet, cardDescrips)
{
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title);
	
	// logic: based on the title and number of cards, we determine
	// 1 - how many views to create and display and
	// 2 - how many card position descriptions to pull for the respective title
	// create the same layout for each view; keep in mind percentage for image layout
	// here, we want to display a series of scrollviews
	var numberCards = cardSet.length;
	//Ti.API.info('numberCards is ' + numberCards);
	var CardData = require('db/CardData');
    var cardArray = new CardData().getCardsByIndex(cardSet);
    var cardLocations = [];
    var cardLocationsTransparent = [];
    var cardTitles = [];
	for (var i = 0; i < cardArray.length; i++)
	{
		//Ti.API.info('value of cardImage is ' + cardArray[i].cardLoc);
		cardLocations.push(cardArray[i].cardLoc);
		cardLocationsTransparent.push(cardArray[i].cardLocTransparent);
		cardTitles.push(cardArray[i].cardName);
	}
	
	var SingleCardWindow = require('ui/deck/SingleCardWindow');
	var views = [];
	//var singleCards = [];
	for (var i = 0; i < numberCards; i++)
	{
		//Ti.API.info('card description is ' + cardDescrips[i]);
		// create a View, add a label and an image view with a default image for now
		var view = Titanium.UI.createView({
			//contentHeight:'auto', // do we need this?
            top:0,
            width: '80%',
            height: '100%',
            layout: 'vertical',
			//backgroundColor:'#FFFFCC'
		});
		
		var cardNum = i + 1;
		var numberLabel = Ti.UI.createLabel({
			top: 10,
			//color: 'black',
			color: 'white',
			textAlign: 'center',
			text: 'Card ' + cardNum + ' out of ' + numberCards
		});
		
		var imageView = Ti.UI.createView({
			top: 10,
			height: '55%',
			customTitle: cardTitles[i], // these are custom components
            customLoc: cardLocations[i], // these are custom components
            customLocTran: cardLocationsTransparent[i] // these are custom components
		});
		
		//imageView.prototype.customTitle = cardTitles[i];
		
		var image = Ti.UI.createImageView({
			//top: 10,
			//height: '55%',
			height: '100%',
			image: '/images/BACKOFCARD.png'
		});
		imageView.add(image);
		
		var imageLabel = Ti.UI.createLabel({
			color: 'black',
			//textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			//textAlign: 'center',
			text: 'Turn Card',
			font: { fontSize:28 },
			//width: Ti.UI.FILL
		});
		
		imageView.add(image);
		imageView.add(imageLabel);
		
		Ti.API.info('cardTitle[' + i + ']: ' + cardTitles[i]);
		Ti.API.info('cardLocations[' + i + ']: ' + cardLocations[i]);
		Ti.API.info('cardLocationsTransparent[' + i + ']: ' + cardLocationsTransparent[i]);
		Ti.API.info('\n');
		imageView.addEventListener('click', function(e){
			// Playing sounds here crashes Android; Don't do it!
			//flipSound.play();
			parentWindow.containingTab.open(new SingleCardWindow(parentWindow, e.source.parent.customTitle, e.source.parent.customLoc, e.source.parent.customLocTran));
		});
		
		//Ti.API.info('The value of view is ' + view.toString());
		var descripLabel = Ti.UI.createLabel({
			top: 10,
			//color: 'black',
			color: 'white',
			textAlign: 'center',
			text: cardDescrips[i]
		});
		view.add(numberLabel);
		//view.add(image);
		view.add(imageView);
		view.add(descripLabel);
		views.push(view);
	}	// end i < numCards
	
	var scrollable = Titanium.UI.createScrollableView({
  		views:views,
		showPagingControl: true
	});
	window.add(scrollable);
	
	return window;
};

module.exports = ReadCardLayout;

