'use strict';

define([

  /**
    * @requires 
    */
	

], function(){

	var GET_FUNCT_PARAMS = /function(\s*)\(.*\)/g;
	var CAPTURE_ARGS = /[a-zA-Z0-9][^,\(\)\s]*/g;
	var FUNCTION = 'function';
	var VIEW = 'view';
	var MODEL = 'model';
	var COMMA = ',';

  /**
	* JControllerParser Module - functions for parsing user defined controllers
	
	* @exports jcontroller/render
	*/
	var jcParser = {

	  /**
		* Function to ensure that the order of function arguments is correct
		
		* @function ensureOrder
		* @alias jcontroller/jcontrollerParser.ensureOrder
		
		* @param {string} _function - a controller function converted into a string
		*/
		ensureOrder: function(_function){

			
			_function = _function.substring(_function.indexOf('{') + 1, _function.lastIndexOf(';') + 1);

			return {
				args: ['view', 'model'],
				func: (new Function('view', 'model', _function))
			};
			// //so we only consider the first instance
			// var count = 0;

			// //make sure it is (view, model) 
			// _function.replace(GET_FUNCT_PARAMS, function(res){
				
			// 	//compiled argument string
			// 	var compiledArgs = '';

			// 	//only applies to the first time
			// 	if(count === 0){

			// 		//argument array
			// 		var allArgs = [];
			// 		res.replace(CAPTURE_ARGS, function(_res){

			// 			//don't include function
			// 			if(_res !== FUNCTION){ allArgs.push(_res); }
			// 		});
			// 	}

			// 	//return function string with args and incrament
			// 	count ++;
			// 	return FUNCTION+'('+compiledArgs+')';
			// });

			// //return our function string
		}
	  
	};

	//return render object
	return jcParser;
});