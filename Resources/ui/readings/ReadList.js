function ReadList(title) {
		
		var TabWindow = require('ui/TabWindow');
		var window = TabWindow(title);
        var ReadDescWindow = require('ui/readings/ReadDescWindow');
        var CardData = require('db/CardData');
        		
	    var tbl_data = new CardData().getReadingsData();
		var table = Titanium.UI.createTableView({
			data:tbl_data,
			backgroundColor: 'transparent',
			separatorColor: '#1D1D1D',
			
		});
		
		//var readings = new ReadDescWindow('Default Reading Title');
		// Listen for click events.
		table.addEventListener('click', function(e) {
			// this fireEvent crashed Android
			//Ti.API.fireEvent('updateDesc',{title: e.rowData.title, description: e.rowData.descrip, numberCards: e.rowData.numberCards});
			var cardDescrips = [e.rowData.card1descrip, e.rowData.card2descrip, e.rowData.card3descrip, e.rowData.card4descrip];
			var readings = new ReadDescWindow(window, e.rowData.title, e.rowData.descrip, e.rowData.numberCards, cardDescrips);
			window.containingTab.open(readings);
		});
		
		window.add(table);
		
		return window;
};

module.exports = ReadList;