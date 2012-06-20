//function ReadDescWindow(defaultTitle) {
function ReadDescWindow(defaultTitle, defaultDescrip, defaultNumCards) {
    
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
        
        var l1 = Titanium.UI.createLabel({
            //text: 'Default Number of Cards',
            text: defaultNumCards,
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:48},
            textAlign:'center'
        });
        
        var l2 = Titanium.UI.createLabel({
            //text: 'Default Description',
            text: defaultDescrip,
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:24},
            textAlign:'center'
        });//create labels
        
        view.add(button);
        view.add(l1);
        view.add(l2); 
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