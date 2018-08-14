'use strict';

var cookie = function (document) {
	var createsCookie = function createsCookie(name, value, days) {
		var expires = '';
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toUTCString();
		}

		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

		if (value == null || value == undefined) return 'Cookie Value not set: ' + name;

		document.cookie = name + '=' + value + expires + '; path=/';

		if (readsCookie.length > 0) return 'cookie create => Name: ' + name + ', Value: ' + value + ', Expires in: ' + days + ' days';

		return null;
	};

	var readsCookie = function readsCookie(name) {
		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

		var value = '; ' + document.cookie;
		var parts = value.split('; ' + name + '=');
		if (parts.length == 2) return parts.pop().split(';').shift();

		return null;
	};

	var deleteCookie = function deleteCookie(name) {
		if (name == null || name == undefined) return 'Cookie key not set: ' + name;

		createsCookie(name, '', -1);
		if (readsCookie.length > 0) return 'Cookie Deleted';

		return null;
	};

	return {
		create: function create(cookieName, cookieValue) {
			var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

			return createsCookie(cookieName, cookieValue, days);
		},
		read: function read(cookieName) {
			return readsCookie(cookieName);
		},
		delete: function _delete(cookieName) {
			return deleteCookie(cookieName);
		}
	};
}(document);

var proximus = function (cookieCtrl, window) {
	var proximusObj = {
		defaultLngName: 'en',
		defaultcookieName: 'lng',
		lngByIdClass: '.i18n',
		lngImgClass: '.i18nImg',
		lngByAtrrClass: '.i18nAtt',
		lngAtrrName: 'data-i18n'
	};

	var replaceUrlCookie = function replaceUrlCookie(cookieName, paramValue) {
		var url = window.location.href;
		var pattern = new RegExp(cookieName + '=[a-z]+');
		cookieCtrl.create(cookieName, paramValue + ';path=/');
		if (url.match(pattern)) {
			window.location = url.replace(pattern, cookieName + '=' + paramValue);
		} else {
			window.location = '' + url + (url.indexOf('?') > 0 ? '&' : '?') + cookieName + '=' + paramValue;
		}
	};

	var getLang = function getLang(cookieName, defaulLanguage) {
		var language = cookieCtrl.read(cookieName) != null ? cookieCtrl.read(cookieName) : defaulLanguage;

		var tmp = [];
		location.search.substr(1).split('&').forEach(function (item) {
			tmp = item.split('=');
			if (tmp[0] === cookieName) language = decodeURIComponent(tmp[1]);
		});

		cookieCtrl.create(cookieName, language);
		return language;
	};

	var changeEachInnerHtml = function changeEachInnerHtml(classToCheck, langObject, attribute) {
		document.querySelectorAll(classToCheck).forEach(function (el) {
			try {
				var attVal = el.getAttribute(attribute);
				if (langObject[attVal]) {
					el.innerHTML = langObject[attVal];
				} else if (!langObject[attVal] || attVal === undefined) {
					el.innerHTML = 'Missing ' + attribute + ' value';
				} else {
					el.innerHTML = attVal;
				}
			} catch (e) {
				console.log(e);
			}
		});
	};

	var changeEachHtmlSrc = function changeEachHtmlSrc(classToCheck, langObject, attribute) {
		document.querySelectorAll(classToCheck).forEach(function (el) {
			try {
				var attVal = el.getAttribute(attribute);
				if (langObject[attVal]) {
					el.src = langObject[attVal];
				} else if (!langObject[attVal]) {
					el.src = 'Missing' + attribute + 'Value';
					el.alt = 'Missing ' + attribute + ' value';
				} else {
					el.src = attVal;
				}
			} catch (e) {
				console.log(e);
			}
		});
	};

	var setupEventListeners = function setupEventListeners(languageObject, language, cookieName) {
		var langObj = languageObject[getLang(cookieName, language)];

		changeEachInnerHtml(proximusObj.lngByIdClass, langObj, 'id');

		changeEachInnerHtml(proximusObj.lngByAtrrClass, langObj, proximusObj.lngAtrrName);

		changeEachHtmlSrc(proximusObj.lngImgClass, langObj, proximusObj.lngAtrrName);
	};

	return {
		init: function init(langObj) {
			var lng = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : proximusObj.defaultLngName;
			var cookieName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : proximusObj.defaultcookieName;

			setupEventListeners(langObj, lng, cookieName);
		},
		change: function change(newValue) {
			var cookieName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : proximusObj.defaultcookieName;

			replaceUrlCookie(cookieName, newValue);
		},
		getVariables: function getVariables() {
			return proximusObj;
		}
	};
}(cookie, window);