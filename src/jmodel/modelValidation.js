'use strict';

define([

  /**
  	* @requires jsingleton
	*/
	'jsingleton'

], function(js){

	//types
	var BOOL = true,
		STRING = 'string',
		FLOAT = 1.111,
		INT = 1;

	//type validation
	var TYPES = {
		INTEGER: function(value){ return Number(value) 	 === value && value % 1 		=== 0; }, 	
		FLOAT: function(value){ return value 			 === Number(value) && value % 1 !== 0; }, 
		
		STRING: function(value){ return ((typeof value)  === (typeof STRING)); }, 
		BOOLEAN: function(value){ return ((typeof value) === (typeof BOOL)); }
	};

  /**
	* Model Validation Module - performs several types of validation for model data, throws exeptions if not valid

	* @exports jmodel/modelValidation
	*/
	var validate = {
		
	  /**
		* Function to validate a model's name

		* @function modelName
		* @alias jmodel/modelValidation.modelName

		* @param {string} _modelName - name of the model to be validated
		*/
		modelName: function(_modelName){
			if(js.singleton.models[_modelName] === undefined){ throw 'model name ' + _modelName + ' is not valid'; }
		},

	  /**
		* Function to validate search data for a model

		* @function searchData
		* @alias jmodel/modelValidation.searchData

		* @param {Object} _data - search data object to be validated
		* @param {string} _modelName - name of the model to be validated
		*/
		searchData: function(_data, _modelName){

			//go through data and inner elements
			for(var j in _data){

				//check name of element
				if(js.singleton.models[_modelName].layout[j] 				=== undefined){ throw 'data not present in model ' + _modelName; }
				
				//check if value matches type
				if(TYPES[js.singleton.models[_modelName].layout[j]](_data[j]) === undefined){ throw 'invalid value for '+j; }
			}
		},

	  /**
		* Function to validate update data for a model

		* @function updateData
		* @alias jmodel/modelValidation.updateData

		* @param {Object} _data - update data object to be validated
		* @param {Object} _modelObject - the model to compare with our update data
		*/
		updateData: function(_data, _modelObject){

			//go through user specified data
			for(var j in _data){

				//get expected data type
				var type = _modelObject.layout[j];

				//can't change primary key
				if(j 						   === _modelObject.primary_key){ throw 'cannot alter primary_key'; }
				else if(type 				   === undefined){ throw 'invalid model data'; }
				else if(TYPES[type](_data[j])   === undefined){ throw 'invalid data for '+j; }
				else if(_modelObject.validation !== undefined && _modelObject.validation[j] !== undefined){ if(_modelObject.validation[j](_data[j]) === undefined){ throw 'invalid data for ' + j; }}
			}
		},

	  /**
		* Function to validate data to be inserted into a model

		* @function data
		* @alias jmodel/modelValidation.data

		* @param {Object} _data - data object to be validated
		* @param {Object} _modelObject - the model to compare with our data
		*/
		data: function(_data, _modelObject){

			//go through data and inner elements
			for(var j in _data){

				//get expected data type
				var type = _modelObject.layout[j];

				//don't do anything with the primary key
				if(j 							=== _modelObject.primary_key){}
				else if(type 				    === undefined){ throw 'invalid model data'; }
				else if(TYPES[type](_data[j])    === undefined){ throw 'invalid data for '+j; }
				else if(_modelObject.validation  !== undefined && _modelObject.validation[j] !== undefined){ if(_modelObject.validation[j](_data[j]) === undefined){ throw 'invalid data for '+j; }}
			}
		}
	};

	//return validate object
	return validate;
});