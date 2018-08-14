## Proximus

This project was created so you can easy change your page content base on a language but maybe it has another usages...

## Table of Content
**1. [Coming Soon](#coming-soon)**<br>
**2. [Run Test](#test)**<br>

**[MIT License](#license)**<br>

Install JS
```html
<!-- Proximus JS -->
<script src="proximus-min.js"></script>
```

Text change with class i18n, usage example:
```html
<!-- Proximus will change the inside of the h1 tags to the one define in the language object  -->
<!-- Proximus knows you want to change the inside of this because of the class 'i18n'  -->
<!-- Proximus will take the 'id' and look for a key with that same 'id' and set it's value  -->
<!-- Note: If the key is not found proximus will set the inside with the 'id' name -->
<h1 class="i18n" id="title"></h1>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<h1 class="i18n" id="title">Hello world!</h1>
```

Text change with class i18nAtt, usage example:
```html
<!-- Proximus will change the inside of the h1 tags to the one define in the language object  -->
<!-- Proximus knows you want to change the inside of this because of the class 'i18nAtt'  -->
<!-- Proximus will take the 'data-i18n' and look for a key with that same 'data-i18n' and set it's value  -->
<!-- Note: If the key is not found proximus will set the inside with the 'data-i18n' name -->
<h1 class="i18nAtt" data-i18n="title"></h1>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<h1 class="i18nAtt" data-i18n="title">Hello world!</h1>
```

Src change with class imgi18n, usage example:
```html
<!-- Proximus will change the inside of the 'src' tag for what you specify in the language object if it's define -->
<!-- Proximus knows you want to change this because of the class 'imgi18n'  -->
<!-- Proximus will take the data-i18n and look for a key with that same data-i18n and set it's value  -->
<!-- Note: If the key is not found proximus will not change the src -->
<img class="imgi18n" data-i18n="logo" src="../img/placeholder.png"></img>
<!-- If we use the configuration of the simple initialization example --> 
<!-- Then this will be the result: -->
<img class="imgi18n" data-i18n="logo" src="../img/logo.png"></img>
```

Simple initialization
```javascript
// Create your language object
var langObj = {
    'en':{
        "title":"Hello world!",
        "logo": "../img/logo.png"
    },
    'es':{
        'title': "Hola mundo",
    }
}
// Initialize Proximus
/*
* 1. The language object ir Required.
* 2. Default staring language is 'en'.
* 3. Default cookie is lng.
*/
proximus.init(langObj);
```

Complex initialization
```javascript
// Create your language object
var langObj = {
    'en':{
        "title":"Hello world!",
    },
    'es':{
        'title': "Hola mundo",
    }
}
/*
* 1. The language object ir Required.
* 2. Default staring language is 'en', but here I set it to 'es'.
* 3. Default cookie is 'lng', but here I set it to 'lang'.
*/
proximus.init(langObj, 'es', 'lang');

// Note: If you like you can have diferent instance of proximus by setting diferent cookies and objt
// Example:
proximus.init(langObj);
proximus.init(langObj2, 'es', 'lang');
```

Utils functions
```javascript
// You can change the cookie with this function
/*
* 1. The value variable is Required and will definde to what the language cookie will be change to.
* 2. The cookie name is optional and by default it will be 'lng'.
*/
proximus.change('es', 'lnp');

// Will return and obj with default values and the variables use by proximus
proximus.getVariables();

/* Returns:
* var proximusObj = {
*   defaultLngName: 'en',
*   defaultcookieName: 'lng',
*   lngByIdClass: '.i18n',
*   lngImgClass: '.imgi18n',
*   lngByAtrrClass: '.i18nAtt',
*   lngAtrrName: 'data-i18n'
* };
*/
```

## Coming Soon

1. Change the html tag? or the class? 😲😲
2. Return and chose nested object from object 😲😲😲 

## Test

You can run the test index with this command on terminal:
```javascript
	gulp server
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details**<br>

[Go Top](#table-of-content)