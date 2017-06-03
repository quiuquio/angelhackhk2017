(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import zlib from "../../node_modules/png-js/zlib.js"
//import blockhash from "./blockhash.js"

//var blockhash = require('blockhash');
//var Buffer = require('buffer/').Buffer;
//var Jimp = require("jimp");

var extractTags = function extractTags(sendResponse) {
  var url = document.location.href;
  if (!url || !url.match(/^http/)) return;

  var data = {
    title: "",
    description: "",
    url: document.location.href,
    imagesArray: []
  };

  var ogTitle = document.querySelector("meta[property='og:title']");
  if (ogTitle) {
    data.title = ogTitle.getAttribute("content");
  } else {
    data.title = document.title;
  }

  var descriptionTag = document.querySelector("meta[property='og:description']") || document.querySelector("meta[name='description']");
  if (descriptionTag) {
    data.description = descriptionTag.getAttribute("content");
  }

  var imagesArray = document.getElementsByTagName("img");
  /*if(imagesArray.length>0) {
    data.imagesArray = imagesArray[0].src;
  }*/
  if (imagesArray.length > 0) {
    for (var i = 0; i < imagesArray.length; i++) {
      data.imagesArray.push({
        'url': imagesArray[i].src,
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
};

function onRequest(request, sender, sendResponse) {
  if (request.action === 'process-page') {
    extractTags(sendResponse);

    //sendResponse(extractTags())
  }
}

_ext2.default.runtime.onMessage.addListener(onRequest);

},{"./utils/ext":2}],2:[function(require,module,exports){
'use strict';

var apis = ['alarms', 'bookmarks', 'browserAction', 'commands', 'contextMenus', 'cookies', 'downloads', 'events', 'extension', 'extensionTypes', 'history', 'i18n', 'idle', 'notifications', 'pageAction', 'runtime', 'storage', 'tabs', 'webNavigation', 'webRequest', 'windows'];

function Extension() {
  var _this = this;

  apis.forEach(function (api) {

    _this[api] = null;

    try {
      if (chrome[api]) {
        _this[api] = chrome[api];
      }
    } catch (e) {}

    try {
      if (window[api]) {
        _this[api] = window[api];
      }
    } catch (e) {}

    try {
      if (browser[api]) {
        _this[api] = browser[api];
      }
    } catch (e) {}
    try {
      _this.api = browser.extension[api];
    } catch (e) {}
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {}

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {}
}

module.exports = new Extension();

},{}]},{},[1])

//# sourceMappingURL=contentscript.js.map
