
console.log("oli")
const jsdom = require("jsdom")
const { JSDOM } = jsdom
global.DOMParser = new JSDOM().window.DOMParser
// var parser = new DOMParser();
// var xmlDoc = parser.parseFromString(xml,'text/xml');

// var subtitulo = xmlDoc.getElementsByTagName("coordinates")[0].innerHTML;
// var texto = xmlDoc.getElementsByTagName("html")[0].innerHTML;
// var url = xmlDoc.getElementsByTagName("url")[0].innerHTML;