(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tvcss", [], factory);
	else if(typeof exports === 'object')
		exports["tvcss"] = factory();
	else
		root["tvcss"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var tvcss = window.tvcss || {};
	
	if (!window.tvcss) {
	  tvcss.init = function () {
	    var dpr = window.devicePixelRatio || 1;
	    var minWidth = 0;
	    var maxWidth = 0;
	    var designWidth = 0;
	
	    dpr = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1;
	
	    var eTvcss = document.querySelector('meta[name="tvcss"]');
	    if (eTvcss) {
	      var config = eTvcss.getAttribute('content');
	      if (config) {
	        var _initialDpr = config.match(/initial\-dpr=([\d\.]+)/);
	        if (_initialDpr) {
	          dpr = parseFloat(_initialDpr[1]);
	        }
	
	        var _minWidth = config.match(/min\-width=([\d\.]+)/);
	        if (_minWidth) {
	          minWidth = parseFloat(_minWidth[1]);
	        }
	
	        var _maxWidth = config.match(/max\-width=([\d\.]+)/);
	        if (_maxWidth) {
	          maxWidth = parseFloat(_maxWidth[1]);
	        }
	
	        var _designWidth = config.match(/design\-width=([\d\.]+)/);
	        if (_designWidth) {
	          designWidth = parseFloat(_designWidth[1]);
	        }
	      }
	    }
	
	    document.documentElement.setAttribute('data-dpr', dpr);
	    tvcss.dpr = dpr;
	
	    if (minWidth) {
	      document.documentElement.setAttribute('min-width', minWidth);
	    }
	    tvcss.minWidth = minWidth;
	
	    if (maxWidth) {
	      document.documentElement.setAttribute('max-width', maxWidth);
	    }
	    tvcss.maxWidth = maxWidth;
	
	    if (designWidth) {
	      document.documentElement.setAttribute('design-width', designWidth);
	    }
	    tvcss.designWidth = designWidth;
	
	    var scale = 1 / dpr;
	    var content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no, minimal-ui';
	
	    var eViewport = document.querySelector('meta[name="viewport"]');
	    if (eViewport) {
	      eViewport.setAttribute('content', content);
	    } else {
	      eViewport = document.createElement('meta');
	      eViewport.setAttribute('name', 'viewport');
	      eViewport.setAttribute('content', content);
	      document.head.appendChild(eViewport);
	    }
	  };
	
	  tvcss.px2rem = function (px, designWidth) {
	    if (!designWidth) {
	      designWidth = parseInt(tvcss.designWidth, 10);
	    }
	    return parseInt(px, 10) * 320 / designWidth / 20;
	  };
	
	  tvcss.rem2px = function (rem, designWidth) {
	    if (!designWidth) {
	      designWidth = parseInt(tvcss.designWidth, 10);
	    }
	    return parseFloat(rem) * 20 * designWidth / 320;
	  };
	
	  tvcss.resize = function () {
	    var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
	
	    if (tvcss.maxWidth && innerWidth / tvcss.dpr > tvcss.maxWidth) {
	      innerWidth = tvcss.maxWidth * tvcss.dpr;
	    } else if (tvcss.minWidth && innerWidth / tvcss.dpr < tvcss.minWidth) {
	      innerWidth = tvcss.minWidth * tvcss.dpr;
	    }
	
	    if (!innerWidth) {
	      return false;
	    }
	
	    var docStyle = document.documentElement.style;
	    var fontSize = innerWidth * 20 / 320 + 'px';
	
	    if (!docStyle.fontSize || docStyle.fontSize !== fontSize) {
	      docStyle.fontSize = fontSize;
	      tvcss.callback && tvcss.callback();
	    }
	  };
	
	  tvcss.update = function (e) {
	    window.clearTimeout(tvcss.tid);
	    tvcss.tid = window.setTimeout(tvcss.resize, 33);
	  };
	
	  tvcss.destroy = function () {};
	
	  tvcss.init();
	
	  window.addEventListener('pageshow', function (e) {
	    if (e.persisted) {
	      tvcss.update();
	    }
	  }, false);
	
	  window.addEventListener('resize', tvcss.update, false);
	  window.addEventListener('load', tvcss.resize, false);
	
	  if (document.readyState === 'complete') {
	    tvcss.resize();
	  } else {
	    document.addEventListener('DOMContentLoaded', tvcss.resize, false);
	  }
	
	  tvcss.tid = window.setTimeout(tvcss.resize, 333);
	
	  window.tvcss = tvcss;
	}
	
	exports.default = tvcss;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=tvcss.js.map