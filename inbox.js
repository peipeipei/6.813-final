$(document).ready(function() {

	// $('.checkRemove').hide(); 

	$('.received-request').addClass("clicked");
	$('#received-request').addClass("clicked");
	$('.your-request').addClass("not-clicked");
	$('#your-request').addClass("not-clicked");
	$('.critique').addClass("not-clicked");
	$('#critique').addClass("not-clicked");

	$('.your-request').hide();
	$('.critique').hide();

	$(document).on("click", ".tab.not-clicked", function(){
		$("#loading").modal("show");	
		console.log("CLICK");

		var previousClicked_tab = $('.tab.clicked');

		console.log(previousClicked_tab)
		var previousClicked_div = $('.tab-div.clicked');
		var name = $(this).attr("id");
		previousClicked_tab.addClass("not-clicked").removeClass("clicked");
		previousClicked_div.addClass("not-clicked").removeClass("clicked");
		previousClicked_div.hide();
		$(this).addClass("clicked").removeClass("not-clicked");
		$("." + name).addClass("clicked").removeClass("not-clicked");
		$("." + name).show();
		$("#loading").modal("hide");

	});

	$(document).on("click", ".remove", function(event){
		event.stopPropagation();
		var x = window.confirm("Are you sure you want to delete?");
		if (x){
			$(this).closest(".r-request").remove();
			var id = $(this).closest(".r-request").attr("id");

			var critiqueInfoRef = new Firebase("https://6813-aperture.firebaseio.com/critiques/" + id);
			critiqueInfoRef.remove();

			var critiqueRef = new Firebase("https://6813-aperture.firebaseio.com/" + id);
			critiqueRef.remove();

		}
		else{
		}
	});

	// $(document).on("click", ".remove", function(){
	// 	$(this).hide();   
	// 	var check = $(this).parent('.delete').children('.checkRemove');
	// 	$(check).slideToggle(500);
	// });
	// $(document).on("click", ".yesDelete", function(){
	// 	$(this).closest('.r-request').hide();
	// });
	// $(document).on("click", ".noDelete", function(){
	// 	$(this).closest('.checkRemove').hide();
	// 	$(this).closest('.delete').children('.remove').show();
	// });
});
