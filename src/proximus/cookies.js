const cookie = (document => { // eslint-disable-line
	// Create Cookie
	const createsCookie = (name, value, days) => {
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

		if (readsCookie.length > 0)
			return `cookie create => Name: ${name}, Value: ${value}, Expires in: ${days} days`;

		return null;
	};

	// Reads Cookie
	const readsCookie = (name) => {
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
	};

	// Delete Cookie
	const deleteCookie = (name) => {
		if (name == null || name == undefined) 
			return `Cookie key not set: ${name}`;

		createsCookie(name, '', -1);
		if (readsCookie.length > 0) 
			return 'Cookie Deleted';

		return null;
	};

	return {
		create(cookieName, cookieValue, days = 10) {
			return createsCookie(cookieName, cookieValue, days);
		},

		read(cookieName) {
			return readsCookie(cookieName);
		},

		delete(cookieName) {
			return deleteCookie(cookieName);
		}
	};
})(document);
