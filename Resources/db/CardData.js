/**
 * @author Alyssa Reese
 */

function CardData() {
		//this.db = Ti.Database.open('cardDb'); //create database //open database
		//this.db.remove();
		//this.db = Ti.Database.install('/db/cardDb.sqlite', 'cardDb');
		
    	this.db = Ti.Database.install('/db/cardDb.sqlite', 'cardDb');
		this.db.remove(); //Use this line if you need to remove and reinstall the db
		this.db = Ti.Database.install('/db/cardDb.sqlite', 'cardDb'); // here too
    
    	/*
        this.db = Ti.Database.open('cardDb'); //create database //open database
        this.db.execute('CREATE TABLE IF NOT EXISTS READINGS (ID INTEGER, TITLE TEXT, DESCRIPTION TEXT, NUMBERCARDS INTEGER)');//create table & columns (columntitle datatype)
        this.db.execute('DELETE FROM READINGS'); //name of table is case sensitive
        this.db.execute('INSERT INTO READINGS (TITLE, DESCRIPTION, NUMBERCARDS ) VALUES(?,?,?)',
        'Circumstances Surrounding You','What is happening in your life right now?',3);
        this.db.execute('INSERT INTO READINGS (TITLE, DESCRIPTION, NUMBERCARDS ) VALUES(?,?,?)',
        'Your Future','What is coming next?',4);
        this.db.execute('INSERT INTO READINGS (TITLE, DESCRIPTION, NUMBERCARDS ) VALUES(?,?,?)',
        'Your relationships','What is happening in your relationships?',2);
        //populate database
        this.db.close();//close database
        */
};

CardData.prototype.getReadingsData = function(){
    this.db = Ti.Database.open('cardDb'); //open database
    //get data
    var rows = this.db.execute('SELECT * FROM READINGS');
    var data = [];
    while(rows.isValidRow()) {
    	
        data.push({
            id: rows.fieldByName("ID"),
            title: rows.fieldByName("TITLE"),
            descrip: rows.fieldByName("DESCRIPTION"), // "description" is a reserved TableView keyword
            numberCards: rows.fieldByName("NUMBERCARDS"),
            card1descrip: rows.fieldByName("CARD1DESCRIP"),
            card2descrip: rows.fieldByName("CARD2DESCRIP"),
            card3descrip: rows.fieldByName("CARD3DESCRIP"),
            card4descrip: rows.fieldByName("CARD4DESCRIP"),
            color: 'black'
        });
        rows.next();
    }
    this.db.close();
    return data; //return data
};

CardData.prototype.getColorGroupsData = function() {
	this.db = Ti.Database.open('cardDb'); //open database
    //get data
    var rows = this.db.execute('SELECT * FROM COLORGROUPS');
    var data = [];
    while(rows.isValidRow()) {
    	
        data.push({
            id: rows.fieldByName("ID"),
            title: rows.fieldByName("GROUPNAME"),
            colorcards: rows.fieldByName("COLOR"),
            descrip: rows.fieldByName("DESCRIPTION"), // "description" is a reserved TableView keyword
            color: 'black' // color is a reserved TableView keyword
        });
        rows.next();
    }
    this.db.close();
    return data; //return data
};

CardData.prototype.getCardsData = function(colorGroupName) {
	this.db = Ti.Database.open('cardDb'); //open database
    //get data
    var rows = this.db.execute('SELECT * FROM CARDS WHERE COLORGROUPNAME = ?', colorGroupName);
    var data = [];
    while(rows.isValidRow()) {
    	
        data.push({
        	cardName: rows.fieldByName("CARDNAME"),
        	cardLoc: rows.fieldByName("IMAGE"),
        	cardLocTransparent: rows.fieldByName("IMAGETRANSPARENT")
        });
        rows.next();
    }
    this.db.close();
    return data; //return data
};


CardData.prototype.getSingleCardData = function(cardName) {
	this.db = Ti.Database.open('cardDb'); //open database
    //get data
    //var rows = this.db.execute('SELECT * FROM CARDSECTIONS WHERE CARDNAME = ? LIMIT 1', cardName);
    var rows = this.db.execute('SELECT * FROM CARDSECTIONS WHERE CARDNAME = ?', cardName);
    var data = [];
    while(rows.isValidRow()) {
    	
        data.push({
            id: rows.fieldByName("ID"),
            title: rows.fieldByName("SECTIONTITLE"),
            content: rows.fieldByName("SECTIONCONTENT"),
            audio: rows.fieldByName("SECTIONAUDIO"),
            color: 'black'
        });
        rows.next();
    }
    this.db.close();
    return data; //return data
};


module.exports = CardData;

