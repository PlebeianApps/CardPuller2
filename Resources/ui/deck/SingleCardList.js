/**
 * @author Vui Nguyen
 */
function SingleCardList(parentWindow, title, image) {
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title, image);
	var SingleCardDetail = require('ui/deck/SingleCardDetail');
	var singleCardDetail;
	
	var CardData = require('db/CardData');
	var tableData = new CardData().getSingleCardData(title);
	
	//Ti.API.info('Length of cardData is ' + tableData);
	/*
	var table_data = [
    	{title:'About the Color', color:'black', 
    		descrip: 'About the Color is Awesome'},
		{title:'Story', color: 'black',
			descrip: 'Story is Awesome'},
		{title:'Inspiration', color: 'black',
			descrip: 'Inspiration is Awesome'}
	]; 
	*/
		
	var table = Titanium.UI.createTableView({
			data: tableData,
			backgroundColor: 'transparent',
			//opacity: 1
			//backgroundImage: image
	});
		
	var infoCardsWindow;
	// Listen for click events.
	table.addEventListener('click', function(e) {
		// note: don't use fireEvents here. They crash Android
		//Ti.API.fireEvent('updateDesc',{title: e.rowData.title, description: e.rowData.descrip, numberCards: e.rowData.numberCards});
		singleCardDetail = new SingleCardDetail(e.rowData.title, e.rowData.content, image, e.rowData.audio);	
		parentWindow.containingTab.open(singleCardDetail);
	});
	window.add(table);
	return window;
};

module.exports = SingleCardList;
