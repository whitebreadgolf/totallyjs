'use strict';

define([

  /**  	
	* @requires jview/jview
	* @requires jmodel/jmodel
	* @requires jcontroller/jcontroller
	* @requires jloader/jloader
	* @requires jhelper/jhelper
	* @requires jrouter/jrouter
	* @requires jsingleton
	* @requires jview/tags/tags
	* @requires jview/views/jviewObject
	* @requires jview/viewChange
	* @requires viewObjectParser
    */
	'jview/jview',
	'jmodel/jmodel', 
	'jcontroller/jcontroller', 
	'jloader/jloader', 
	'jrouter/jrouter',
	'jsingleton',
	'jview/tags/tags',
	'jview/views/jviewObject',
	'jview/viewChange',
	'viewObjectParser'

], function(jv, jm, jc, jl, jr, js, tags, jview, viewChange, vop){

  /**
	* Just Javascript Module - main module for making apps, uses other modules for functions
	* @exports jjs
	*/
	var jjs = {

	  /**
		* Function to get access to create models views, controllers, routes, and helpers
		* @function app
		* @alias jjs.app
		* @returns {Object} functions to create application components
		*/
		app: function(){
			return{

			  /**
				* Function to create views	
				* @function view
				* @alias jjs.app#view
				*/
				view: function(_options, _view){

					//error checking
					if(_options 		 		 === undefined){throw 'view needs options to instantiate';}
					if(_options.name  		 === undefined){throw 'view needs name to instantiate';}
					if(_options.type  		 === undefined){throw 'view needs type to instantiate';}
					if(_options.input 		 === undefined){throw 'view needs input to instantiate';}
					if(_options.type 		 !== 'jview' && 
					   jv[_options.type] 	 === undefined){throw 'not a valid view type';}
					
					//check the input
					if(_options.input === 'javascript'){

						for(var tag in jv){ tags[tag] = jv[tag]; }

						//create view and add it to our singleton
						var _view = jview(_view(tags));
						_view.setId(_options.name);
						js.singleton.views[_options.name] = _view;
					}

					//unknown type
					else{ throw 'view input not valid'; }
				},

			  /**
				* Function to create a controller	
				* @function controller
				* @alias jjs.app#controller
				*/
				controller: function(_options, _controllerObject){

					//error checking on input
					if(_options 			=== undefined){ throw 'controller needs options to instantiate'; }
					if(_options.name 	=== undefined){ throw 'controller needs option name'; }
					if(_controllerObject === undefined){ throw 'controller needs functions to instantiate'; }

					//add the controller if input if valid
					jc.addController(_options.name, _controllerObject);
				},

			  /**
				* Function to create models	
				* @function model
				* @alias jjs.app#model
				*/
				model: function(_options, _modelObject){

					//initial error checking
					if(_options 			   === undefined){ throw 'model needs options to instantiate'; };
					if(_modelObject 		   === undefined){ throw 'model needs layout to instantiate'; };

					//deeper error checking
					if(_options.name 	   === undefined){ throw 'model needs name to instantiate'; };
					if(_modelObject.layout  === undefined){ throw 'model needs layout to instantiate'; }

					//check for the backend config
					if(_modelObject.backend !== false){ 

						//check all fields that are expected
						if(_modelObject.backend.config 			 === undefined){ throw 'model needs backend configuration'; }
						if(_modelObject.backend.config.base_route === undefined){ throw 'model needs backend configuration'; }
						if(_modelObject.backend.config.routes 	 === undefined){ throw 'model needs backend route configuration'; }
						if(_modelObject.backend.config.handlers 	 === undefined){ throw 'model needs backend configuration for handlers'; }
					}
					
					//instantiate the model
					jm.addModel(_options, _modelObject);
				},

			  /**
				* Function to create routes
				
				* @function routes
				* @alias jjs.app#routes
				*/
				routes: function(_routes){

					//go through each route
					for(var route in _routes){

						//if we are trying to display a view, check if it exists
						if(_routes[route].view && _routes[route].view !== 'otherwise' && js.singleton.views[_routes[route].view] === undefined){throw "view doesn't exist";}
						jr.setRoute(_routes[route]);
					}
				},

			  /**
				* Function to configure the application		
				* @function config
				* @alias jjs.app#config
				*/
				config: function(_configObj){

					//at least need the root and files
					if(_configObj 		=== undefined){ throw 'need configure object to configure app'; }
					if(_configObj.root 	=== undefined){ throw 'configure object needs root field'; }
					if(_configObj.files === undefined){ throw 'configure object needs files field'; }

					//load our scripts
					jl.processConfigSettings(_configObj);

					/*
						
					We can do the following function before all the user's scripts are loaded

					*/

					//initializing window size lisener
					viewChange.initialize();
				}
			}
		}
	};

	//export jjs object
	return jjs;
});
