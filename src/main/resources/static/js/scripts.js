String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};

$(".answer-write input[type='submit']").click(addAnswer);

$(".answer-delete button[type='submit']").click(deleteAnswer);

function deleteAnswer(e){
	console.log("click delete!");
	e.preventDefault();
	
	var url = $(".answer-delete").attr("action");
	console.log("url :"+ url);
	
	var queryString = $(".answer-delete");
	console.log("queryString :"+ queryString);
	
	$.ajax({
		type :'get',
		url : url,
		data : queryString,
		dataType : 'json',
		error : function(){
			console.log('fail');
		},
		success:function(data){
			console.log('data : ' , data);
		}
	});
}

function addAnswer(e){
	console.log("click answer!");
	e.preventDefault();
	
	var url = $(".answer-write").attr("action");
	console.log("url :"+ url);
	
	var queryString = $(".answer-write").serialize();
	console.log("queryString :"+ queryString);
	
	$.ajax({
		type :'post',
		url : url,
		data : queryString,
		dataType : 'json',
		error : function(){
			console.log('fail');
		},
		success:function(data){
			console.log('data : ' , data);
			var answerTemplate = $("#answerTemplate").html();
			var template = answerTemplate.format(data.writer.userId, data.formattedCreateDate, data.contents, data.question.id, data.id);
			$(".qna-comment-slipp-articles").prepend(template);
			$("textarea[name=contents]").val("");
		}
	});
}


