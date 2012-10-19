function ReadDescWindow(parentWindow, currentTitle, currentDescrip, numCards, cardDescrips) {
    	var ReadCardLayout = require('ui/readings/ReadCardLayout');
    	var TabWindow = require('ui/TabWindow');
		var window = new TabWindow(numCards + ' Card Reading');
        
        var scroll =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:0,
            showVerticalScrollIndicator:true,
            width: '90%',
            //textAlign: 'left'
        }); //create scroll view
        
        var view = Ti.UI.createView({
            layout: 'vertical',
            height: Ti.UI.FILL,
            top:0
        });//create view
        
        var button = Ti.UI.createButton ({
           top: 25,
           backgroundImage: '/images/button.png', 
           width: 278,
           height: 45
        });//create button
        button.addEventListener('click', function(e){
        	// play shuffle sound while we're drawing random cards for the random card hand
        	// hence, shuffle sound is playing in the RandomCardSet call
        	var RandomCardSet = require('ui/readings/RandomCardSet');
        	var cardSet = new RandomCardSet(numCards);
        	
			//var timeout = 600; // timeout in milliseconds, this seems too slow
			var timeout = 200;
        	var cardLayout = new ReadCardLayout(parentWindow, currentTitle, cardSet, cardDescrips);
        	// wait until shuffling sound is done playing before you open the next window
        	setTimeout(function(){parentWindow.containingTab.open(cardLayout);}, (timeout*numCards));
        });
        
        var numberLabel = Titanium.UI.createLabel({
            top: 25,
            text: currentTitle,
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:30},
            textAlign:'left'
        });
        
        var descripLabel = Titanium.UI.createLabel({
            top: 25,
            text: currentDescrip,
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:16},
            textAlign:'left'
        });//create labels
        
        view.add(numberLabel);
        view.add(button);
        view.add(descripLabel); 
        scroll.add(view);//add view to scroll
        window.add(scroll);//add scroll to window
    	
        return window;
};

module.exports = ReadDescWindow;

/* old code graveyard: Begin
 * 
 * //Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
		/*
		var flipSound = Ti.Media.createSound({
				url: '/audio/CardFlip.mp3',
				preload: true
		});
		*/
		/*
		var shuffleSound = Ti.Media.createSound({
				url: '/audio/CardShuffle.mp3',
				preload: true,
				looping: true,
				allowBackground: true
		});
		*/
		/*
		for (var i = 0; i < numCards; i++)
			{
				// make sure you delay long enough for the shuffling to take place
				//setTimeout(function(){flipSound.play()}, timeout*(i+1));
			}
			*/
			
		/* // This event listener crashed Android
        Ti.API.addEventListener('updateDesc',function(e){
            l2.text = e.description;
            l1.text = e.numberCards;
            window.title = e.title;
        });
        */
/* old code graveyard: ends
 * 
 */