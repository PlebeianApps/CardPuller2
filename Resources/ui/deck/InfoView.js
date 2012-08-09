/**
 * @author Vui Nguyen
 */
function InfoView(description) {
       var scrollView =  Ti.UI.createScrollView({
            contentHeight:'auto',
            top:10,
            showVerticalScrollIndicator:true,
            width: '100%'
        });
        var view = Ti.UI.createView({
            layout: 'vertical',
            height: Ti.UI.FILL,
            top:0,
            width: '90%',
            backgroundImage: '/images/bg-transparent.png',
            backgroundRepeat: 'true',
            borderRadius: 10
        });//create view
        
        /*
        var descripLabel = Titanium.UI.createLabel({
            top: 10,
            text: description,
            height:Ti.UI.SIZE,
            color:'#616D80',
            font:{fontSize:16},
            textAlign:'left'
        });*/
        //create labels
        
    // Since iOS has this "bug" when long words get truncated instead of word wrapped (not a
	//	problem with Android, go figure!), switched to using a text area instead of a label
	// see this forum for explanation of solution: http://developer.appcelerator.com/question/136446/problem-with-long-text-inside-a-label-on-ios
	var descripLabel = Ti.UI.createTextArea({
		color: 'black',
		value: description,
		editable: false,
		height: Ti.UI.FILL,
        font:{fontSize:16},
        top: 0,
        width: '100%',
        //backgroundColor: 'transparent',
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
	});
        
        view.add(descripLabel); 
        scrollView.add(view);
		return scrollView;
};

module.exports = InfoView;
