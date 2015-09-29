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
	* Update Module - used to update data in a user specified model

	* @exports jmodel/alterModel/update
	*/
	var update = {

	  /**
		* Function called once we know the indicies of the data we want to update

		* @function updateModelAtIndex
		* @alias jmodel/alterModel/update.updateModelAtIndex

		* @param {Object[]} _indicies - idicies to update
		* @param {string} _modelName - name of the model to update
		*/
		updateModelAtIndex: function(_indicies, _data, _modelName){

			//go through indicies
			for(var index in _indicies){

				//check if valid index
				if(_indicies[index].real_key < 0){ throw 'index to delete is not valid'; }

				//update value at index with data
				for(var i in _data){ js.singleton.models[_modelName].data[_indicies[index].fake_key][i] = _data[i]; }

				//update in backend
				js.singleton.models[_modelName].backend.config.handlers[UPDATE](_indicies[index].real_key, _data, _modelName, function(updateData){});
			}
		},

	  /**
		* Function to process an update request from a given model

		* @function updateModel
		* @alias jmodel/alterModel/update.updateModel

		* @param {Object} _data - search data to find data to update
		* @param {string} _modelName - name of the model to update
		* @param {boolean} _multiple - whether to update multiple data entries or just one
		*/
		updateModel: function(_data, _modelName, _multiple){

			//validate name
			validate.modelName(_modelName);

			//validate query data
			validate.searchData(_data.where, _modelName);

			//validate update data
			validate.updateData(_data.update, js.singleton.models[_modelName]);

			//get indicies and update
			var allIndices = indicies.forData(_data.where, _modelName, _multiple);
			this.updateModelAtIndex(allIndices, _data.update, _modelName);
		}
	};

	//return update object
	return update;
});