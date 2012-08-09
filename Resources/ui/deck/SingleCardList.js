/**
 * @author Vui Nguyen
 */
function SingleCardList(parentWindow, title, image) {
	var TabWindow = require('ui/TabWindow');
	var window = new TabWindow(title, image, 1.0, 'false');
	var SingleCardDetail = require('ui/deck/SingleCardDetail');
	var singleCardDetail;
	
	var CardData = require('db/CardData');
	var tableData = new CardData().getSingleCardData(title);
		
	var cardTitle = Titanium.UI.createLabel ({
	   text: title,
	   top: 15,
	   color: 'black',
	   font:{fontSize:24},
	   width: '90%',
	   textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	   backgroundImage: '/images/bg-transparent.png',
	   backgroundRepeat: 'true',
	   borderRadius: 10,
	   height: 70
	});
	var table = Titanium.UI.createTableView({
			data: tableData,
			backgroundImage: '/images/bg-transparent.png',
			backgroundRepeat: 'true',
			top: 100,
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
	window.add(cardTitle);
	window.add(table);
	return window;
};

module.exports = SingleCardList;
