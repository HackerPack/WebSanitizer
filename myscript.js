// function loadTxtFile(callback) {   
// 	var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", "http://localhost:2000/bad-words.txt/", true);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             var text = rawFile.responseText;
//         }
//     }

//     rawFile.send();
// }  

// var badwords = {}
// loadTxtFile(function (text) {
// 	console.log(text)
// })
//var badWords = text.split("\n");

var badDict = {}
for (var i=0; i<badWords.length; i++) {
	badDict[badWords[i]] = true;
}

var srcList = $('img').get();

console.log(srcList);

// setTimeout(function(){
//     console.log("THIS IS");
// }, 5000);

for (var i=0;i<srcList.length;i++) {
	console.log(srcList[i]);
	sendToClarifi(srcList[i].src);
}
//sendToClarifi('https://drscdn.500px.org/photo/155841899/q%3D80_m%3D1500/65a62d508837176ed2b6eae08943980d');

function sendToClarifi(link){
  $.ajax({
  type: "GET",
  //url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  success: function(response){
    if (isProfane(response.results[0].result.tag.classes))
    	console.log("PROFANE");
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

