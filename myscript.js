function loadTxtFile(callback) {   
	var rawFile = new XMLHttpRequest();
	//rawFile.overrideMimeType("application/txt");
    rawFile.open("GET", "https://raw.githubusercontent.com/ShashwathKumar/WebSanitizer/master/bad-words.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState == 4 && rawFile.status == "200")
        {
            var text = rawFile.responseText;
            callback(rawFile.responseText);
        }
    }

    rawFile.send(null);
}  


var badDict = {};
var badwords = {};
loadTxtFile(function (text) {
	badwords = text.split('\n');
	for (var i=0; i<badwords.length; i++) {
	badDict[badwords[i]] = true;
	}
	console.log(badDict);
});
//var badWords = text.split("\n");

var srcList = $('img').get();

console.log(srcList);

// setTimeout(function(){
//     console.log("THIS IS");
// }, 5000);

for (var i=0;i<srcList.length;i++) {
	//console.log(srcList[i]);
	sendToClarifi(srcList[i].src);
}
//sendToClarifi('https://drscdn.500px.org/photo/155841899/q%3D80_m%3D1500/65a62d508837176ed2b6eae08943980d');

function sendToClarifi(link){
  $.ajax({
  type: "GET",
  //url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  success: function(response){
  	//console.log(response.results[0].result.tag.classes);
    if (isProfane(response.results[0].result.tag.classes)){
    	console.log("PROFANE");
    	console.log(link);
    }
    else
    	console.log("NOT PROFANE")
  },
  dataType: "json"
});

}

function isProfane(tagList) {
	count = 0;
	for (i=0;i<tagList.length;i++){
		if (badDict[tagList[i]]){
			count += 1;
			if (count >= 3)
				return true;
		}
	}
	return false;
}

