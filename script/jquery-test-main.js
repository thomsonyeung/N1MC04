$(document).ready(function(){
	
	
	
	//$("#question-section").genMCQuestion();
	
	$("#wrapper-main").genMCQuestion();
	
	var collectedQuests = getQuestion(6,4);
	var allQuests = collectedQuests.question;
	var allChoices = collectedQuests.choice;
	
	
/*
	for (var i=1; i<= allQuests.length; i++) {
		
		alert(allQuests[i]);
		var eachQuestChoices = allChoices[i];
		
	//	alert(eachQuestChoices.length);
		
	//	for (var j=1; j<eachQuestChoices.length; j++) {
		for (var j=1; j<5; j++) {
			alert(eachQuestChoices[j]);
		}
		
		
	}
	
*/	

});

