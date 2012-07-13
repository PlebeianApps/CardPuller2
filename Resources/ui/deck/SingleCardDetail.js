/**
 * @author Vui Nguyen
 */
function SingleCardDetail(title, content, image, audio) {
	//var TabWindow = require('ui/TabWindow');
	//var window = TabWindow(title, image);
	//Ti.API.info('The value of audio is ' + audio);
    //Ti.Media.createAudioPlayer({ url: 'https://fleetcreature.basecamphq.com/projects/9058309/file/112960605/KellytheGreenDragon-Color.mp3'});
    Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
    var sound = Titanium.Media.createSound({
    	url: audio,
    	preload: true,
    	allowBackground: false
    });
    
	var window = Ti.UI.createWindow({
			title: title,
			//backgroundColor: 'black',
			backgroundImage: image,
			layout: 'vertical'
		});
		
	window.addEventListener('blur', function(e){
		sound.stop();
	});
		
	var scrollView =  Ti.UI.createScrollView({
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
        /*
        var button = Ti.UI.createButton ({
            title: 'Begin',
           top: 10,
           width: Ti.UI.FILL,
           height: Ti.UI.SIZE //wraps button to size of text
        });//create button
        button.addEventListener('click', function(e){
        	var cardLayout = new ReadCardLayout(defaultTitle, defaultNumCards, cardDescrips);
        	parentWindow.containingTab.open(cardLayout);
        });;
        */
    
    
    
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
    	var playButton = Ti.UI.createButton({
    		width: '25%',
           	height: Ti.UI.SIZE,
           	title: 'Play',
           	textAlign: 'center',
           	left: '5%'
    	});
    	var pauseButton = Ti.UI.createButton({
    		width: '25%',
           	height: Ti.UI.SIZE,
           	title: 'Pause',
           	textAlign: 'center',
           	left: '5%'
    	});
    	var resetButton = Ti.UI.createButton({
    		width: '25%',
           	height: Ti.UI.SIZE,
           	title: 'Reset',
           	textAlign: 'center',
           	left: '5%'
    	});
    	
    	playButton.addEventListener('click', function(e){
    		sound.play();
        });
        pauseButton.addEventListener('click', function(e){
        	sound.pause();
        });
        resetButton.addEventListener('click', function(e){
        	sound.reset();
        });
    	buttonView.add(playButton);
    	buttonView.add(pauseButton);
    	buttonView.add(resetButton);
    	window.add(buttonView);
    }
    else if ((platform === 'iphone') || (platform === 'ipad'))
    {
    	// create a button bar
    	var buttonBar = Titanium.UI.iOS.createTabbedBar({
   			labels:['Play', 'Pause', 'Reset'],
    		backgroundColor:'#336699',
    		top:10,
    		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    		height:25,
    		width:200,
    		//index:0 // this makes the first button appear selected
		});
		buttonBar.addEventListener('click', function(e){
			if (e.index === 0)
			{
				sound.play();
			}
			else if (e.index === 1)
			{
				sound.pause();
			}
			else
			{
				sound.reset();
			}
		});
		window.add(buttonBar);
    }
     
	var contentLabel = Ti.UI.createLabel({
		text: content,
        //height:Ti.UI.FILL, // this height will center the text in the middle of the screen
        height: Ti.UI.SIZE,
        //width: '100%',
        color:'#900',
        font:{fontSize:24},
        textAlign:'center',
        top: 10
	});
	view.add(contentLabel);
	scrollView.add(view);
	
	window.add(scrollView);
	return window;
};

module.exports = SingleCardDetail;


/* Non working code grave here
 * 
	var window = Ti.UI.createWindow({
			title: title,
			backgroundColor: 'white',
			//backgroundImage: image,
		});
		
	// Don't bother with opaque views for Android, it just doesn't work
	// You can only add opacity to the window, but then everything else added to it 
	// becomes opaque; My suggestion: Have an opaque and a non-opaque version of each graphic
	var opaqueView = Ti.UI.createImageView({
		//width: Ti.UI.FILL,
		//height: Ti.UI.FILL,
		image: image,
		opacity: '.5'
	});
	
	var opaqueView = Ti.UI.createView({
		backgroundImage: image,
		opacity: '.5',
	});
	
	opaqueView.add(label);
	window.add(opaqueView);
 */
