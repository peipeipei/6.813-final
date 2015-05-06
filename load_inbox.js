var critiquesRef = new Firebase("https://6813-aperture.firebaseio.com/critiques");

var receivedRef = new Firebase("https://6813-aperture.firebaseio.com/received_critiques");

$(document).ready(function(){
	
	receivedRef.once("value", function(snapshot){
		snapshot.forEach(function(data){
			var critique = data.val();
			createRow2(critique.subject, critique.from, critique.time, critique.imageName, data.key());
		})

		critiquesRef.once("value", function(snapshot){
			snapshot.forEach(function(data){
				var critique = data.val();
				createRow(critique.subject, critique.to, critique.time, critique.imageName, data.key());
			})
		})
	})

	$(document).on("click", ".r-request", function(){
		var id = this.id;
		window.location = "message.html?q=" + id;
	})

	$(document).on("click", ".y-request", function(){
		var id = this.id;
		window.location = "message-received.html?q=" + id;
	})

	function createRow(subject, sender, time, image, id){
		var timestring = ""
		var date = new Date();
		var n = date.toDateString();

		var parts = time.split(" ");
		var dayparts = parts.slice(0, 4);
		var timeparts = parts.slice(4, 6);

		day = dayparts.join(" ");
		time = timeparts.join(" ");

		if (n === day){
			timestring = time;
		}
		else {
			timestring = day;
		}

		var table = '<div class = "r-request" id = "' + id + '"><table><tr><td class="photo"><img src = "photos/' + image + '" style="height:64px;"/></td><td class="user"><p class="username">' + sender + '</p></td><td class="title-tags"><span class="title">' + subject + '</span></td><td class="date">' + timestring + '</td><td class="delete" style= "z-index:10"><p class="glyphicon glyphicon-remove remove"></p><table class="checkRemove"><tr><td class="yesDelete"><p class="glyphicon glyphicon-trash"></p></td><td class="noDelete"><p class="glyphicon glyphicon-minus"></p></td></tr></table></td></tr></table></div>'

		$(".your-request").append(table)
		$('.checkRemove').hide(); 
	}

	function createRow2(subject, sender, time, image, id){
		var timestring = ""
		var date = new Date();
		var n = date.toDateString();

		var parts = time.split(" ");
		var dayparts = parts.slice(0, 4);
		var timeparts = parts.slice(4, 6);

		day = dayparts.join(" ");
		time = timeparts.join(" ");

		if (n === day){
			timestring = time;
		}
		else {
			timestring = day;
		}

		var table = '<div class = "y-request" id = "' + id + '"><table><tr><td class="photo"><img src = "photos/' + image + '" style="height:64px;"/></td><td class="user"><p class="username">' + sender + '</p></td><td class="title-tags"><span class="title">' + subject + '</span></td><td class="date">' + timestring + '</td></tr></table></div>'

		$(".received-request").append(table)
		$('.checkRemove').hide(); 
	}
})