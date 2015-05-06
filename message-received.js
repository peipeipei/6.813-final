var drawable = false;
var current_id = 0;
var this_id = 0;
var id_list = [];
var deleted = [];
var editing = false;

$(document).ready(function(){
	// Prevent Backspace from going back since we use it for deleting
	$(document).keydown(function (e) {
		if (e.keyCode == 8 && !$(e.target).is("input, textarea")) {
			e.preventDefault();
		}
	});
	
	$("#loading").modal("show");

    var critiqueID = getQueryVariable("q")
    console.log(critiqueID)

    var critiqueRef = new Firebase("https://6813-aperture.firebaseio.com/received_critiques/" + critiqueID);
    var annotationsRef = new Firebase("https://6813-aperture.firebaseio.com/" + critiqueID + "/annotations");
    var commentsRef = new Firebase("https://6813-aperture.firebaseio.com/" + critiqueID + "/comments");

	// display tooltip for instructions
	$('[data-toggle="tooltip"]').tooltip({
		placement : 'bottom'
	});
	
    critiqueRef.once("value", function(snapshot) {
        var critique = snapshot.val();
        console.log(critique)
        var subject = critique.subject;
        var imgName = critique.imageName;
        var username = critique.from;
        var message = critique.message;

        $("#subject").append(subject);
        $("#photo").attr("src", "photos/" + imgName);
        $("#from").append(username);
        $("#title").append(subject);
        $("#comments_list").append(message);

        // display all annotations and circles in firebase table
        annotationsRef.once("value", function(snapshot) {
            snapshot.forEach(function(data) {
                var annotation = data.val();
            
                // create new div for different groups
                if (annotation.currentID != current_id){
                    current_id = annotation.currentID;
                    this_id++;
                    var div = document.createElement("div");
                    div.id = "div_" + current_id;
                    div.className = "circle-group";
                    $("#photo-wrapper").append(div);
                }
            
                var circleObject = saveCircle(annotation.originX, annotation.originY, annotation.radius, data.key(), "div_" + current_id);
                setCircleInactive(circleObject);
            });

            commentsRef.once("value", function(snapshot){
                snapshot.forEach(function(data){
                    var comment = data.val();
                    var c = getComment("comment_" + comment.currentID, comment.text);
                    $("#comments").append(c);
                });
            });
			$("#loading").modal("hide");
        });
    });
	
	// From: https://css-tricks.com/snippets/javascript/get-url-variables/
    function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }

	// generate html for a comment
	function getComment(commentID, msg){
		var comment = document.createElement("div");
		$(comment).addClass("comment");
		comment.id = commentID;
		$(comment).append(msg);
		
		return $(comment);
	}
	
	// activate comment that is clicked on or hovered and deactivate others
	function activate2(id){
		console.log("Activating " + id);
		
		$(".comment").each(function(i, obj){
			var comment_id = obj.id.substring(8);
			
			// activate comment and circles
			if (id === comment_id){
				$("#comment_" + id).addClass("active");
				
				$("#div_" + id).children().each(function (){
					$(this).removeClass("inactive");
					$(this).addClass("circle");
				})
				
				$("#div_" + id).css("z-index", "100");
			}
			//deactivate all other comments
			else {
				$("#comment_" + comment_id).removeClass("active");
				
				$("#div_" + comment_id).children().each(function (){
					setCircleInactive($(this));
				});
				
				$("#div_" + comment_id).css("z-index", "50");
			}
		});
	}
	
	$(document).on("click", ".comment", function(){
		if (!editing){
			var id = this.id.substring(8)
			activate2(id);
		}
	});
	
	$("#send_message").on("click", function(){
		var date = new Date();
		var n = date.toDateString();
		var time = date.toLocaleTimeString();
		var timestamp = n + " " + time;
		
		critiqueRef.update({time: timestamp});
		window.location = "inbox.html";
	});
});