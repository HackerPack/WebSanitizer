// content.js
//alert("Hello from your Chrome extension!")
//var firstHref = $("a[href^='http']").eq(0).attr("img");
var srcList = $('img').map(function() {
    return this.src;
}).get();

console.log(srcList);