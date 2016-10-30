// function loadTxtFile(callback) {   
// 	var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", "http://localhost:2000/bad-words.txt/", true);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)

chrome.webRequest.onBeforeRequest.addListener(
       function(details) {
            //alert(details.url);
            var url = details.url;
            if(details.url.indexOf("images")!= -1){
            	//console.log('change url');
                // url = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif";
                url = sendToClarifi(url);
            }
			return {
   				redirectUrl: url
 			};
 		},
       {urls: ["<all_urls>"], types:["image"]},
       ["blocking"]);




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
/*
// var srcList = $('img').get();

// console.log(srcList);

// // setTimeout(function(){
// //     console.log("THIS IS");
// // }, 5000);

// for (var i=0;i<srcList.length;i++) {
// 	console.log(srcList[i]);
// 	sendToClarifi(srcList[i].src);
// }
//sendToClarifi('https://drscdn.500px.org/photo/155841899/q%3D80_m%3D1500/65a62d508837176ed2b6eae08943980d');
console.log('myscripts');

chrome.webRequest.onBeforeRequest.addListener(
       function(details) {
            //alert(details.url);
            var url = details.url;
            console.log(url);
            if(details.url.indexOf("images")!= -1){

            	url = sendToClarifi(url);
                // url = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif (492KB)";
            }
		return {
   			redirectUrl: url
 			};
 		},
       {urls: ["<all_urls>"], types:["image"]},
       ["blocking"]);

*/
function sendToClarifi(link){
  // alert('sendToClarifi');
  alert('FIRST: '+link);
  $.ajax({
  type: "GET",
  //url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  success: function(response){
    if (isProfane(response.results[0].result.tag.classes)){
    	link = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif";
    	// console.log("PROFANE");
    	alert("PROFANE");
    	alert('SECOND: '+link);
    	}
    else{
    	// console.log("NOT PROFANE");
    	alert("NOT PROFANE");
    	link = "http://oi34.tinypic.com/2prcnly.jpg";
    	alert('THIRD: '+link);
    }
  },
  dataType: "json"
});
  alert('FOURTH: '+link);
  return link;
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
