/**
 * @author Vui Nguyen
 */
function SingleCardDetail(title, content, image, audio) {
    // check to see if the sound file is "Buy Now", if it is, continue with the rest of the 
    // sound player stuff; If not, skip the sound player stuff
    var soundFileAvail = false;
    if (audio != 'Buy Now')
    {	
    	soundFileAvail = true;
    } 
    
    var sound;
    
    if (soundFileAvail)
    {
    	Ti.Media.audioSessionMode = Ti.Media.AUDIO_SESSION_MODE_AMBIENT;
    	sound = Titanium.Media.createSound({
    		url: audio,
    		preload: true,
    		allowBackground: false
    	});
    }
    
	var window = Ti.UI.createWindow({
			title: title,
			backgroundColor: 'black',
			barColor: '#262626',
			backgroundImage: image,
			layout: 'vertical',
			backgroundRepeat: 'false'
		});
		
	window.addEventListener('blur', function(e){
		if (soundFileAvail) {
			sound.stop();	// if sound file available, stop playing when going back a window
		}
	});
		
	var scrollView =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:10,
            showVerticalScrollIndicator:true,
            width: '100%',
        }); //create scroll view
        
    var view = Ti.UI.createView({
            layout: 'vertical',
            height: Ti.UI.FILL,
            top:0,
            width: '90%',
            backgroundImage: '/images/bg-transparent.png',
            backgroundRepeat: 'true',
            borderRadius: 10
        });//create view
    
    if (soundFileAvail)
    {
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
           		textAlign: 'left',
           		left: '5%'
    		});
    		var pauseButton = Ti.UI.createButton({
    			width: '25%',
           		height: Ti.UI.SIZE,
           		title: 'Pause',
           		textAlign: 'left',
           		left: '5%'
    		});
    		var resetButton = Ti.UI.createButton({
    			width: '25%',
           		height: Ti.UI.SIZE,
           		title: 'Reset',
           		textAlign: 'left',
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
    	} // end if Android
    	else if ((platform === 'iphone') || (platform === 'ipad'))
    	{
    		// create a button bar
    		var buttonBar = Titanium.UI.iOS.createTabbedBar({
   				labels:['Play', 'Pause', 'Reset'],
    			backgroundColor:'#272B33',
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
    	} // end else if 
   } // if soundFileAvail is true 
    
	
	// Since iOS has this "bug" when long words get truncated instead of word wrapped (not a
	//	problem with Android, go figure!), switched to using a text area instead of a label
	// see this forum for explanation of solution: http://developer.appcelerator.com/question/136446/problem-with-long-text-inside-a-label-on-ios
	var contentLabel = Ti.UI.createTextArea({
		color: 'black',
		value: content,
		editable: false,
		height: Ti.UI.FILL,
        font:{fontSize:16},
        top: 10,
        width: '90%',
        backgroundColor: 'transparent',
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        bottom: 50
        //textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
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
