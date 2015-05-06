$(document).ready(function() {

	$('.checkRemove').hide(); 

	$('.received-request').addClass("clicked");
	$('#received-request').addClass("clicked");
	$('.your-request').addClass("not-clicked");
	$('#your-request').addClass("not-clicked");
	$('.critique').addClass("not-clicked");
	$('#critique').addClass("not-clicked");

	$('.your-request').hide();
	$('.critique').hide();

	$(".tab.not-clicked").click(function(){
		console.log("CLICK");

		var previousClicked_tab = $('.tab.clicked');
		var previousClicked_div = $('.tab-div.clicked');
		var name = $(this).attr("id");
		previousClicked_tab.addClass("not-clicked").removeClass("clicked");
		previousClicked_div.addClass("not-clicked").removeClass("clicked");
		previousClicked_div.hide();
		$(this).addClass("clicked").removeClass("not-clicked");
		$("." + name).addClass("clicked").removeClass("not-clicked");
		$("." + name).show();
	});




	$(".remove").click(function() {
		$(this).hide();   
		var check = $(this).parent('.delete').children('.checkRemove');
		$(check).slideToggle(500);
	});
	$(".yesDelete").click(function(){
		$(this).closest('.r-request').hide();
	});
	$(".noDelete").click(function(){
		$(this).closest('.checkRemove').hide();
		$(this).closest('.delete').children('.remove').show();
	});
});

