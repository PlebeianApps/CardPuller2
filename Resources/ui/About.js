function About(title) {
        
        var TabWindow = require('ui/TabWindow');
        var window = TabWindow(title);
        
        var scroll =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:0,
            showVerticalScrollIndicator:true,
            width: '80%'
        }); //create scroll view
        
        var view = Ti.UI.createView({
            layout: 'vertical',
            height: Ti.UI.FILL,
            top:0,
            bottom: 50
        });//create view
        
        var descripLabel = Titanium.UI.createLabel({
            top: 25,
            text:"Tori Hartman has worked as a psychic, intuitive and color expert for more than twenty years. She is the only psychic ever interviewed by the New York Times and L.A. Business Journal. Her guidance has helped celebrities, such as Jeff Lewis in launching his hit TV show, Flipping	Out, on Bravo Networks.\n\nTori was also featured by popular author and artist, SARK as an expert on living an empowered life for the Tele-Class series Dream Boogie with SARK.\n\nNow she's making her knowledge available with the Color Wisdom Cards. This book and card set work as a divination tool and meditation aid to help clear life blocks and restructure beliefs to empower others to do spiritual work on their own. Her message is one of empowering people to use their own intuition to make decisions and create the life of their	dreams. Tori lives in Los Angeles, CA with her two Whippets, Frank and Owen. For more on Tori visit www.ToriHartman.com.",
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:16},
            textAlign:'left'
        });//create labels
        
        var buttonTori = Ti.UI.createButton ({
           top: 25,
           title: 'Buy the Book',
           width: '100%'
        });//create button
        
        var buttonPlebeian = Ti.UI.createButton ({
           top: 25,
           title: 'More by Plebeian Apps',
           width: '100%'
        });//create button
        
        buttonTori.addEventListener('click', function(e) {
            //open link in safari - application will close
            Titanium.Platform.openURL('http://www.colorwisdomcards.com');
        });
        
        buttonPlebeian.addEventListener('click', function(e) {
            //open link in safari - application will close
            Titanium.Platform.openURL('http://itunes.com/plebeianapps');
        });
        
        view.add(descripLabel);
        view.add(buttonTori);
        view.add(buttonPlebeian);
        scroll.add(view);//add view to scroll
        window.add(scroll);//add scroll to window
        
        return window;
};

module.exports = About;