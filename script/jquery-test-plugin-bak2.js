/*

(function($){
    $.fn.extend({ 
        //plugin name - mainContentInit
        marceqeeNonStop: function(options) {
			var defaults = {
				
            };             
            var options = $.extend(defaults, options);
            return this.each(function() {
				var obj = $(this);			
							
			});
		}
	});		
})(jQuery);

*/


(function($) {

$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.remove(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
};
})(jQuery);

(function($){
    $.fn.extend({ 

        genMCQuestion: function(options) {
			var defaults = {
				url: "http://ejje.weblio.jp/content/",
				noOfQuest: 30,      // No of question want to practice now
				noOfChoice:4,      // MC no of options
				noOfQuestPool:420   // must same as the total question array number
				
            };             
            var options = $.extend(defaults, options);
            return this.each(function() {
            	var ctrlObj = $(this).children("div#control-panel");
				var obj = $(this).children("ul#question-section");	
				
				refreshQuestions(options.noOfQuest);
				//refreshQuestions(10);
				
				function refreshQuestions(toDoQuestCount) {
					$(obj).empty();
					
					//var questionList = generateArrayOfRandomInts(options.noOfQuest,options.noOfQuestPool);
					var questionList = generateArrayOfRandomInts(toDoQuestCount,options.noOfQuestPool);
					
					var collectedQuests = getQuestion(options.noOfQuestPool,options.noOfChoice);
					var allQuests = collectedQuests.question;
					var allChoices = collectedQuests.choice;
					
					var qName ="問";
					var iName ="Q";
				
					for (var k=0; k<questionList.length; k++) {
						var i = questionList[k]+1;
						var seq = k + 1;
										
						var qNameSeq = qName + seq.toString();
						var inputName = iName + seq.toString();
						
						var question = $("<li>").data("qName",inputName);
						var questTitle = $("<div class='mondai clearfix'>");
						var href = $("<a target='_blank'>").attr("href",options.url + allQuests[i]).html("「 "+allQuests[i]+" 」");
						$(questTitle).append($("<p>").html(qNameSeq)).append($("<p>").append($(href))).append($("<p class='cfmButton'>").html("正誤"));
						$(question).append($(questTitle));
			
						var eachQuestChoices = allChoices[i];
						var choices = $("<ul class='sentakushi'>");
						
						var choiceValue = "Y";
						for (var j=1; j<5; j++) {
							
							
							var choice = $("<li class='clearfix'>");
							var inputRadio = $("<input type='radio'>").attr("name",inputName).val(choiceValue);
							$(choice).append($(inputRadio)).append($("<p>").html(eachQuestChoices[j]));
							$(choices).append($(choice));
							choiceValue = "N";
						}
						
						$(choices).randomize("li");
						
						$(question).append($(choices));
						$(obj).append($(question));
					}
            	}		
				
				
				$(obj).on("click","li > div > p.cfmButton", function() {
					var qParent =$(this).parent("div").parent("li");
					var whichQ = $(qParent).data("qName");
					
					var checkedChoice = $("input[name='" + whichQ +"']:checked", qParent);
					var rightAns = $(checkedChoice).val();

				if (typeof rightAns === "undefined") {
						alert("Please choose your choice");
						return -1;
						
					}
				
					if (rightAns=="Y") {
						$(checkedChoice).parent("li").css("background-color","rgba(255,255,255, 0.8)");
						$(qParent).css("background-color","rgba(0,255,0, 0.1)");
						

					} else {
						$(checkedChoice).parent("li").parent("ul").children("li").css("background-color","");
						$(qParent).css("background-color","rgba(255,0,0, 0.1)");
						
					}

				});
				
				
				$(ctrlObj).on("click", "p#showall", function() {
					var ansList = $("input[value='Y']", obj);				
					$.each($(ansList), function() {

						$(this).attr("checked","checked");
						$(this).parent("li").css("background-color","rgba(189,167,207, 0.8)");
						$(this).parent("li").parent("ul").parent("li").css("background-color","");
					});
				});
				
				$(ctrlObj).on("click", "p#resetall", function() {
					var ansList = $("input", obj);				
					$.each($(ansList), function() {

						$(this).attr("checked",false);
						$(this).parent("li").css("background-color","");
						$(this).parent("li").parent("ul").parent("li").css("background-color","");
					});
				});
				
				
				$(ctrlObj).on("click", "p#refreshall", function() {
					//
					var cntInput = $(this).parent("div").children("input").val();
					
					if (cntInput == null || cntInput =="") {
						alert("Please input count");
						return -1;
					}
					
					var cnt = parseInt(cntInput);
					
					
					if ( cnt > options.noOfQuestPool) {
						alert("Cannot greater than the max no of questions :" + options.noOfQuestPool.toString());
						return -1;
					}
					

					
					refreshQuestions(cnt);
					
					//alert(cnt);
				});
				
			
				
				
				
				
							
			});
		}
	});		
})(jQuery);

