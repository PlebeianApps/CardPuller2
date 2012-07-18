/**
 * @author Vui Nguyen
 */
function DeckList(title) {
	var TabWindow = require('ui/TabWindow');
	var DeckInfoCardsWindow = require('ui/deck/DeckInfoCardsWindow');
	var window = new TabWindow(title);
	
	var CardData = require('db/CardData');
    var tableData = new CardData().getColorGroupsData();
		
	var table = Titanium.UI.createTableView({
			data:tableData,
			backgroundColor: 'transparent',
            separatorColor: '#1D1D1D'
	});
		
	var infoCardsWindow;
	// Listen for click events.
	table.addEventListener('click', function(e) {
		// this fireEvent crashed Android
		//Ti.API.fireEvent('updateDesc',{title: e.rowData.title, description: e.rowData.descrip, numberCards: e.rowData.numberCards});
		//var cardDescrips = [e.rowData.card1descrip, e.rowData.card2descrip, e.rowData.card3descrip, e.rowData.card4descrip];
		//var readings = new ReadDescWindow(window, e.rowData.title, e.rowData.descrip, e.rowData.numberCards, cardDescrips);
		
		infoCardsWindow = new DeckInfoCardsWindow(window, e.rowData.title, e.rowData.colorcards, e.rowData.descrip);
		window.containingTab.open(infoCardsWindow);
	});
		
		
	window.add(table);
	return window;
};

module.exports = DeckList;
