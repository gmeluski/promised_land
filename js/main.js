require.config({

	paths : {
		"jquery" : "jquery-1.9.0.min"
		
	}
	
});


require(['jquery'], function(template) {

	(function(){
		var twitter;

		twitter = {
			search:function(query) {
				var dfr = $.Deferred();
				var count = 0;

				
				$.ajax({
					url:"http://search.twitter.com/search.json",
					data:{q:query},
					dataType:'jsonp',
					success:dfr.resolve
				 });
				
				return dfr.promise();
			}
		}

		function replaceUrlWithLink(text) {
			var htmlExpression = /(\b(http?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			return text.replace(htmlExpression,"<a target='_blank'  href='$1'>$1</a>"); 
		}

		function replaceTwitterHandleWithLink(text) {
			var handleExpression = /@(\w+)/g;
			return text.replace(handleExpression, "<a target='_blank' href='http://www.twitter.com/$1'>@$1</a>");
				
		}

		function wrapTwitterHandle(text) {

			return  "<a target='_blank' href='http://www.twitter.com/" + text + "'>@" + text +"</a>";
		}
	
		twitter.search('gratitude')
		.progress(function(progress){
		})
		.done(function(data) {
			console.log(data);
		 	var randomNumber=Math.floor(Math.random()*15)
			var selectedTweetInfo = data.results[randomNumber];
			var selectedTweetText = selectedTweetInfo.text;
			var selectedTweetTransformed = replaceTwitterHandleWithLink(replaceUrlWithLink(selectedTweetText));	
			$('.textbox .twitter_text').html(selectedTweetTransformed + "<div class='user_info'> -- " + wrapTwitterHandle(selectedTweetInfo.from_user) + "</div>");
		
		});
	}());


});


