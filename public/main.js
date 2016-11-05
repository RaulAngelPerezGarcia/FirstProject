$('.upload-btn').on('click',function(){
	$('#upload-input').click();
	$('.progress-bar').text('0%');
	$('.progress-bar').width('0%');
});


$('#upload-input').on('change', function(){

	var file = $(this).get(0).files[0];

	$.ajax({
		url: '/sign',
		type: 'GET',
		data: {
			"file_name": file.name,
			"file_type": file.type
		},
		success: function(data){
			console.log('Dear user, the upload was a successful')
			uploadToS3(data, file);
		}			
	});
//Before I had it here
}); 

var uploadToS3 = function(s3Info, file){
	console.log(s3Info)
	console.log(file)
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", s3Info.signed_request);
	xhr.setRequestHeader('x-amz-acl', 'public-read');
//	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
       	console.log(s3Info.url)
		   var imgr = document.createElement('img');
			imgr.src = 'https://s3-eu-west-1.amazonaws.com/yourolderself/' + file.name;
			document.getElementById('imagesyu').appendChild(imgr);
			console.log(imgr);
      }
      else{
        alert('Could not upload file.');
      }
    }
	}

	xhr.send(file);
};


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





	/** what i had before
	$.ajax({
		url: '/upload',
		type: 'POST',
		data: formData,
		processData: false,
		contentType: false,
		success: function(data){
			console.log('Dear user, the upload was successful')
		}			
	});*/		