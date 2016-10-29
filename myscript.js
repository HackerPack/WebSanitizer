
sendToClarifi('https://drscdn.500px.org/photo/155841899/q%3D80_m%3D1500/65a62d508837176ed2b6eae08943980d');

function sendToClarifi(link){
  $.ajax({
  type: "GET",
  url: "https://api.clarifai.com/v1/tag/?url=" + link+'&access_token=3MdWoUytY3a3QuXxdBl7oRkwqyql7A',
  success: function(response){
    console.log(response.results[0].result.tag.classes);  
  },
  dataType: "json"
});
}

