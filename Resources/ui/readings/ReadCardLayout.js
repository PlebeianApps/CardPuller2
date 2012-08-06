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
	for (var i = 0; i < cardArray.length; i++)
	{
		//Ti.API.info('value of cardImage is ' + cardArray[i].cardLoc);
		cardLocations.push(cardArray[i].cardLoc);
		cardLocationsTransparent.push(cardArray[i].cardLocTransparent);
		cardTitles.push(cardArray[i].cardName);
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
            customLocTran: cardLocationsTransparent[i] // these are custom components
		});
		
		var image = Ti.UI.createImageView({
			//top: 10,
			//height: '55%',
			height: '100%',
			image: backOfCard
		});
		imageView.add(image);
		
		var imageLabel = Ti.UI.createLabel({
			color: 'black',
			//textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			//textAlign: 'center',
			text: 'Turn Card',
			font: { fontSize:22 },
			//width: Ti.UI.FILL
		});
		
		imageView.add(image);
		imageView.add(imageLabel);
		
		Ti.API.info('cardTitle[' + i + ']: ' + cardTitles[i]);
		Ti.API.info('cardLocations[' + i + ']: ' + cardLocations[i]);
		Ti.API.info('cardLocationsTransparent[' + i + ']: ' + cardLocationsTransparent[i]);
		Ti.API.info('\n');
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
				e.source.parent.children[2].text = '';        // change the Turn Card label to display no text
			}
			else
			{
				parentWindow.containingTab.open(new SingleCardWindow(parentWindow, e.source.parent.customTitle, e.source.parent.customLoc, e.source.parent.customLocTran));
			}
		});
		
		//Ti.API.info('The value of view is ' + view.toString());
		var descripLabel = Ti.UI.createLabel({
			top: 10,
			//color: 'black',
			color: '#616D80',
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

