'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jcontroller/render
	*/
	'jsingleton', 
	'jcontroller/render'

], function(js, render){

  /**
	* View Controller Module - object uesd to control access to the model

	* @exports jcontroller/subcontrollers/viewController

	* @param {string} _viewName - view to render or add data to 

	* @returns {Object} object that allows the user to render and add data to a specified view
	*/	
	var view = function(_viewName){
		return{

		  /**
			* The name of the view

			* @public
			*/
			viewName: _viewName,

		  /**
			* Function used to render a view

			* @function render
			* @alias jcontroller/subcontrollers/viewController.render
			*/
			render: function(){

				//specified routename and coorisponding view
				var specifiedView = js.singleton.views[this.viewName];

				//if the view doesn't
				if(specifiedView === undefined){ throw 'no view with name '+this.viewName+' exists'; }

				//render the specified view
				render.renderAll(specifiedView);
			},

		  /**
			* Function used add data to a view

			* @function addData
			* @alias jcontroller/subcontrollers/viewController.addData

			* @param {string} _name - key for value
			* @param {string|Object} _value - value for key
			*/
			addData: function(_name, _value){

				//error checking on viewname
				if(js.singleton.views[this.viewName] === undefined){ throw "view binded to data doesn't exist"; }

				//set value in view
				js.singleton.views[this.viewName].setVariable({name: _name, value: _value});
			}
		};
	};

	//export view controller object
	return view;
});