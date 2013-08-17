$(document).ready(function () {
	$( "#pure-blending" ).bind( "click", function() {
	  window.location.href = "pureblending.html"
	});
	
	$( "#pure-blending-double" ).bind( "click", function() {
	  alert( "User clicked on 'pure-blending-double.'" );
	});
});