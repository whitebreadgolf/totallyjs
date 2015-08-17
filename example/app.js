
var jjs = require(['jjs'], function (jjs) {

	//declare app
	window.app = jjs.app();

	//define app structure
	app.config({
		root: 'example',
		files: [

			{root:'controllers', files: ['home.js']},

			{root:'helpers', files:['helpers.js']},

			{root: 'models', files: ['person']},

			{root: 'views', files: ['404','home', 'main', {
				root: 'partials',
				 files: ['parsh']
			}]},

			{root: 'routes', files: ['routes']}
		]
	});

});
