'use strict';

define([

  /**
  	* @requires jsingleton
  	* @requires jmodel/ajax/ajax
	* @requires jmodel/modelValidation
	* @requires jmodel/indicies
	*/
	'jsingleton', 
	'jmodel/ajax/ajax',
	'jmodel/modelValidation',
	'jmodel/indicies'

], function(js, ajax, validate, indicies){

  /**
	* Add Module - used to add data to a user specified model

	* @exports jmodel/alterModel/add
	*/
	var add = {

	  /**
		* Function to add data to a model

		* @function addToModel
		* @alias jmodel/alterModel/add.addToModel

		* @param {Object} _data - user data to be added to a model
		* @param {string} _modelName - name of the model to be validated
		*/
		addToModel: function(_data, _modelName){

			//validate name
			validate.modelName(_modelName);

			//validate data
			validate.data(_data, js.singleton.models[_modelName]);

			//update in backend
			js.singleton.models[_modelName].backend.config.handlers[ADD](_data, _modelName, function(addedData){

				if(addedData[js.singleton.models[_modelName].primary_key] === undefined){ throw 'unknown primary key from backend'; }

				//update in frontend
				_data[js.singleton.models[_modelName].primary_key] = addedData[js.singleton.models[_modelName].primary_key];
				js.singleton.models[_modelName].data.push(_data);
			});
		}
	};

	//return add object
	return add;
});