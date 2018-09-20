/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/demo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/demo.js":
/*!************************!*\
  !*** ./src/js/demo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mediaCheck = __webpack_require__(/*! ./mediaCheck */ \"./src/js/mediaCheck.js\");\n\nvar _mediaCheck2 = _interopRequireDefault(_mediaCheck);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar test = document.querySelector('#test');\n\n(0, _mediaCheck2.default)({\n  media: '(max-width: 420px)',\n  entry: function entry() {\n    console.log('starting 420');\n  },\n  exit: function exit() {\n    console.log('leaving 420');\n  }\n});\n\n(0, _mediaCheck2.default)({\n  media: '(max-width: 600px)',\n  entry: function entry() {\n    test.innerHTML = 'This is a smaller screen.';\n  },\n  exit: function exit() {\n    test.innerHTML = 'This is a larger screen.';\n  }\n});\n\n(0, _mediaCheck2.default)({\n  media: '(max-width: 40em)',\n  entry: function entry() {\n    console.log('starting 40em');\n  },\n  exit: function exit() {\n    console.log('leaving 40em');\n  }\n});\n\n(0, _mediaCheck2.default)({\n  media: '(max-width: 50em)',\n  both: function both() {\n    console.log('starting or ending 50em');\n  }\n});\n\n//# sourceURL=webpack:///./src/js/demo.js?");

/***/ }),

/***/ "./src/js/mediaCheck.js":
/*!******************************!*\
  !*** ./src/js/mediaCheck.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar mqChange = function mqChange(mq, options) {\n  if (mq.matches) {\n    if (typeof options.entry === \"function\") {\n      options.entry(mq);\n    }\n  } else {\n    if (typeof options.exit === \"function\") {\n      options.exit(mq);\n    }\n  }\n  if (typeof options.both === \"function\") {\n    return options.both(mq);\n  }\n};\n\nvar mediaCheck = function mediaCheck(options) {\n  if (typeof window === 'undefined') return null;\n\n  var mq = window.matchMedia(options.media);\n\n  mq.addListener(function () {\n    return mqChange(mq, options);\n  });\n\n  window.addEventListener(\"orientationchange\", function () {\n    var orientationMQ = window.matchMedia(options.media);\n    return mqChange(orientationMQ, options);\n  }, false);\n\n  return mqChange(mq, options);\n};\n\nexports.default = mediaCheck;\nexports.mqChange = mqChange;\n\n//# sourceURL=webpack:///./src/js/mediaCheck.js?");

/***/ })

/******/ });