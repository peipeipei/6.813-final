$(document).ready(function() {

	$('.checkRemove').hide(); 

	$('.received-request').addClass("clicked");
	$('#from-others').addClass("clicked");
	$('.your-request').addClass("not-clicked");
	$('#from-you').addClass("not-clicked");
	$('.critique').addClass("not-clicked");
	$('#your-critiques').addClass("not-clicked");





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