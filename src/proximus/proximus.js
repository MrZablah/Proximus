// Note: Proximus with no jquery requierments
let proximus = ((document, window) => { // eslint-disable-line
	let proximusObj = {
		defaultLngName: 'en',
		defaultcookieName: 'lng',
		lngByIdClass: '.i18n',
		lngImgClass: '.i18nImg',
		lngByAtrrClass: '.i18nAtt',
		lngAtrrName: 'data-i18n'
	};

	const cookies = {
		create(name, value, days = 10) {
			let expires = '';
			if (days) {
				let date = new Date();
				date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
				expires = '; expires=' + date.toUTCString();
			}

			if (name == null || name == undefined) 
				return `Cookie key not set: ${name}`;

			if (value == null || value == undefined) 
				return `Cookie Value not set: ${name}`;

			document.cookie = name + '=' + value + expires + '; path=/';

			if (this.read(name).length > 0)
				return `cookie create => Name: ${name}, Value: ${value}, Expires in: ${days} days`;

			return null;
		},
		read(name) {
			if (name == null || name == undefined) 
				return `Cookie key not set: ${name}`;

			let value = '; ' + document.cookie;
			let parts = value.split('; ' + name + '=');
			if (parts.length == 2)
				return parts
					.pop()
					.split(';')
					.shift();

			return null;
		},
		delete(name){
			if (name == null || name == undefined) 
				return `Cookie key not set: ${name}`;

			this.create(name, '', -1);
			if (this.read(name).length > 0) 
				return 'Cookie Deleted';

			return null;
		}
	};

	// Note: Read cookie from url and replace/sets new cookie
	const replaceUrlCookie = (cookieName, paramValue) => {
		let url = window.location.href;
		let pattern = new RegExp(`${cookieName}=[a-z]+`);
		cookies.create(cookieName,`${paramValue};path=/`);
		if (url.match(pattern)) {
			window.location = 
				url.replace(pattern, `${cookieName}=${paramValue}`);
		} else {
			window.location = 
				`${url}${url.indexOf('?') > 0 ? '&' : '?'}${cookieName}=${paramValue}`;
		}
	};

	// Note: gets the language and returns it
	const getLang = (cookieName, defaulLanguage) => {
		// Check if the cookie allrady has a value if not set defaul value
		let language = 
			cookies.read(cookieName) != null ? cookies.read(cookieName) : defaulLanguage;
		
		// Checks if cookie language was set on url, if yes returns that one
		let tmp = [];
		location.search.substr(1).split('&').forEach(item => {
			tmp = item.split('=');
			if(tmp[0] === cookieName)
				language = decodeURIComponent(tmp[1]);
		});

		// change/create cookie with lng and returns value
		cookies.create(cookieName, language);
		return language;
	};

	// Note: get all html with that class and change the context, base on language object
	const changeEachInnerHtml = (classToCheck, langObject, attribute) => {
		document.querySelectorAll(classToCheck).forEach((el) => {
			try {
				let attVal = el.getAttribute(attribute);
				if (langObject[attVal]) {
					el.innerHTML = langObject[attVal];
				} else if (!langObject[attVal] || attVal === undefined) {
					// el.innerHTML = `Missing ${attribute} value`;
				} else {
					el.innerHTML = attVal;
				}
			} catch (e) {
				console.log(e); // eslint-disable-line
			}
		});
	};
	
	// Note: get all html with that class and change the src, base on language object
	const changeEachHtmlSrc = (classToCheck, langObject, attribute) => {
		document.querySelectorAll(classToCheck).forEach((el) => {
			try {
				let attVal = el.getAttribute(attribute);
				if (langObject[attVal]) {
					el.src = langObject[attVal];
				} else if (!langObject[attVal]) {
					// el.src = `Missing${attribute}Value`;
					// el.alt = `Missing ${attribute} value`;
				} else {
					el.src = attVal;
				}
			} catch (e) {
				console.log(e); // eslint-disable-line
			}
		});
	};

	const setupEventListeners = (languageObject, language, cookieName) => {
		var langObj = languageObject[getLang(cookieName, language)];
		
		// Change by id
		changeEachInnerHtml(proximusObj.lngByIdClass, langObj, 'id');
		
		// Change by attribute
		changeEachInnerHtml(proximusObj.lngByAtrrClass, langObj, proximusObj.lngAtrrName);
		
		// Change src by attribute
		changeEachHtmlSrc(proximusObj.lngImgClass, langObj, proximusObj.lngAtrrName);

		// Note: add a wey to return object and select value by somthing like data-value  

		// Note: add a way to add your tagname and change that tag name base on your obj
	};

	const getValue = (langObj, keyName, cookieName) => {
		let cookieVal = cookies.read(cookieName);
		if(langObj[cookieVal][keyName] == null || langObj[cookieVal][keyName] == undefined){
			return 'That value dosent exist!';
		}
		return langObj[cookieVal][keyName];
	};

	return {
		init(
			langObj,
			lng = proximusObj.defaultLngName,
			cookieName = proximusObj.defaultcookieName
		) {
			setupEventListeners(langObj, lng, cookieName);
		},

		change(newValue, cookieName = proximusObj.defaultcookieName) {
			replaceUrlCookie(cookieName, newValue);
		},

		getVariables() {
			return proximusObj;
		},

		getLang(cookieName = proximusObj.defaultcookieName){
			return cookies.read(cookieName);
		},

		getKeyValue(langObj, keyName, cookieName = proximusObj.defaultcookieName){
			return getValue(langObj, keyName, cookieName);
		}
	};

})(document, window);

// Init
// proximus.init(bundle, "es", "lnp");

// Change language
// change('es', 'ln');

// Get all variables
// getVariables();