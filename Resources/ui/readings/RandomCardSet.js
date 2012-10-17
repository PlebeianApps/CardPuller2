/**
 * @author Vui Nguyen
 */
function RandomCardSet(numCardsPulled)
{
	var shuffleSound = Ti.Media.createSound({
				url: '/audio/CardShuffle.mp3',
				preload: true,
				looping: false,
				//allowBackground: true
		});
	var flipSound = Ti.Media.createSound({
				url: '/audio/Xylo.mp3',
				preload: true
		});
	shuffleSound.play();
	flipSound.play();
	
	var CardData = require('db/CardData');
	var cardData = new CardData();
	var deckSize = cardData.getDeckSize();
	var cardSet = [];
	
	var deck = [];
	// We have to start i at 1 because the lowest
	// index in the Cards table starts at 1
	// and end through the last index
	for (var i = 1; i <= deckSize; i++)  
	{
       deck[i] = i;
       //Ti.API.info('Deck[' + i + ']: ' + i);
	}
	
	function randomCard(maxNumber)
	{
		// this will select a random number from 1 through the current deck size
		// ceil() function ensures that 0 will never be selected
		var randomNumber = Math.ceil(Math.random()*maxNumber);
		// this checks to make sure we don't grab an index that doesn't exist in the Cards table
		while (cardData.isIdValid(randomNumber) === 0)
		{
			randomNumber = Math.ceil(Math.random()*maxNumber); 
		}
		//var randomNumber = Math.floor(Math.random()*maxNumber);
		//var randomNumber = Math.round(Math.random()*maxNumber);
		return randomNumber;
	}
	
	//var largestIndex = deckSize;
	var randomNum;
	var largestIndex = deck.length - 1; // This is weird, but the array always starts at the 
	                                    // index 0 even if it's undefined, so subtract one
	                                    // if the real values start at index 1
	for (var i = 0; i < numCardsPulled; i++)
	{
			randomNum = randomCard(largestIndex);
			Ti.API.info('length of deck BEFORE is ' + largestIndex);
			Ti.API.info('Random Card is: ' + randomNum + '\n');
			Ti.API.info('VALUE AT RANDOM CARD INDEX IS                  ' + deck[randomNum] + '\n');
			cardSet.push(deck[randomNum]);
			deck.splice(randomNum, 1);
			largestIndex = largestIndex - 1;
			Ti.API.info('length of data AFTER is ' + largestIndex);
			Ti.API.info("\n");
	}
	
	for (var i = 0; i < cardSet.length; i++)
	{
		Ti.API.info('cardSet[' + i + ']: ' + cardSet[i]);
	}
	return cardSet;
};

module.exports = RandomCardSet;
