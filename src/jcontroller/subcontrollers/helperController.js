'use strict';

define([

  /**
	* @requires jsingleton 
	* @requires jcontroller/subcontrollers/modelController
	* @requires jcontroller/subcontrollers/viewController
	*/
	'jsingleton',
	'jcontroller/subcontrollers/modelController',
	'jcontroller/subcontrollers/viewController'

], function(js, model, listener, view){

  /**
	* Helper Controller Module - for calling helper functions
	
	* @exports jcontroller/subcontrollers/helperController

	* @param {string} _helperName - name of the helper function to be called
	* @param {Object} _data - data to be passed by the user
	*/	
	var helper = function(_helperName, _data){
		var data = _data || {};
		js.singleton.helpers[_helperName](view, model, data);
	}

	//exported helper function
	return helper;
});