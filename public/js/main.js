$('.upload-btn').on('click',function(){
	$('#upload-input').click();
	$('.progress-bar').text('0%');
	$('.progress-bar').width('0%');
});


$('#upload-input').on('change', function(){

	var files = $(this).get(0).files;

		// One or more files selected, process the file upload
	if (files.length > 0){

		// Create a FormData object which will be sent as 
		// the data payload in the AJAX request
		var formData = new FormData();

		// loop through all the selected files
		for (var i = 0; i < files.length; i++){
			var file = files[i];

			// Add the files to formData object for the data payload
			formData.append('uploads[]', file, file.name)
		}

		$.ajax({
			url: '/upload',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data){
				console.log('Dear user, the upload was successful')
			}			
		});
	}

});


$('#show-image').on('click', function(){
	console.log('I am being clicked');
	$.ajax({
		url: '/images',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			data.forEach(function(img){

				var imgr = document.createElement('img');
				imgr.src = img.url;
				document.getElementById('imagesyu').appendChild(imgr);
				console.log(imgr);	
			})
		}			
	});

});

/** This is what I had from before

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
*/