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
            top:0
        });//create view
        
        var descripLabel = Titanium.UI.createLabel({
            top: 25,
            text: 'Short ribs turducken ground round biltong tri-tip. Prosciutto cow t-bone, short loin corned beef beef shoulder tongue. Turkey drumstick salami chicken swine, frankfurter jerky hamburger pig. Leberkas pork sausage hamburger shank ground round chuck venison chicken. Tongue tail rump turkey ground round spare ribs beef short loin boudin. Filet mignon corned beef sirloin, cow tenderloin flank ground round frankfurter shank spare ribs ham hock pastrami pancetta tongue pork. Prosciutto venison tail, salami cow short ribs boudin. Salami shank tri-tip beef. Chuck tenderloin kielbasa pork belly pork shoulder frankfurter filet mignon salami ribeye pig. Spare ribs boudin short ribs rump, t-bone biltong shoulder strip steak salami. T-bone spare ribs rump, swine andouille meatloaf pig venison cow. Ham hock beef ribs prosciutto, leberkas drumstick frankfurter pork short loin rump beef biltong tongue ribeye corned beef salami. Beef ribs frankfurter flank pancetta tongue hamburger bresaola fatback pork.  Cow drumstik ground round bresaola, pig pancetta frankfurter short loin ball tip. Ball tip flank meatloaf, turducken filet mignon leberkas salami cow beef pastrami boudin shankle venison chuck tongue. Flank t-bone pork short ribs chicken sausage strip steak corned beef short loin. Fatback boudin filet mignon, pork loin pancetta kielbasa corned beef shank turkey. Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!',
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
        
        view.add(descripLabel);
        view.add(buttonTori);
        view.add(buttonPlebeian);
        scroll.add(view);//add view to scroll
        window.add(scroll);//add scroll to window
        
        return window;
};

module.exports = About;