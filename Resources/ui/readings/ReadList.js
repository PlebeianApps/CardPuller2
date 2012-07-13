function ReadList(title) {
	
		var window = Ti.UI.createWindow({
			title: title,
			backgroundColor: 'black',
			barColor: '#262626'
		});
		
		//var TabWindow = require('ui/TabWindow');
        var ReadDescWindow = require('ui/readings/ReadDescWindow');
        var CardData = require('db/CardData');
        		
	    var tbl_data = new CardData().getReadingsData();
		/* var tbl_data = [
    		{title:'Row 1'},
		    {title:'Row 2'},
		    {title:'Row 3'}
		]; */
		
		var table = Titanium.UI.createTableView({
			data:tbl_data
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