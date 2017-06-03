import ext from "./utils/ext";
//import zlib from "../../node_modules/png-js/zlib.js"
//import blockhash from "./blockhash.js"

//var blockhash = require('blockhash');
//var Buffer = require('buffer/').Buffer;
//var Jimp = require("jimp");

var extractTags = function (sendResponse) {
  var url = document.location.href;
  if(!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href,
    imagesArray: []
  }

  var ogTitle = document.querySelector("meta[property='og:title']");
  if(ogTitle) {
    data.title = ogTitle.getAttribute("content")
  } else {
    data.title = document.title
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']")
  if(descriptionTag) {
    data.description = descriptionTag.getAttribute("content")
  }

  var imagesArray = document.getElementsByTagName("img");
  /*if(imagesArray.length>0) {
    data.imagesArray = imagesArray[0].src;
  }*/
  if(imagesArray.length > 0) {
    for (var i = 0; i < imagesArray.length; i++) {        
        data.imagesArray.push({
          'url':imagesArray[i].src,
          'hash': 123
        });      
    }
  }

  //data.imagesArray = imagesArray[0].src;
  sendResponse(data);
  //console.log(imagesArray[0].src);
  /*Jimp.read(imagesArray[0].src, function (err, image) {
    data.hash = image.hash();
    data.imagesArray = imagesArray[0].src;
    sendResponse(data);
      // do stuff with the image (if no exception)
  });*/

  //return data;
}

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    extractTags(sendResponse);

    //sendResponse(extractTags())
  }
}

ext.runtime.onMessage.addListener(onRequest);