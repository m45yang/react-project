/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Array.prototype.equals = function (array, strict) {
		if (!array) return false;

		if (arguments.length == 1) strict = true;

		if (this.length != array.length) return false;

		for (var i = 0; i < this.length; i++) {
			if (this[i] instanceof Array && array[i] instanceof Array) {
				if (!this[i].equals(array[i], strict)) return false;
			} else if (strict && this[i] != array[i]) {
				return false;
			} else if (!strict) {
				return this.sort().equals(array.sort(), true);
			}
		}
		return true;
	};

	__webpack_require__(1);
	var Map = __webpack_require__(5);
	var InputForm = __webpack_require__(6);
	var People = __webpack_require__(7);

	var App = React.createClass({
		displayName: 'App',

		getInitialState: function () {
			return {
				mapCoords: {
					// I suppose Paris is a good default location
					lat: 48.856614,
					lng: 2.3522219
				},
				timeInterval: 2000,
				data: [],
				idList: [],
				bounds: []
			};
		},

		checkBounds: function (person, sw_lat, sw_lng, ne_lat, ne_lng) {
			if (person.lat <= ne_lat && person.lat > sw_lat && person.lng < ne_lng && person.lng > sw_lng) {
				return true;
			}
			return false;
		},

		updateDisplayData: function (bounds, data) {
			var newData = [];
			var newIDList = [];
			for (var i = 0; i < data.length; i++) {
				if (this.checkBounds(data[i], bounds.sw_lat, bounds.sw_lng, bounds.ne_lat, bounds.ne_lng)) {
					newData.push(data[i]);
					newIDList.push(data[i].id);
				}
			}
			// reset data to contain only people within bounds
			this.setState({ data: newData, idList: newIDList, bounds: bounds });
		},

		handlePersonSubmit: function (person) {
			var self = this;
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: person,
				success: function (data) {
					self.updateDisplayData(this.state.bounds, data);
				}.bind(this),
				error: function (xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		},

		loadPeopleFromServer: function (bounds) {
			var self = this;
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				success: function (data) {
					self.updateDisplayData(bounds, data);
				}.bind(this),
				error: function (xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}.bind(this)
			});
		},

		render: function () {
			return React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(Map, { idList: this.state.idList, data: this.state.data, lat: this.state.mapCoords.lat, lng: this.state.mapCoords.lng, handleBoundChange: this.loadPeopleFromServer }),
				React.createElement(
					'div',
					{ className: 'col-xs-8', id: 'left' },
					React.createElement(
						'h2',
						null,
						'Dynamic map search using ReactJS'
					),
					React.createElement(People, { data: this.state.data }),
					React.createElement(InputForm, { onPersonSubmit: this.handlePersonSubmit })
				),
				React.createElement('div', { className: 'col-xs-4' })
			);
		}
	});

	React.render(React.createElement(App, { url: '/people.json' }), document.getElementById('main'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./base.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html,body{\n  height:100%;\n}\n\nbody{\n  padding-top:50px; /*padding for navbar*/\n}\n\n.navbar-custom .icon-bar {\n  background-color:#fff;\n}\n\n.navbar-custom {\n  background-color: #CD5C5C;\n}\n\n.navbar-custom a{\n  color:#000;\n}\n\n.navbar-custom .form-control:focus {\n  border-color: #49bfff;\n  outline: 0;\n  -webkit-box-shadow: inset 0 0 0;\n  box-shadow: inset 0 0 0;\n}\n\n#map {\n  width: 33.3333%;\n  height: calc(100% - 0);\n  position: absolute;\n  right: 16px;\n  top: 50px;\n  bottom: 0;\n  overflow: hidden;\n}\n\n#main, #main>.row {\n  height: 100%;\n}\n\n#main>.row {\n    overflow-y:scroll;\n}\n\n#left {\n  height:100%;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Map = React.createClass({
		displayName: 'Map',

		getInitialState: function () {
			return {
				gmap: null
			};
		},

		// create instance of google maps
		loadMapOnMount: function (rootNode) {
			var gmap = new GMaps({
				div: '#map',
				lat: this.props.lat,
				lng: this.props.lng,
				scrollWheel: false,
				zoom: 8
			});

			this.setState({ gmap: gmap });

			gmap.addListener('idle', function () {
				if (this.state.gmap !== null) {
					this.setBounds();
				}
			}.bind(this));
		},

		// load markers every time state of app is changed
		loadMarkers: function (data) {
			if (this.state.gmap) {
				var gmap = this.state.gmap;

				// clear old markers
				console.log('remove markers');
				gmap.removeMarkers();

				console.log('adding new markers');
				for (var i = 0; i < data.length; i++) {
					gmap.addMarker({
						lat: data[i].lat,
						lng: data[i].lng,
						infoWindow: {
							content: '<p>' + data[i].name + '</p>' + '<p>' + data[i].desc + '</p>'
						}
					});
				}
			}
		},

		// set map boundaries
		setBounds: function () {
			gmap = this.state.gmap;
			var bounds = {
				sw_lat: gmap.getBounds().getSouthWest().lat(),
				sw_lng: gmap.getBounds().getSouthWest().lng(),
				ne_lat: gmap.getBounds().getNorthEast().lat(),
				ne_lng: gmap.getBounds().getNorthEast().lng()
			};

			this.props.handleBoundChange(bounds);
		},

		componentDidMount: function (rootNode) {
			this.loadMapOnMount();
		},

		shouldComponentUpdate: function (nextProps, nextState) {
			// only re-render map if there are new search results
			return !nextProps.idList.equals(this.props.idList);
		},

		componentWillUpdate: function (nextProps, nextState) {
			this.loadMarkers(nextProps.data);
		},

		render: function () {
			return React.createElement('div', { id: 'map' });
		}
	});

	module.exports = Map;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var InputForm = React.createClass({
		displayName: 'InputForm',

		handleSubmit: function (e) {
			e.preventDefault();
			var id = React.findDOMNode(this.refs.id).value.trim();
			var name = React.findDOMNode(this.refs.name).value.trim();
			var desc = React.findDOMNode(this.refs.desc).value.trim();
			var lat = React.findDOMNode(this.refs.lat).value.trim();
			var lng = React.findDOMNode(this.refs.lng).value.trim();

			this.props.onPersonSubmit({ id: id, name: name, desc: desc, lat: lat, lng: lng });

			React.findDOMNode(this.refs.id).value = '';
			React.findDOMNode(this.refs.name).value = '';
			React.findDOMNode(this.refs.desc).value = '';
			React.findDOMNode(this.refs.lat).value = '';
			React.findDOMNode(this.refs.lng).value = '';
		},

		render: function () {
			return React.createElement(
				'div',
				{ id: 'addPersonModal', className: 'modal fade', role: 'dialog' },
				React.createElement(
					'div',
					{ className: 'modal-dialog' },
					React.createElement(
						'div',
						{ className: 'modal-content' },
						React.createElement(
							'div',
							{ className: 'modal-header' },
							React.createElement(
								'button',
								{ type: 'button', className: 'close', 'data-dismiss': 'modal' },
								'×'
							),
							React.createElement(
								'h4',
								{ className: 'modal-title' },
								'Add a person'
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-body' },
							React.createElement(
								'form',
								{ className: 'inputForm', onSubmit: this.handleSubmit },
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ htmlFor: 'id' },
										'Id'
									),
									React.createElement('input', { type: 'text', className: 'form-control', id: 'id', ref: 'id' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ htmlFor: 'name' },
										'Name'
									),
									React.createElement('input', { type: 'text', className: 'form-control', id: 'name', ref: 'name' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ htmlFor: 'desc' },
										'Description'
									),
									React.createElement('input', { type: 'text', className: 'form-control', id: 'desc', ref: 'desc' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ htmlFor: 'lat' },
										'Latitude'
									),
									React.createElement('input', { type: 'text', className: 'form-control', id: 'lat', ref: 'lat' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ htmlFor: 'lng' },
										'Longitude'
									),
									React.createElement('input', { type: 'text', className: 'form-control', id: 'lng', ref: 'lng' })
								),
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement('input', { type: 'submit', value: 'Submit!' })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'modal-footer' },
							React.createElement(
								'button',
								{ type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
								'Close'
							)
						)
					)
				)
			);
		}
	});

	module.exports = InputForm;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var Person = React.createClass({
		displayName: "Person",

		render: function () {
			return React.createElement(
				"div",
				{ className: "person" },
				React.createElement(
					"div",
					{ className: "panel panel-warning" },
					React.createElement(
						"div",
						{ className: "panel-heading" },
						React.createElement(
							"a",
							{ href: "#" },
							this.props.name
						)
					),
					React.createElement(
						"div",
						{ className: "panel-body" },
						React.createElement(
							"p",
							null,
							this.props.desc
						)
					)
				)
			);
		}
	});

	var People = React.createClass({
		displayName: "People",

		render: function () {
			var personList = this.props.data.map(function (person) {
				return React.createElement(Person, { key: person.name, name: person.name, desc: person.desc, lat: person.lat, lng: person.lng });
			});
			return React.createElement(
				"div",
				{ className: "people" },
				personList
			);
		}
	});

	module.exports = People;

/***/ }
/******/ ]);