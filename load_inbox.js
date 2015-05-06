var critiquesRef = new Firebase("https://6813-aperture.firebaseio.com/critiques");

$(document).ready(function(){
	critiquesRef.once("value", function(snapshot){
		console.log(snapshot)
		snapshot.forEach(function(data){
			var critique = data.val();
			createRow(critique.subject, critique.from, critique.time, critique.imageName, data.key());
		})
	})

	$(document).on("click", ".r-request", function(){
		var id = this.id;
		window.location = "message.html?=" + id;
	})

	function createRow(subject, sender, time, image, id){
		var table = '<div class = "r-request" id = "' + id + '"><table><tr><td class="photo"><img src = "photos/' + image + '" style="height:64px;"/></td><td class="user"><p class="username">' + sender + '</p></td><td class="title-tags"><span class="title">' + subject + '</span><p class="tags">focus, lighting, composition</p></td><td class="date">' + time + '</td><td class="delete"><p class="glyphicon glyphicon-remove remove"></p><table class="checkRemove"><tr><td class="yesDelete"><p class="glyphicon glyphicon-trash"></p></td><td class="noDelete"><p class="glyphicon glyphicon-minus"></p></td></tr></table></td></tr></table></div>'

		$(".received-request").append(table)
	}
})