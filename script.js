console.log("hello world");

document.getElementById("button").addEventListener("click", function(e) {
	var variable1 = document.getElementById("vari1").value;
	var variable2 = document.getElementById("vari2").value;
	console.log(variable1);
  	console.log(variable2);
  	var result = parseInt(variable2) + parseInt(variable1);
  	console.log(result);
  	document.getElementById("result").innerHTML = result;
});