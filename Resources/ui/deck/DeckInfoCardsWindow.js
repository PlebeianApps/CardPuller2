/**
 * @author Vui Nguyen
 */
function DeckInfoCardsWindow(parentWindow, colorGroupName, color, descrip) {
	//var TabWindow = require('ui/TabWindow');
	//var window = new TabWindow(title);
	
	var window = Ti.UI.createWindow({
			title: color,
			backgroundImage: '/images/bg.png',
            backgroundRepeat: 'true',
            barColor: '#272B33',
			layout: 'vertical'
		});
	 
	var platform = Ti.Platform.osname;
	
	// This alert comes up much too slowly to be of any use
	/*window.addEventListener('focus', function(e){
		if (platform === 'android')
		{
			alert('Please wait while cards load...');
		}	
	});*/
	
	var InfoView = require('ui/deck/InfoView');
    var infoView = new InfoView(descrip);
    var CardsView = require('ui/deck/CardsView');
    var cardsView = new CardsView(parentWindow, color);
        
    if (platform === 'android')
    {
    	// create regular buttons
    	var buttonView = Ti.UI.createView({
    		layout: 'horizontal',
    		top: 10,
    		width: '90%',
    		height: '10%'
    	});
    	var infoButton = Ti.UI.createButton({
    		width: '20%',
           	height: Ti.UI.SIZE,
           	title: 'Info',
           	textAlign: 'center',
           	right: '30%'
    	});
    	var cardsButton = Ti.UI.createButton({
    		width: '20%',
           	height: Ti.UI.SIZE,
           	title: 'Cards',
           	textAlign: 'center',
           	left: '30%'
    	});
    	infoButton.addEventListener('touchend', function(e){
    		//window.remove(cardsView);
        	//window.add(infoView);
        	window.remove(cardsView);
        	infoView = new InfoView(descrip);
        	window.add(infoView);
        });
        cardsButton.addEventListener('touchend', function(e){
        	//window.remove(infoView);
        	//window.add(cardsView);
			alert('Please wait while cards load...');
        	window.remove(infoView);
        	cardsView = new CardsView(parentWindow, color);
        	window.add(cardsView);
        });
    	buttonView.add(cardsButton);
    	buttonView.add(infoButton);
    	window.add(buttonView);
    }
    else if ((platform === 'iphone') || (platform === 'ipad'))
    {
    	// create a button bar
    	var buttonBar = Titanium.UI.iOS.createTabbedBar({
   			labels:['Cards', 'Info'],
    		backgroundColor:'#272B33',
    		top:10,
    		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    		height:25,
    		width:200,
    		index:0
		});
		buttonBar.addEventListener('touchend', function(e){
			if (e.index === 0)
			{
				//window.remove(infoView);
        		//window.add(cardsView);
        		window.remove(infoView);
        		cardsView = new CardsView(parentWindow, color);
        		window.add(cardsView);
			}
			else
			{
				//window.remove(cardsView);
        		//window.add(infoView);
        		window.remove(cardsView);
        		infoView = new InfoView(descrip);
        		window.add(infoView);
			}
		});
		window.add(buttonBar);
    }
    
    window.add(cardsView);
    return window;
};

module.exports = DeckInfoCardsWindow;
