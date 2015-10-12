#The JavaScript Challenge

## Client Side Address Book
Build a single page address book application using JavaScript, HTML and CSS.

### Functionality
1. You should be able to add, delete and edit contacts.
2. The data shall be stored in local storage, and loaded again when the application starts.
3. Add fitting validation to the different input fields.

### Form Fields
* First name (required)
* Last name (required)
* Email (required, valid email)
* Address (optional)
* City (optional)
* Zip-code (optional, but if entered it should match `/^\d{5}$/`)
* Country (optional)

### Frameworks/Libraries
* The application **must** be build with [Angular 1](https://angularjs.org/) or [Angular 2](https://angular.io/) 
* You **must not** use jQuery
* The application must be hand-coded and **must not** use any seed or scaffolding tool like Yeoman
* Other libraries and tools like [Lodash](https://lodash.com/) and [Gulp](http://gulpjs.com/) may be used

### Misc
* Even though this is a small project, structure and architecture should mimic a bigger project
* The application should work in latest Chrome, Firefox, Safari and IE
* Application should be written in ES5 or ES2015 (ES6)
* CSS preprocessors are okay to use — we like [Stylus](https://learnboost.github.io/stylus/)

Good Luck!


# Launch App

## Dev
```shell
grunt
```

## Production
```shell
grunt dist
```

## Test
```shell
grunt test
```