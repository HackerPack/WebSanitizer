chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
			console.log(details.url);
			var url = details.url;
			if((details.url.indexOf("images")!= -1 || details.url.indexOf("jpg")!= -1 || details.url.indexOf("png")!= -1) && sendToClarifi(url)){
				console.log("URL22");
				url = "https://38.media.tumblr.com/tumblr_ldbj01lZiP1qe0eclo1_500.gif";
			}
return {
    redirectUrl: url
  };        },
        {urls: ["<all_urls>"], types:["image"]},
        ["blocking"]);
var badDict = {};
var badwords = {};

 chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
			var referer = ""; var accept = ""; var host ="";
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'Accept') {
				accept = details.requestHeaders[i].value;
            }else if (details.requestHeaders[i].name === 'Referer') {
				referer = details.requestHeaders[i].value;
            }else if (details.requestHeaders[i].name === 'Host') {
				host = details.requestHeaders[i].value;
            }
          }
		  
		  if(accept.indexOf("text/html")!=-1 && referer.split('/')[2]==host.split('/')[2]){
			  console.log("in header");
			  loadTxtFile(function (text) {
				badwords = text.split('\n');
				for (var i=0; i<badwords.length; i++) {
				badDict[badwords[i]] = true;
			}
			console.log(badDict);
			});
		  }
			  
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);
		

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




//var badWords = text.split("\n");

/*var srcList = $('img').get();

console.log(srcList);*/

// setTimeout(function(){
//     console.log("THIS IS");
// }, 5000);

/*for (var i=0;i<srcList.length;i++) {
	//console.log(srcList[i]);
	sendToClarifi(srcList[i].src);
}*/
//sendToClarifi('https://drscdn.500px.org/photo/155841899/q%3D80_m%3D1500/65a62d508837176ed2b6eae08943980d');

function sendToClarifi(link){
	var isProfane = false;
	alert("send to clarifi"+link);
	alert("https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=6ySEYd0L0ejNFp6i1ycNo9swvP04T4');
  $.ajax({
  type: "GET",
  //url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=6ySEYd0L0ejNFp6i1ycNo9swvP04T4',
  success: function(response){
  	//console.log(response.results[0].result.tag.classes);
	alert(response.results[0].result.tag.classes);
    if (isProfane(response.results[0].result.tag.classes)){
    	console.log("PROFANE");
    	console.log(link);
		isProfane = true;
    }
    else
    	console.log("NOT PROFANE")
  },
  error: function(response){
  	//console.log(response.results[0].result.tag.classes);
	
		alert(response.results[0].result.tag.classes);
    if (isProfane(response.results[0].result.tag.classes)){
		alert("true");
    	console.log("PROFANE");
    	console.log(link);
		isProfane = true;
    }
    else
    	console.log("NOT PROFANE")
	
  },
  dataType: "json",
  cache: false
});

return isProfane;
}

function isProfane(tagList) {
	count = 0;
	for (i=0;i<tagList.length;i++){
		if (badDict[tagList[i]]){
			count += 1;
			if (count >= 1)
				return true;
		}
	}
	return false;
}

