/**
 * @author Vui Nguyen
 */
function SingleCardList(parentWindow, title, image) {
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title, image);
	//var window = new TabWindow(title);
	
	/*
	var opaqueView = Ti.UI.createImageView({
		//width: Ti.UI.FILL,
		//height: Ti.UI.FILL,
		image: image,
		opacity: '.5'
	});
	*/
	
	var SingleCardDetail = require('ui/deck/SingleCardDetail');
	var singleCardDetail;
	
	var tbl_data = [
    	{title:'About the Color', color:'black', 
    		descrip: 'About the Color is Awesome'},
		{title:'Story', color: 'black',
			descrip: 'Story is Awesome'},
		{title:'Inspiration', color: 'black',
			descrip: 'Inspiration is Awesome'}
	]; 
		
	var table = Titanium.UI.createTableView({
			data: tbl_data,
			backgroundColor: 'transparent',
			//opacity: 1
			//backgroundImage: image
	});
		
	var infoCardsWindow;
	// Listen for click events.
	table.addEventListener('click', function(e) {
		// note: don't use fireEvents here. They crash Android
		//Ti.API.fireEvent('updateDesc',{title: e.rowData.title, description: e.rowData.descrip, numberCards: e.rowData.numberCards});
		singleCardDetail = new SingleCardDetail(e.rowData.title, e.rowData.descrip, image);	
		parentWindow.containingTab.open(singleCardDetail);
	});
	//window.add(opaqueView);
	window.add(table);
	return window;
};

module.exports = SingleCardList;
