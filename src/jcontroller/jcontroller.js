'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jcontroller/subcontrollers/modelController
	* @requires jcontroller/subcontrollers/helperController
	* @requires jcontroller/subcontrollers/viewController
	* @requires jcontroller/render
	*/
	'jsingleton', 
	'jcontroller/subcontrollers/modelController',
	'jcontroller/subcontrollers/viewController',
	'jcontroller/render',
	'jcontroller/jcontrollerParser'

], function(js, model, view, render, jcParser){


  /**
	* JController Module - for adding user defined controllers and interacting with the subcontrollers

	* @exports jcontroller/jcontroller
	*/	
	var jc = {

	  /**
		* Function used to add a controller to the app

		* @function addController
		* @alias jcontroller/jcontroller.addController

		* @param {string} _name - the name of the controller
		* @param {Object} _controllerObject - the user defined controller object
		*/
		addController: function(_name, _controllerObject){ 
			js.singleton.controllers[_name] = jcParser.ensureOrder(_controllerObject.toString()); 
		},

	  /**
		* Function to call a user specified controller

		* @function callController
		* @alias jcontroller/jcontroller/callController

		* @param {string} _controllerName -  name of the controller
		* @param {string} _functionName - name of cotroller's function  
		*/
		callController: function(_controllerName, _functionName){

			//check if we have the expected input
			if(_controllerName  === undefined || _functionName === undefined){ throw "controller with function doesn't exist"; }

			//get controller fron singleton
			var specifiedController = js.singleton.controllers[_controllerName];

			//error check for the controller and function name
			if(specifiedController === undefined){ throw "controller doesn't exist"; }

			//call the function
			else{
				
				//pass in 2 objects to help render and add data to the view
				js.singleton.controllers[_controllerName].func(view, model)[_functionName](); 
			}
		}
	};

	//export jcontroller object
	return jc;
});