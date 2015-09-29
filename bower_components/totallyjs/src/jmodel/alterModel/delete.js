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
	* Delete Module - used to delete data to a user specified model

	* @exports jmodel/alterModel/delete
	*/
	var jdelete = {

	  /**
		* Function called once we know the indicies of the data we want to delete

		* @function deleteFromModelAtIndex
		* @alias jmodel/alterModel/delete.deleteFromModelAtIndex

		* @param {Object[]} _indicies - idicies to delete
		* @param {string} _modelName - name of the model to delete from
		*/
		deleteFromModelAtIndex: function(_indicies, _modelName){
			
			//go through indicies
			for(var index in _indicies){
				//check if valid index
				if(index < 0){ throw 'index to delete is not valid'; }

				//delete value at index
				js.singleton.models[_modelName].data[_indicies[index].fake_key] = null;

				//update in backend
				js.singleton.models[_modelName].backend.config.handlers[DELETE](_indicies[index].real_key, _modelName, function(data){});
			}

			//get new data from old data
			var newData = [];
			for(var i in js.singleton.models[_modelName].data){
				if(js.singleton.models[_modelName].data[i] !== null){ newData.push(js.singleton.models[_modelName].data[i]); }
			}

			//set new data to old data
			js.singleton.models[_modelName].data = newData;
		},

	  /**
		* Function to process a delete request from a given model

		* @function deleteFromModel
		* @alias jmodel/alterModel/delete.deleteFromModel

		* @param {Object} _data - search data to find data to delete
		* @param {string} _modelName - name of the model to delete from
		* @param {boolean} _multiple - whether to delete multiple data entries or just one
		*/
		deleteFromModel: function(_data, _modelName, _multiple){

			//validate name
			validate.modelName(_modelName);

			//query data is stored in where field
			if(_data.where === undefined){ throw 'model needs where option to perform query'; }
			var queryData = _data.where;

			//validate data
			validate.searchData(queryData, _modelName);

			//hand to other function to handle
			var allIndices = indicies.forData(queryData, _modelName, _multiple);		
			this.deleteFromModelAtIndex(allIndices, _modelName);
		}
	};

	//return delete object
	return jdelete;
});