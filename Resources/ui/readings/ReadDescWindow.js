//function ReadDescWindow(defaultTitle) {
function ReadDescWindow(parentWindow, currentTitle, currentDescrip, numCards, cardDescrips) {
    	Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
		var flipSound = Ti.Media.createSound({
				url: '/audio/CardFlip.mp3',
				preload: true
		});
		var shuffleSound = Ti.Media.createSound({
				url: '/audio/CardShuffle.mp3',
				preload: true,
				looping: true,
				allowBackground: true
		});
    
    	var ReadCardLayout = require('ui/readings/ReadCardLayout');
    	var TabWindow = require('ui/TabWindow');
		var window = new TabWindow(currentTitle);
        
        var scroll =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:0,
            showVerticalScrollIndicator:true,
            width: '90%'
        }); //create scroll view
        
        var view = Ti.UI.createView({
            layout: 'vertical',
            height: Ti.UI.FILL,
            top:0
        });//create view
        
        var button = Ti.UI.createButton ({
           top: 25,
           backgroundImage: 'images/button.png',
           width: '278',
           height: '45' //wraps button to size of text
        });//create button
        button.addEventListener('click', function(e){
        	// play shuffle sound and then flip sound for every card dealt
        	// shuffle sound plays while we're still drawing random cards for the array
        	// hence, shuffle sound is playing in the RnadomCardSet call
        	var RandomCardSet = require('ui/readings/RandomCardSet');
        	var cardSet = new RandomCardSet(numCards);
        	
			var timeout = 600; // timeout in milliseconds
			for (var i = 0; i < numCards; i++)
			{
				// make sure you delay long enough for the shuffling to take place
				setTimeout(function(){flipSound.play()}, timeout*(i+1));
			}
        	//var cardLayout = new ReadCardLayout(parentWindow, currentTitle, numCards, cardDescrips);
        	var cardLayout = new ReadCardLayout(parentWindow, currentTitle, cardSet, cardDescrips);
        	setTimeout(function(){parentWindow.containingTab.open(cardLayout);}, (timeout*numCards));
        	//parentWindow.containingTab.open(cardLayout);
        });
        
        var numberLabel = Titanium.UI.createLabel({
            top: 25,
            text: numCards + ' Card Reading',
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:30},
            textAlign:'center'
        });
        
        var descripLabel = Titanium.UI.createLabel({
            top: 25,
            text: currentDescrip,
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:16},
            textAlign:'center'
        });//create labels
        
        view.add(numberLabel);
        view.add(button);
        view.add(descripLabel); 
        scroll.add(view);//add view to scroll
        window.add(scroll);//add scroll to window
    	
    	/* // This event listener crashed Android
        Ti.API.addEventListener('updateDesc',function(e){
            l2.text = e.description;
            l1.text = e.numberCards;
            window.title = e.title;
        });
        */
        return window;
};

module.exports = ReadDescWindow;