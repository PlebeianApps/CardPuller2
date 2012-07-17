/**
 * @author Vui Nguyen
 */
function InfoView(description) {
       var scrollView =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:0,
            showVerticalScrollIndicator:true,
            width: '90%'
        });
        
        var view = Ti.UI.createView({
            layout: 'vertical',
            //height: Ti.UI.FILL,
            height: 'auto',
            top:0
        });//create view
        
        var descripLabel = Titanium.UI.createLabel({
            top: 10,
            text: description,
            height:Ti.UI.SIZE,
            color:'#900',
            font:{fontSize:24},
            textAlign:'center'
        });//create labels
        
        view.add(descripLabel); 
        scrollView.add(view);
		return scrollView;
};

module.exports = InfoView;
