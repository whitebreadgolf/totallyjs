#TotallyJS

Totallyjs is a lightweight, dynamic, frontend MVC framework designed for interacting with RESTful web interfaces. Totally allows a developer to define all parts of their application only using the javascript language. Templates can be defined using the Totally template engine, which allows for fast front-end view rendering. The Totally template engine lets a developer define a view using simple and intuitive object definitions. In addition to the Totally template engine, the TotallyJS framework provides a standard way of defining controllers, and a simple way to define models so that they are automatically syncronized with an application's back-end. 


## Installation

via bower:

```bash
$ bower install totallyjs
```

## Notes

As of now, totallyjs is only available as an AMD. So to use totallyjs, you'll need to use an AMD loader library like requirejs. 

Totallyjs is untested for now (OMG sacrilegious), but I'm working on it. Don't worry, I do end-to-end user testing (with lots of page refreshes).

## Versions

	###0.0.2
		* Routes are automatically defined in model definitions
		* Controller definitions now return a controller object, the main function passes in "view" and "model" helpers
		* Added parsing to the controller definitions
			* no user error in passing in "view" and "model" helpers
			* interface to track the varables that the developer passes in
			* infrastructure for making "services" or "factories" in next version

##Main App File

After Totally.js is loaded properly, the framework can be used to declare an application. Lets call this main file "app.js". Assume we have also included app.js in our public files (ie. script tag with app.js). From app.js we can attach our main application variable to the window and define our app structure. 

The following code uses RequireJS to load Totally.js. You can use any AMD you want to, but I prefer Require. 

```bash
var jjs = require(['jjs'], function (jjs) {

	//declare app
	window.app = jjs.app();

	//define app structure
	app.config({
		root: 'example',
		files: [

			{root:'controllers', files: ['home.js']},

			{root: 'models', files: ['person']},

			{root: 'views', files: ['404','home', 'main', {
				root: 'partials',
				 files: ['parsh']
			}]},

			{root: 'routes', files: ['routes']}
		]
	});

});
```

The "root" is the main directory in which all our files are stored. All subsequent loads will be based of this variable. The root variable allway must contain a string, while the files array can either contain strings representing filenames or a new directory object with "root" and "files" keys.

##View Definitions

Totally.js views are very different than in other front-end mvc frameworks. The views are defined in javascript instead of HTML. This might seem odd at first, but it has its advantages. One thing that makes it superior to other view systems is the render time. While parsing HTML with regular expressions is quite fast, it's even faster to skip the parsing step entirely. By defining views in javascript, the framework doesn't have to go from:
 
 ```bash
 Parse HTML Template --> Compile Template with Data --> Render Static View
 ``` 

 Instead only the parts of the view that actually contain dynamic data are parsed, so the flow looks like this: 

 ```bash
 Parse Data Sections of Template --> Compile Template with Data --> Render Static View
 ```

An example of a view would look like the one below. $ is the object that contains all the normal html elements. The first argument is a string that contains all of the element attributes (classes and ids are shortened) and whatever listeners the user wants to bind to the element.

```bash
//home view
app.view({name: 'home', type: 'jview'}, function($){
	return [

		//normal html stuff
		$.div('#main .pviewContainer', [
			$.div('.pcenter.pviewColumn100', [
				$.h4('#title', ['this is {{title}}'])
			]),	
			$.div('.pcenter.pviewColumn100', [
				$.a('href="#/home"', ['home']), 
				' ', 
				$.a('href="#/main"', ['main'])
			]),
			$.div('.pcenter.pviewColumn100', [
				$.button('#addBtn click-controller=homeController.addPerson', ['Add person']), 
				$.button('#deleteBtn click-controller=homeController.deletePerson', ['Delete person']), 
				$.button('#updateBtn click-controller=homeController.updatePerson', ['Update person'])
			])
		]),

		//to iterate
		$.repeat({ 	
			data: 'griddata',
			skeleton: [
				$.div('.gridElem',[
					$.h4('.name', [ 'name: {{name}}' ]),
					$.h4('', [ 'age: {{age}}' ])
				])
			]
		}),

		//insert another external view
		$.jview({name: 'main'})
	];
});

```

##Controller Definitions

Controllers are defined using the following syntax:

```bash
app.controller({name: <controller_name>}, function(view, model){
	return <controller_functions_object>
});
```
The controller functions object needs a key for each function that can be called in the controller. Two helper object are given to the user when defining a controller: "view" and "model". These are what they sound like. View is for interacting with views and model is for interacting with models. The connection between the views and models is completely up to the application developer. This is an example of a controller that could potentially be a part of a user's application. 

```bash
//home controller
app.controller({name: 'homeController'}, function(view, model){
	return {
		home:function(){

			//bind data to view
			view('home').addData('title', 'home');

			//set the grid data in the grid
			view('home').addData('griddata', model('person').getAll());

			//render view
			view('home').render();
		},

		main:function(){

			//bind data to view
			view('main').addData('title', 'main');

			//render view
			view('main').render();
		}, 

		addPerson: function(){
			model('person').add({age: 23, height: 100, weight: 123, name: 'karl'});

			this.home(view, model);
		},

		deletePerson: function(){
			model('person').delete({ where: {name: 'karl'}});

			this.home(view, model);
		},

		updatePerson: function(){
			model('person').updateAll({ update: {age: 24}, where: {name: 'karl'} });

			this.home(view, model);
		}
	};
});
```

##Model Definitions

Models in totally.js are meant to enforce a RESTful backend interface, although totally.js can be used without a RESTful backend interface. In fact models can be used to organize data that isn't even stored on a backend (stored in the javascript environment). In later versions of totally, the user will be able to use models to manipulate storage of cookies and in web browser storage. 

The "app.model" function takes 2 arguments to intantiate a model: the name of the model, and an object describing the model. The model discription must at least include the layout attribute to identify data and their types. Totally has 4 different data types: INTEGER, FLOAT, STRING, BOOLEAN. Yes, despite being a javascript framework totally differentiates between FLOATS and INTEGERS.

The primary key can be defined and should be the same primary key as the developer's backend database primary key. Validation is pretty self-explanitory, the user defines a function with the same name as the piece of data and the function is passed that data. The developer must return true or false to validate the data (or not). The initialize attribute initializes an array of data if the backend is either not declaired or empty. The backend attribute takes a base route attribute to define the base route of the RESTful interface.

Totally.js would generate the following routes (with parameters) for a base route of '/api/person':

* GET: /api/person/{index}, no attached data
* GET_ALL: /api/person, no attached data
* ADD: /api/person, data: person object (with data attributes defined in model)
* UPDATE: /api/person/{index}, data: person obejct (with one or more data attributes defined in model) 
* DELETE: /api/person/{index}, no attached data

In operations like GET, UPDATE and even DELETE, querries for the correct indecies are done on the client side.

This is what a typical model definition would look like:

```bash
//model example
app.model({name: 'person'}, {

	primary_key: '_id',

	//name types
	layout: {
		age: 'INTEGER',
		height: 'INTEGER',
		weight: 'INTEGER',
		name: 'STRING'
	},

	//check values before they are added
	validation: {
		age: function(value){
			if(value > 0 && value < 100){ return true; } return false;
		}
	},

	initialize: [
		{age: 34, height: 88, weight: 193, name: 'bill'},
		{age: 23, height: 100, weight: 123, name: 'karl'},
	],

	backend: {

		base_route: '/api/person',
		
		//more configurations to come in the future
	}
});
```

##Route Definitions

Routes can be declared with the router by specifying a router object in the array passed into "app.routes()". A route object can be defined a variety of different ways. The traditional way is to connect a route to a controller, so a developer can use the "route" and "controller" keys to define values. In addition, a route can be connected to a view by using the "route" and "view" keys. If the route key is defined as "otherwise", then all unknown routes will route to that view/controller (this is usefull when describing a 404 page). The last type of route object is the one with the "reroute" and "to" keys. This will route a given route to another route. In generan, these route objects should be pretty self explanitory.

Below is an example of the variety of route objects that can be defined. 

```bash
//we can link both views and controllers
app.routes([
	{route: '/home', controller: 'homeController.home'},
	{route: '/main', controller: 'homeController.main'},
	{route: 'otherwise', view: '404'},
	{reroute: '/', to: '/home'}
]);
```
