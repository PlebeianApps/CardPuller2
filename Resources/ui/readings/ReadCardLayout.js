/**
 * @author Vui Nguyen
 */
function ReadCardLayout(parentWindow, title, cardSet, cardDescrips)
{			
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title);	
	var backOfCard = '/images/BACKOFCARD.png';
	
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
    var cardTurned = []; // 0 is not turned, 1 is turned
	for (var i = 0; i < cardArray.length; i++)
	{
		//Ti.API.info('value of cardImage is ' + cardArray[i].cardLoc);
		cardLocations.push(cardArray[i].cardLoc);
		cardLocationsTransparent.push(cardArray[i].cardLocTransparent);
		cardTitles.push(cardArray[i].cardName);
		cardTurned.push(0);
	}
	
	var SingleCardWindow = require('ui/deck/SingleCardWindow');
	var views = [];
	for (var i = 0; i < numberCards; i++)
	{
		//Ti.API.info('card description is ' + cardDescrips[i]);
		// create a View, add a label and an image view with a default image for now
		var view = Titanium.UI.createView({
            top:0,
            width: '80%',
            height: '100%',
            layout: 'vertical',
		});
		
		var cardNum = i + 1;
		var numberLabel = Ti.UI.createLabel({
			top: 10,
			//color: 'black',
			color: '#616D80',
			textAlign: 'center',
			text: 'Card ' + cardNum + ' out of ' + numberCards
		});
		
		var imageView = Ti.UI.createView({
			top: 10,
			height: '55%',
			customTitle: cardTitles[i], // these are custom components
            customLoc: cardLocations[i], // these are custom components
            customLocTran: cardLocationsTransparent[i], // these are custom components
            customCardPosition: i // these are custom components
		});
		
		var image = Ti.UI.createImageView({
			height: '100%',
			image: backOfCard
		});
		imageView.add(image);
		
		/*var imageLabel = Ti.UI.createLabel({
			color: 'black',
			text: 'Press and Hold to do things',
			width: '40%',
			textAlign: 'center',
			font: { fontSize:18 },
		});
		*/
		
		imageView.add(image);
		//imageView.add(imageLabel);
		
		Ti.API.info('cardTitle[' + i + ']: ' + cardTitles[i]);
		Ti.API.info('cardLocations[' + i + ']: ' + cardLocations[i]);
		Ti.API.info('cardLocationsTransparent[' + i + ']: ' + cardLocationsTransparent[i]);
		Ti.API.info('\n');
		// longpress is here so you can't accidentally turn over a card while
		// scrolling through the card reading layout
		imageView.addEventListener('touchend', function(e){
			// if the image is the back of the card, display the front of the card
			// and remove the "Turn Card" label
			// otherwise, display a large version of the front of the card
			if (e.source.parent.children[0].image === backOfCard)
			{
				// you must define your sound file in this listener before you
				// play it, otherwise Android crashes
				var flipSound = Ti.Media.createSound({
					url: '/audio/CardFlip.mp3',
					preload: true
				});
				flipSound.play(); 
				// for some reason, the children views of imageView are the image [0], and label [2];
				// I have no idea what the mystery middle child view of imageView is: children[1]??
				e.source.parent.children[0].image = e.source.parent.customLoc; // change the image file
				//e.source.parent.children[2].text = '';        // change the Turn Card label to display no text
				var position = e.source.parent.customCardPosition;
				//Ti.API.info('customCardPosition: ' + position);
				cardTurned[position] = 1;
			}
			else
			{
				parentWindow.containingTab.open(new SingleCardWindow(parentWindow, e.source.parent.customTitle, e.source.parent.customLoc, e.source.parent.customLocTran));
			}
		});
		
		//Ti.API.info('The value of view is ' + view.toString());
		var descripLabel = Ti.UI.createLabel({
			top: 10,
			color: '#616D80',
			textAlign: 'center',
			text: cardDescrips[i]
		});
		view.add(numberLabel);
		view.add(imageView);
		view.add(descripLabel);
		views.push(view);
	}	// end i < numCards
	
	var scrollable = Titanium.UI.createScrollableView({
  		views:views,
		showPagingControl: true
	});
	window.add(scrollable);
	
	var dialog = Ti.UI.createAlertDialog({
		buttonNames: ['Cancel', 'Yes'],
		message: 'Not all cards turned over.\nGo back?',
		title: 'Go back a window'
	});
	dialog.addEventListener('click', function(e) {
			if (e.index === 1)
				{ window.close(); }
	});
	
	if (Ti.Platform.osname === 'iphone' || 'ipad')
	{
		var backButton = Ti.UI.createButton({
			title : numberCards + ' Card Reading',
			height : 50,
			width : 100,
		});
	
		backButton.addEventListener('click', function() {
			if (checkAllCardsTurned() == false)
			{ dialog.show();}
			else
			{ window.close();}
		});
		window.setLeftNavButton(backButton);
	}	// if platform is iphone or ipad
	// Note: Do NOT wrap this event listener within an else if (Ti.Platform.osname === 'android'), 
	// it will screw up Android
	window.addEventListener('android:back', function(e) {
		if (checkAllCardsTurned() == false)
		{ dialog.show();}
		else
		{ window.close();}
	});
	
	function checkAllCardsTurned()
	{
		var allCardsTurned = true;
		for (var i = 0; i < numberCards; i++)
		{
			if (cardTurned[i] === 0)
			{
				allCardsTurned = false;
				break;
			}
		}
		return allCardsTurned;
	}
	return window;
};

module.exports = ReadCardLayout;

