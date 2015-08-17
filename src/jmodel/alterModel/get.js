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
	* Get Module - used to get data from a user specified model

	* @exports jmodel/alterModel/get
	*/
	var get = {

	  /**
		* Function called once we know the indicies of the data we want to get

		* @function getFromModelAtIndex
		* @alias jmodel/alterModel/get.getFromModelAtIndex

		* @param {Object[]} _indicies - idicies to get
		* @param {string} _modelName - name of the model to get
		*/
		getFromModelAtIndex: function(indicies, modelName){

			//if no search terms are provided	
			if(indicies === 'all'){ return js.singleton.models[modelName].data; }
			
			var returnData = [];
			for(var index in indicies){

				//check if valid index
				if(index < 0){ throw 'index to get is not valid'; }

				//delete value at index
				returnData.push(js.singleton.models[modelName].data[indicies[index].fake_key]);
			}

			//return selected data
			return returnData;
		},

	  /**
		* Function to process a get request from a given model

		* @function getFromModel
		* @alias jmodel/alterModel/get.getFromModel

		* @param {Object} _data - search data to find data to get
		* @param {string} _modelName - name of the model to get
		* @param {boolean} _multiple - whether to get multiple data entries or just one
		*/
		getFromModel: function(data, modelName){

			//validate name
			validate.modelName(modelName);

			//query data is stored in where field, or no search ternm
			if(data !== undefined && data.where !== undefined){
				validate.searchData(data.where, modelName);
				return this.getFromModelAtIndex(indicies.forData(data.where, modelName), modelName);
			}

			//get all from model
			else{ return this.getFromModelAtIndex('all', modelName); }
		}	
	};

	//return get object
	return get;
});