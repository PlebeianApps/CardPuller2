/**
 * @author Vui Nguyen
 */
function CardsView(parentWindow, colorOfCards) {
		var platform = Ti.Platform.osname; // this will be used later
	
    	var SingleCardWindow = require('ui/deck/SingleCardWindow');
    	var viewsArray = [];
    	var scrollable = Titanium.UI.createScrollableView({
			showPagingControl: true
		});
		
		var CardData = require('db/CardData');
    	var cardArray = new CardData().getCardsByGroupName(colorOfCards + ' Cards');
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
		
    	if (cardArray.length > 0)
    	{
    		Ti.API.info('ColorOfCards is: ' + colorOfCards + '. Theres something here');
    		//Ti.API.info('Length of array is ' + cardArray.length);
    		//Ti.API.info('Length of CardLocations is ' + cardLocations.length)
    	}
    	else 
    	{
    		Ti.API.info('ColorOfCards is: ' + colorOfCards + '. Empty array returned from this database call');
    		//alert('No cards of this color in DB');
    		return scrollable;
    	}
		
       
       function layoutCards()
       {
       		var numCards = cardLocations.length;
       		var rowsPerView = 2;
       		var cardsPerRow = 3;
       		var i = 0, j, k;
       		while (i < numCards)
       		{
       			var view = Ti.UI.createView({
            		layout: 'vertical',
            		height: 'auto',
            		top:0
        		}); //create new view for the view array
        		for (j = 0; j < rowsPerView; j++)
        		{
        			if (i === numCards) { break; }
        			var row = Ti.UI.createView({
        				layout: 'horizontal',
        				height: '45%',
        				top: '5%',
        				width: '100%'
        				//height: 200
        				//bottom: 10
        			}); 
        			for (k = 0; k < cardsPerRow; k++)
        			{
        				if (i === numCards) { break; }
        				var image = Ti.UI.createImageView({
							width: '30%',
							//height: Ti.UI.FILL, // this is the line that ensures all images will be
												  // resized the same on Android
							//height: '100%',	// this line will only work for iPhone
							height: (platform === 'android') ? Ti.UI.FILL : '100%',
							image: cardLocations[i],
							left: '3%',
							customTitle: cardTitles[i], // custom property
							customImageTransparent: cardLocationsTransparent[i] // custom property
						}); 
						// longpress is here so you can't accidentally turn over a card while
						// scrolling through the views
						image.addEventListener('touchend', function(e){
							parentWindow.containingTab.open(
								new SingleCardWindow(parentWindow, e.source.customTitle, e.source.image, e.source.customImageTransparent));
						});
        				row.add(image); i++; 
        			}	// end k < cardsPerRow
        			view.add(row); 
        		}	// end j < rowsPerScreen
        		viewsArray.push(view);
       		} // end i < numCards
       		return viewsArray;
      }; // end layoutCards
       
        scrollable.views = layoutCards();
		return scrollable;
};

/* More old code here - Begin
 */
/*
        var mainView = Ti.UI.createView({
            layout: 'vertical',
            height: 'auto',
            top:0
        });//create view
        
        var secondView = Ti.UI.createView({
            layout: 'vertical',
            height: 'auto',
            top:0
        });//create view
       */
/*function createRow(images)
        {
        	var viewRow = Ti.UI.createView({
        		layout: 'horizontal',
        		height: '45%',
        		top: '5%',
        		width: '100%'
        		//height: 200
        		//bottom: 10
        	});
        	for (var i = 0; i < 3; i++)
        	{
        		var image = Ti.UI.createImageView({
				width: '30%',
				//height: Ti.UI.FILL, // this is the line that ensures all images will be
									// resized the same on Android
				//height: '100%',	// this line will only work for iPhone
				height: (platform === 'android') ? Ti.UI.FILL : '100%',
				//image: '/images/BACKOFCARD.png',
				image: images[i],
				left: '3%',
				//opacity: '.5' // let's play with this
				}); 
				image.addEventListener('click', function(e){
					parentWindow.containingTab.open(new SingleCardWindow(parentWindow));
				});
        		viewRow.add(image);
        	}
        	return viewRow;
        };
        */
        ///*
        //var firstRow = createRow(cards);
        //var secondRow = createRow();
        //var thirdRow = createRow();
        //var fourthRow = createRow();
       // */
       ///*
        //mainView.add(firstRow);
        //mainView.add(secondRow);
        //secondView.add(thirdRow);
        //secondView.add(fourthRow);
        //*/
      
        
        			//viewsArray.push(mainView, secondView);
        /*
        var firstRow = createRow(cards);
        mainView.add(firstRow);
        viewsArray.push(mainView);
        scrollable.views = viewsArray;
        */
/* Old Code Here - Ends
 */

/* // This code was a test to see if we could do a composite layout
        * // instead of a layout with multiple views;
        * // With the idea that multiple views takes a long time to load; This test failed.
        */
       /*
       var mainView = Ti.UI.createView({
       		top: 0,
       		height: '100%',
       		width: '100%'
       });
       
       var leftVal = 3;
       for (var i = 0; i < 3; i++)
       {
       		var cardImage = addImage(leftVal); 
       		mainView.add(cardImage);
       		leftVal = leftVal + 33;
       }
       
       function addImage(leftVal)
       {
       		image = Ti.UI.createImageView({
				width: '30%',
				//height: '45%', 		// this sizes images inconsistently on Android
				height: Ti.UI.FILL/2, // This line just doesn't do what we want on iPhone
								      // and doesn't display anything on Android
				image: '/images/BACKOFCARD.png',
				left: leftVal + '%',
				top: '5%'
				//opacity: '.5' // let's play with this
				}); 
			return image;
       };
*/

module.exports = CardsView;
