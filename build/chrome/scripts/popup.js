(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _ext = require("./utils/ext");

var _ext2 = _interopRequireDefault(_ext);

var _storage = require("./utils/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var popup = document.getElementById("app");
_storage2.default.get('color', function (resp) {
  var color = resp.color;
  if (color) {
    popup.style.backgroundColor = color;
  }
});

var template = function template(data) {
  var json = JSON.stringify(data);
  return "\n  <div class=\"site-description\">\n    <h3 class=\"title\">" + data.title + "</h3>\n    <p class=\"description\">" + data.description + "</p>\n    <a href=\"" + data.url + "\" target=\"_blank\" class=\"url\">" + data.url + "</a>\n    <div>" + data.imagesArray + "</div>\n  </div>\n  <div class=\"action-container\">\n    <button data-bookmark='" + json + "' id=\"save-btn\" class=\"btn btn-primary\">Save</button>\n  </div>\n  ";
};
var renderMessage = function renderMessage(message) {
  var displayContainer = document.getElementById("display-container");
  displayContainer.innerHTML = "<p class='message'>" + message + "</p>";
};

var renderBookmark = function renderBookmark(data) {
  var displayContainer = document.getElementById("display-container");
  if (data) {
    var tmpl = template(data);
    displayContainer.innerHTML = tmpl;
  } else {
    renderMessage("Sorry, could not extract this page's title and URL");
  }
};

_ext2.default.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { action: 'process-page' }, renderBookmark);
});

popup.addEventListener("click", function (e) {
  if (e.target && e.target.matches("#save-btn")) {
    e.preventDefault();
    var data = e.target.getAttribute("data-bookmark");
    _ext2.default.runtime.sendMessage({ action: "perform-save", data: data }, function (response) {
      if (response && response.action === "saved") {
        renderMessage("Your bookmark was saved successfully!");
      } else {
        renderMessage("Sorry, there was an error while saving your bookmark.");
      }
    });
  }
});

var optionsLink = document.querySelector(".js-options");
optionsLink.addEventListener("click", function (e) {
  e.preventDefault();
  _ext2.default.tabs.create({ 'url': _ext2.default.extension.getURL('options.html') });
});

},{"./utils/ext":2,"./utils/storage":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

var _ext = require("./ext");

var _ext2 = _interopRequireDefault(_ext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _ext2.default.storage.sync ? _ext2.default.storage.sync : _ext2.default.storage.local;

},{"./ext":2}]},{},[1])

//# sourceMappingURL=popup.js.map
