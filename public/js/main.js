$(function() {
	$("input:file").change(function (){
		var fileName = $(this).val();
		console.log(fileName);
		 $.ajax({
			url: '/file',
			type: 'POST',
			// contentType: 'application/json',
			data: {'fileName': fileName},
			success: function( data, textStatus, jQxhr ){
				console.log(data.message);
			},
			error: function( jqXhr, textStatus, errorThrown ){
				console.log( errorThrown );
			}
		});
	});
});