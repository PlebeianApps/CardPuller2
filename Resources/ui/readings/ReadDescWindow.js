//function ReadDescWindow(defaultTitle) {
function ReadDescWindow(parentWindow, defaultTitle, defaultDescrip, defaultNumCards, cardDescrips) {
    
    	var ReadCardLayout = require('ui/readings/ReadCardLayout');
    	
        var window = Ti.UI.createWindow({
            backgroundColor: 'white',
            title : defaultTitle
        }); //create window
        
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
            title: 'Begin',
           top: 10,
           width: Ti.UI.FILL,
           height: Ti.UI.SIZE //wraps button to size of text
        });//create button
        button.addEventListener('click', function(e){
        	var cardLayout = new ReadCardLayout(defaultTitle, defaultNumCards, cardDescrips);
        	parentWindow.containingTab.open(cardLayout);
        });;
        
        var numberLabel = Titanium.UI.createLabel({
            top: 10,
            text: defaultNumCards + ' Card Reading',
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:30},
            textAlign:'center'
        });
        
        var descripLabel = Titanium.UI.createLabel({
            top: 10,
            text: defaultDescrip,
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:24},
            textAlign:'center'
        });//create labels
        
        view.add(button);
        view.add(numberLabel);
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