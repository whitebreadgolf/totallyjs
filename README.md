#TotallyJS

Totallyjs is a lightweight, dynamic, frontend MVC framework designed for interacting with RESTful web interfaces. Totally allows a developer to define all parts of their application only using the javascript language. Templates can be defined using the Totally template engine, which allows for fast front-end view rendering. The Totally template engine lets a developer define a view using simple and intuitive object definitions. In addition to the Totally template engine, the TotallyJS framework provides a standard way of defining controllers, and a simple way to define models so that they are automatically syncronized with an application's back-end. 


## Installation

via bower:

```bash
$ bower install totallyjs
```

## Notes

As of now, totallyjs is only available as an AMD. So to use totallyjs, you'll need to use an AMD loader library like requirejs. 

##Main App File

After Totally.js is loaded properly, the framework can be used to declare an application. Lets call this main file "app.js". Assume we have also included app.js in our public files (ie. <script src="app.js"></script>)). From app.js we can attach our main application variable to the window and define our app structure. 

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
app.view({name: 'home', type: 'jview', input: 'javascript'}, function($){
	return [
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
		$.jgrid({ 	
			name: 'datagrid', 
			columns: {default: 2, xs: 1, sm: 2, md: 5, lg: 5, xl: 10}, 
			gridDataName: 'griddata',
			skeleton: [
				$.h4('.name', [ 'name: {{name}}' ]),
				$.h4('', [ 'age: {{age}}' ])
			]
		}),
		$.jview({name: 'main'})
	];
});
```

##Controller Definitions

This is an example of a controller that could potentially be a part of a user's application. Controllers are defined using the following syntax:

```bash
app.controller({name: <controller_name>}, <controller_functions_object>);
```
The controller functions object needs a key for each function that can be called in the controller.

```bash
//home controller
app.controller({name: 'homeController'},{

	home:function(view, model){

		//bind data to view
		view('home').addData('title', 'home');

		//set the grid data in the grid
		view('home').addData('griddata', model('person').getAll());

		//render view
		view('home').render();
	},

	main:function(view, model){

		//bind data to view
		view('main').addData('title', 'main');

		//render view
		view('main').render();
	}, 

	addPerson: function(view, model){
		model('person').add({age: 23, height: 100, weight: 123, name: 'karl'});

		this.home(view, model, helper);
	},

	deletePerson: function(view, model){
		model('person').delete({ where: {name: 'karl'}});

		this.home(view, model, helper);
	},

	updatePerson: function(view, model){
		model('person').updateAll({ update: {age: 24}, where: {name: 'karl'} });

		this.home(view, model, helper);
	}
});
```


