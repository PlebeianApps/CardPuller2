/**
 * @author Vui Nguyen
 */
function DeckInfoCardsWindow(parentWindow, colorGroupName, color, descrip) {
	//var TabWindow = require('ui/TabWindow');
	//var window = new TabWindow(title);
	
	//var color = colorGroupName.slice(0, colorGroupName.length - 6); // remove the word "Cards"
	var window = Ti.UI.createWindow({
			title: color,
			backgroundColor: 'black',
			layout: 'vertical',
			barColor: '#262626'
		});
	
	/*	
	var scrollView =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:0,
            showVerticalScrollIndicator:true,
            width: '90%'
        }); //create scroll view
    */    
	var InfoView = require('ui/deck/InfoView');
    var infoView = new InfoView(descrip);
    var CardsView = require('ui/deck/CardsView');
    var cardsView = new CardsView(parentWindow, color);
    
	var platform = Ti.Platform.osname;
        
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
           	left: '30%'
    	});
    	var cardsButton = Ti.UI.createButton({
    		width: '20%',
           	height: Ti.UI.SIZE,
           	title: 'Cards',
           	textAlign: 'center',
           	right: '30%'
    	});
    	infoButton.addEventListener('click', function(e){
    		window.remove(cardsView);
        	window.add(infoView);
        	//scrollView.remove(cardsView);
        	//scrollView.add(infoView);
        });
        cardsButton.addEventListener('click', function(e){
        	window.remove(infoView);
        	window.add(cardsView);
        	//scrollView.remove(infoView);
        	//scrollView.add(cardsView);
        });
    	buttonView.add(infoButton);
    	buttonView.add(cardsButton);
    	window.add(buttonView);
    }
    else if ((platform === 'iphone') || (platform === 'ipad'))
    {
    	// create a button bar
    	var buttonBar = Titanium.UI.iOS.createTabbedBar({
   			labels:['Info', 'Cards'],
    		backgroundColor:'#336699',
    		top:10,
    		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    		height:25,
    		width:200,
    		index:0
		});
		buttonBar.addEventListener('click', function(e){
			if (e.index === 0)
			{
				window.remove(cardsView);
        		window.add(infoView);
        		//scrollView.remove(cardsView);
        		//scrollView.add(infoView);
			}
			else
			{
				window.remove(infoView);
        		window.add(cardsView);
        		/*scrollView.remove(infoView);
        		scrollView.add(cardsView);
        		*/
			}
		});
		window.add(buttonBar);
    }
    
    //scrollView.add(infoView);
    //window.add(scrollView);
    window.add(infoView);
    return window;
};

module.exports = DeckInfoCardsWindow;
