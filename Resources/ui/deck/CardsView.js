/**
 * @author Vui Nguyen
 */
function CardsView(parentWindow) {
		var SingleCardWindow = require('ui/deck/SingleCardWindow');
        var mainView = Ti.UI.createView({
            layout: 'vertical',
            height: 'auto',
            top:0
        });//create view
        
        var secondView = Ti.UI.createView({
            layout: 'vertical',
            height: 'auto',
            top:0
        });//create view
        
        function createRow()
        {
        	var viewRow = Ti.UI.createView({
        		layout: 'horizontal',
        		height: '45%',
        		top: '5%'
        		//height: 200
        		//bottom: 10
        	});
        	for (var i = 0; i < 3; i++)
        	{
        		image = Ti.UI.createImageView({
				width: '30%',
				height: '100%',
				image: '/images/BACKOFCARD.png',
				left: '3%',
				//opacity: '.5' // let's play with this
				}); 
				image.addEventListener('click', function(e){
					parentWindow.containingTab.open(new SingleCardWindow(parentWindow));
				});
        		viewRow.add(image);
        	}
        	return viewRow;
        };
        var firstRow = createRow();
        var secondRow = createRow();
        var thirdRow = createRow();
        var fourthRow = createRow();
        
        var descripLabel = Titanium.UI.createLabel({
            top: 10,
            text: 'A bunch of cards here',
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:24},
            textAlign:'center'
        });//create labels
        
        //firstRow.add(image);
        //firstRow.add(descripLabel);
        mainView.add(firstRow);
        mainView.add(secondRow);
        secondView.add(thirdRow);
        secondView.add(fourthRow);
       // mainView.add(thirdRow);
        var scrollable = Titanium.UI.createScrollableView({
  		views:[mainView, secondView],
		showPagingControl: true
		});
		
		return scrollable;
        //mainView.add(descripLabel); 
        //mainView.add(firstRow);
		//return mainView;
};

module.exports = CardsView;
